import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

interface DevelopmentSteps {
  architecture_review?: string[]
  coding_standards?: string[]
  development_process?: string[]
  debugging_focus?: string[]
}

interface TemplateContent {
  role: string
  goals: string[]
  rules: string[]
  best_practices?: string[]
  development_steps?: DevelopmentSteps
  communication_style: {
    tone: string
    language: string
    format: string
  }
}

interface Template {
  name: string
  description: string
  version: string
  content: TemplateContent
}

export class TemplateLoader {
  private static readonly ROLES_DIR = 'templates/roles'

  static async loadTemplates(): Promise<Template[]> {
    try {
      const extensionPath = vscode.extensions.getExtension('cursor-rules-template')?.extensionPath
      if (!extensionPath) {
        throw new Error('无法获取插件路径')
      }

      const rolesPath = path.join(extensionPath, 'src', this.ROLES_DIR)
      const templates: Template[] = []

      // 读取角色目录下的所有 JSON 文件
      const files = fs.readdirSync(rolesPath).filter((file) => file.endsWith('.json'))

      for (const file of files) {
        const filePath = path.join(rolesPath, file)
        const content = fs.readFileSync(filePath, 'utf8')
        const template = JSON.parse(content) as Template
        templates.push(template)
      }

      return templates
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      throw new Error(`加载模板失败: ${errorMessage}`)
    }
  }

  static async generateCursorRules(template: Template): Promise<string> {
    const { content } = template

    let rulesContent = `# Role\n${content.role}\n\n`
    rulesContent += `# Goal\n${content.goals.join('\n')}\n\n`

    if (content.rules && content.rules.length > 0) {
      rulesContent += `# Rules\n${content.rules.map((rule) => `- ${rule}`).join('\n')}\n\n`
    }

    if (content.best_practices && content.best_practices.length > 0) {
      rulesContent += `# Best Practices\n${content.best_practices.map((practice) => `- ${practice}`).join('\n')}\n\n`
    }

    if (content.development_steps) {
      rulesContent += '# Development Steps\n'
      for (const [key, steps] of Object.entries(content.development_steps)) {
        if (steps && steps.length > 0) {
          const sectionTitle = key
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          rulesContent += `## ${sectionTitle}\n`
          rulesContent += `${steps.map((step: string) => `- ${step}`).join('\n')}\n\n`
        }
      }
    }

    if (content.communication_style) {
      rulesContent += `# Communication Style\n`
      rulesContent += `- Tone: ${content.communication_style.tone}\n`
      rulesContent += `- Language: ${content.communication_style.language}\n`
      rulesContent += `- Format: ${content.communication_style.format}\n`
    }

    return rulesContent
  }
}
