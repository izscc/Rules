import * as vscode from 'vscode'
import { getDefaultTemplates } from '../templates/defaultTemplates'
import { createCursorRuleFile } from '../utils/fileUtils'
import { TemplateLoader } from '../utils/templateLoader'

export function registerTemplateCommands(context: vscode.ExtensionContext) {
  // 设置上下文
  TemplateLoader.setContext(context)

  let disposable = vscode.commands.registerCommand('cursor-rules.applyTemplate', async () => {
    try {
      const templates = await getDefaultTemplates()

      if (templates.length === 0) {
        vscode.window.showErrorMessage('没有可用的模板')
        return
      }

      const selected = await vscode.window.showQuickPick(
        templates.map((template) => ({
          label: template.name,
          description: template.description,
          template: template,
        })),
        {
          placeHolder: '选择一个.cursorrules模板',
        }
      )

      if (selected) {
        try {
          await createCursorRuleFile(selected.template.content)
          vscode.window.showInformationMessage(`成功创建 ${selected.label} 模板`)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '未知错误'
          vscode.window.showErrorMessage(`创建模板失败: ${errorMessage}`)
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      vscode.window.showErrorMessage(`加载模板失败: ${errorMessage}`)
    }
  })

  context.subscriptions.push(disposable)
}
