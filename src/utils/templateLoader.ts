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
          const templateContent = this.extractContent(template.content)

          templates.push({
            name: template.name,
            description: template.description,
            content: templateContent,
          })
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
          const templateContent = this.extractContent(template.content)

          templates.push({
            name: template.name,
            description: template.description,
            content: templateContent,
          })
        }
      }

      return templates
    } catch (error) {
      console.error('Failed to load user templates:', error)
      return []
    }
  }

  private static extractContent(content: any): string {
    if (typeof content === 'string') {
      return content
    }

    if (content && typeof content === 'object') {
      const sections: string[] = []

      // 添加角色定位
      if (content.role) {
        sections.push(`# 角色定位\n${content.role}`)
      }

      // 添加目标
      if (content.goals) {
        sections.push(`# 目标\n${content.goals.map((goal: string) => `- ${goal}`).join('\n')}`)
      }

      // 添加规则
      if (content.rules) {
        sections.push(`## 规则\n${content.rules.map((rule: string) => `- ${rule}`).join('\n')}`)
      }

      // 添加最佳实践
      if (content.best_practices) {
        sections.push(`## 最佳实践\n${content.best_practices.map((practice: string) => `- ${practice}`).join('\n')}`)
      }

      // 添加开发步骤
      if (content.development_steps && typeof content.development_steps === 'object') {
        sections.push('## 开发步骤')
        for (const [key, value] of Object.entries(content.development_steps)) {
          if (Array.isArray(value)) {
            sections.push(`### ${this.formatTitle(key)}\n${value.map((item: string) => `- ${item}`).join('\n')}`)
          }
        }
      }

      // 添加技术规范
      if (content.technical_specs && typeof content.technical_specs === 'object') {
        sections.push('## 技术规范')
        for (const [key, value] of Object.entries(content.technical_specs)) {
          if (Array.isArray(value)) {
            sections.push(`### ${this.formatTitle(key)}\n${value.map((item: string) => `- ${item}`).join('\n')}`)
          }
        }
      }

      // 添加开发工具
      if (content.development_tools && typeof content.development_tools === 'object') {
        sections.push('## 开发工具')
        for (const [key, value] of Object.entries(content.development_tools)) {
          if (Array.isArray(value)) {
            sections.push(`### ${this.formatTitle(key)}\n${value.map((item: string) => `- ${item}`).join('\n')}`)
          } else if (value && typeof value === 'object') {
            sections.push(`### ${this.formatTitle(key)}`)
            for (const [subKey, subValue] of Object.entries(value)) {
              if (Array.isArray(subValue)) {
                sections.push(`#### ${this.formatTitle(subKey)}\n${subValue.map((item: string) => `- ${item}`).join('\n')}`)
              }
            }
          }
        }
      }

      // 添加项目结构
      if (content.project_structure && typeof content.project_structure === 'object') {
        sections.push('## 项目结构')
        for (const [key, value] of Object.entries(content.project_structure)) {
          if (Array.isArray(value)) {
            sections.push(`### ${this.formatTitle(key)}\n${value.map((item: string) => `- ${item}`).join('\n')}`)
          }
        }
      }

      return sections.join('\n\n')
    }

    return ''
  }

  private static formatTitle(key: string): string {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
}
