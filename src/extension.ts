import * as vscode from 'vscode'
import { registerTemplateCommands } from './commands/templateCommands'

export function activate(context: vscode.ExtensionContext) {
  try {
    console.log('Activating Cursor Rules Template extension')

    // 确保扩展存储目录存在
    const storageUri = context.globalStorageUri
    const fs = require('fs')
    if (!fs.existsSync(storageUri.fsPath)) {
      fs.mkdirSync(storageUri.fsPath, { recursive: true })
    }

    registerTemplateCommands(context)
    console.log('Cursor Rules Template extension activated successfully')
  } catch (error) {
    console.error('Failed to activate Cursor Rules Template extension:', error)
    vscode.window.showErrorMessage('Cursor Rules Template 插件激活失败')
    throw error
  }
}

export function deactivate() {
  console.log('Deactivating Cursor Rules Template extension')
}
