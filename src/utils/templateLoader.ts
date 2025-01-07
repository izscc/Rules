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
      // 在开发模式下使用不同的方式获取路径
      let extensionPath: string
      const extension = vscode.extensions.getExtension('kelisiWu123.cursor-rules-template')

      if (extension) {
        extensionPath = extension.extensionPath
        console.log('Extension found, using path:', extensionPath)
      } else {
        // 在开发模式下，直接使用工作区路径
        const workspaceFolders = vscode.workspace.workspaceFolders
        if (!workspaceFolders) {
          throw new Error('未找到工作区')
        }
        extensionPath = workspaceFolders[0].uri.fsPath
        console.log('Using workspace path for development:', extensionPath)
      }

      const templates: Template[] = []

      // 尝试从 out 目录加载
      const outPath = path.join(extensionPath, 'out', this.ROLES_DIR)
      console.log('Trying out directory path:', outPath)

      // 尝试从 src 目录加载
      const srcPath = path.join(extensionPath, 'src', this.ROLES_DIR)
      console.log('Trying src directory path:', srcPath)

      // 确定使用哪个路径
      let templatesPath = ''
      if (fs.existsSync(outPath)) {
        templatesPath = outPath
        console.log('Using out directory for templates')
      } else if (fs.existsSync(srcPath)) {
        templatesPath = srcPath
        console.log('Using src directory for templates')
      } else {
        console.error('No template directory found')
        console.error('Checked paths:', { outPath, srcPath })
        throw new Error('找不到模板目录')
      }

      const files = fs.readdirSync(templatesPath).filter((file) => file.endsWith('.json'))
      console.log('Found template files:', files)

      if (files.length === 0) {
        console.warn('No template files found in:', templatesPath)
        return []
      }

      for (const file of files) {
        try {
          const filePath = path.join(templatesPath, file)
          console.log('Loading template from:', filePath)
          const content = fs.readFileSync(filePath, 'utf8')
          const template = JSON.parse(content) as Template
          templates.push(template)
        } catch (error) {
          console.error(`Error loading template ${file}:`, error)
          // 继续加载其他模板
          continue
        }
      }

      return templates
    } catch (error) {
      console.error('Error in loadTemplates:', error)
      throw error
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
