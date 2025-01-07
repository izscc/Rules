import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'

export interface Template {
  name: string
  description: string
  content: string
}

export class TemplateLoader {
  private static context: vscode.ExtensionContext

  static setContext(context: vscode.ExtensionContext) {
    this.context = context
  }

  static async loadTemplates(): Promise<Template[]> {
    try {
      // 加载内置模板
      const builtinTemplates = await this.loadBuiltinTemplates()

      // 加载用户自定义模板
      const userTemplates = await this.loadUserTemplates()

      // 合并模板，用户模板优先
      return [...userTemplates, ...builtinTemplates]
    } catch (error) {
      console.error('Failed to load templates:', error)
      throw error
    }
  }

  private static async loadBuiltinTemplates(): Promise<Template[]> {
    try {
      const templatesPath = path.join(this.context.extensionPath, 'src', 'templates', 'roles')
      const files = await fs.promises.readdir(templatesPath)
      const templates: Template[] = []

      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await fs.promises.readFile(path.join(templatesPath, file), 'utf-8')
          const template = JSON.parse(content)
          templates.push(template)
        }
      }

      return templates
    } catch (error) {
      console.error('Failed to load builtin templates:', error)
      return []
    }
  }

  private static async loadUserTemplates(): Promise<Template[]> {
    try {
      const userTemplatesPath = path.join(this.context.globalStorageUri.fsPath, 'templates')

      if (!fs.existsSync(userTemplatesPath)) {
        return []
      }

      const files = await fs.promises.readdir(userTemplatesPath)
      const templates: Template[] = []

      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await fs.promises.readFile(path.join(userTemplatesPath, file), 'utf-8')
          const template = JSON.parse(content)
          templates.push(template)
        }
      }

      return templates
    } catch (error) {
      console.error('Failed to load user templates:', error)
      return []
    }
  }
}
