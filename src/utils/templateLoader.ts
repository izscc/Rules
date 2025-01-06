import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

interface DevelopmentSteps {
  architecture_review?: string[]
  coding_standards?: string[]
  development_process?: string[]
  debugging_focus?: string[]
  requirement_analysis?: string[]
  problem_solving?: string[]
  quality_assurance?: string[]
  product_design?: string[]
  development_coordination?: string[]
  launch_management?: string[]
  technical_planning?: string[]
  implementation_guidance?: string[]
}

interface TechnicalSpecs {
  electron_version?: string
  chromium_version?: string
  taro_version?: string
  vue_version?: string
  uni_app_version?: string
  vite_version?: string
  framework_support?: string[]
  platform_support?: string[]
  focus_areas?: string[]
}

interface DevEnvironment {
  node_version?: string
  package_manager?: string[]
  ide?: string[]
}

interface DevelopmentTools {
  build_tools?: string[]
  recommended_libs?: string[]
  dev_environment?: DevEnvironment
}

interface ProjectStructure {
  recommended_directories?: string[]
  key_files?: string[]
}

interface TemplateContent {
  role: string
  goals: string[]
  rules: string[]
  best_practices?: string[]
  development_steps?: DevelopmentSteps
  technical_specs?: TechnicalSpecs
  development_tools?: DevelopmentTools
  project_structure?: ProjectStructure
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

    if (content.technical_specs) {
      rulesContent += '# Technical Specifications\n'
      if (content.technical_specs.electron_version) {
        rulesContent += `- Electron Version: ${content.technical_specs.electron_version}\n`
      }
      if (content.technical_specs.chromium_version) {
        rulesContent += `- Chromium Version: ${content.technical_specs.chromium_version}\n`
      }
      if (content.technical_specs.taro_version) {
        rulesContent += `- Taro Version: ${content.technical_specs.taro_version}\n`
      }
      if (content.technical_specs.vue_version) {
        rulesContent += `- Vue Version: ${content.technical_specs.vue_version}\n`
      }
      if (content.technical_specs.uni_app_version) {
        rulesContent += `- uni-app Version: ${content.technical_specs.uni_app_version}\n`
      }
      if (content.technical_specs.vite_version) {
        rulesContent += `- Vite Version: ${content.technical_specs.vite_version}\n`
      }
      if (content.technical_specs.framework_support && content.technical_specs.framework_support.length > 0) {
        rulesContent += `- Framework Support: ${content.technical_specs.framework_support.join(', ')}\n`
      }
      if (content.technical_specs.platform_support && content.technical_specs.platform_support.length > 0) {
        rulesContent += `- Platform Support: ${content.technical_specs.platform_support.join(', ')}\n`
      }
      if (content.technical_specs.focus_areas && content.technical_specs.focus_areas.length > 0) {
        rulesContent += `\n## Focus Areas\n${content.technical_specs.focus_areas.map((area) => `- ${area}`).join('\n')}\n`
      }
      rulesContent += '\n'
    }

    if (content.development_tools) {
      rulesContent += '# Development Tools\n'
      if (content.development_tools.build_tools && content.development_tools.build_tools.length > 0) {
        rulesContent += `## Build Tools\n${content.development_tools.build_tools.map((tool) => `- ${tool}`).join('\n')}\n\n`
      }
      if (content.development_tools.recommended_libs && content.development_tools.recommended_libs.length > 0) {
        rulesContent += `## Recommended Libraries\n${content.development_tools.recommended_libs.map((lib) => `- ${lib}`).join('\n')}\n\n`
      }
      if (content.development_tools.dev_environment) {
        rulesContent += '## Development Environment\n'
        if (content.development_tools.dev_environment.node_version) {
          rulesContent += `- Node.js Version: ${content.development_tools.dev_environment.node_version}\n`
        }
        if (content.development_tools.dev_environment.package_manager && content.development_tools.dev_environment.package_manager.length > 0) {
          rulesContent += `- Package Managers: ${content.development_tools.dev_environment.package_manager.join(', ')}\n`
        }
        if (content.development_tools.dev_environment.ide && content.development_tools.dev_environment.ide.length > 0) {
          rulesContent += `- IDE: ${content.development_tools.dev_environment.ide.join(', ')}\n`
        }
        rulesContent += '\n'
      }
    }

    if (content.project_structure) {
      rulesContent += '# Project Structure\n'
      if (content.project_structure.recommended_directories && content.project_structure.recommended_directories.length > 0) {
        rulesContent += '## Recommended Directories\n'
        rulesContent += content.project_structure.recommended_directories.map((dir) => `- ${dir}`).join('\n')
        rulesContent += '\n\n'
      }
      if (content.project_structure.key_files && content.project_structure.key_files.length > 0) {
        rulesContent += '## Key Files\n'
        rulesContent += content.project_structure.key_files.map((file) => `- ${file}`).join('\n')
        rulesContent += '\n\n'
      }
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
