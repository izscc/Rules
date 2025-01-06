import * as vscode from 'vscode'
import { registerTemplateCommands } from './commands/templateCommands'

export function activate(context: vscode.ExtensionContext) {
  registerTemplateCommands(context)
}

export function deactivate() {}
