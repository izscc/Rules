import * as vscode from 'vscode'
import { getDefaultTemplates } from '../templates/defaultTemplates'
import { createCursorRuleFile } from '../utils/fileUtils'
import { TemplateLoader } from '../utils/templateLoader'
import * as fs from 'fs'
import * as path from 'path'

export function registerTemplateCommands(context: vscode.ExtensionContext) {
  // 设置上下文
  TemplateLoader.setContext(context)

  // 注册应用模板命令
  let applyTemplateDisposable = vscode.commands.registerCommand('cursor-rules.applyTemplate', async () => {
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

  // 注册保存模板命令
  let saveTemplateDisposable = vscode.commands.registerCommand('cursor-rules.saveAsTemplate', async (uri: vscode.Uri) => {
    try {
      if (!uri) {
        vscode.window.showErrorMessage('请在 .cursorrules 文件上右键选择此命令')
        return
      }

      // 读取文件内容
      const content = await fs.promises.readFile(uri.fsPath, 'utf-8')

      // 获取模板名称
      const templateName = await vscode.window.showInputBox({
        prompt: '请输入模板名称',
        placeHolder: '例如：My Custom Template',
        validateInput: (value) => {
          if (!value) {
            return '模板名称不能为空'
          }
          if (value.length > 50) {
            return '模板名称不能超过50个字符'
          }
          return null
        },
      })

      if (!templateName) {
        return
      }

      // 获取模板描述
      const templateDescription = await vscode.window.showInputBox({
        prompt: '请输入模板描述',
        placeHolder: '例如：这是一个自定义的模板',
      })

      if (!templateDescription) {
        return
      }

      // 构建模板对象
      const template = {
        name: templateName,
        description: templateDescription,
        content: content,
      }

      // 保存模板到用户目录
      const templateDir = path.join(context.globalStorageUri.fsPath, 'templates')
      if (!fs.existsSync(templateDir)) {
        fs.mkdirSync(templateDir, { recursive: true })
      }

      const templatePath = path.join(templateDir, `${templateName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`)
      await fs.promises.writeFile(templatePath, JSON.stringify(template, null, 2), 'utf-8')

      vscode.window.showInformationMessage(`模板 "${templateName}" 保存成功`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      vscode.window.showErrorMessage(`保存模板失败: ${errorMessage}`)
    }
  })

  // 注册在文件夹中创建模板文件的命令
  let createFromTemplateDisposable = vscode.commands.registerCommand('cursor-rules.createFromTemplate', async (uri: vscode.Uri) => {
    try {
      if (!uri) {
        vscode.window.showErrorMessage('请在文件夹上右键选择此命令')
        return
      }

      const templates = await getDefaultTemplates()

      if (templates.length === 0) {
        vscode.window.showErrorMessage('没有可用的模板')
        return
      }

      // 选择模板
      const selected = await vscode.window.showQuickPick(
        templates.map((template) => ({
          label: template.name,
          description: template.description,
          template: template,
        })),
        {
          placeHolder: '选择要创建的模板',
        }
      )

      if (selected) {
        try {
          // 构建目标文件路径
          const targetPath = path.join(uri.fsPath, '.cursorrules')

          // 检查文件是否已存在
          if (fs.existsSync(targetPath)) {
            const overwrite = await vscode.window.showWarningMessage('该文件夹下已存在 .cursorrules 文件，是否覆盖？', '覆盖', '取消')
            if (overwrite !== '覆盖') {
              return
            }
          }

          // 写入文件
          await fs.promises.writeFile(targetPath, selected.template.content, 'utf-8')

          // 打开新创建的文件
          const document = await vscode.workspace.openTextDocument(targetPath)
          await vscode.window.showTextDocument(document)

          vscode.window.showInformationMessage(`成功创建 ${selected.label} 模板文件`)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '未知错误'
          vscode.window.showErrorMessage(`创建模板文件失败: ${errorMessage}`)
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      vscode.window.showErrorMessage(`加载模板失败: ${errorMessage}`)
    }
  })

  context.subscriptions.push(applyTemplateDisposable, saveTemplateDisposable, createFromTemplateDisposable)
}
