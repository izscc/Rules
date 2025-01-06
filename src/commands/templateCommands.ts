import * as vscode from 'vscode'
import { defaultTemplates } from '../templates/defaultTemplates'
import { createCursorRuleFile } from '../utils/fileUtils'

export function registerTemplateCommands(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('cursor-rules.applyTemplate', async () => {
    const selected = await vscode.window.showQuickPick(
      defaultTemplates.map((template) => ({
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
  })

  context.subscriptions.push(disposable)
}
