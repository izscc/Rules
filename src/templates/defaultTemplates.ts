import { TemplateLoader } from '../utils/templateLoader'

export interface Template {
  name: string
  description: string
  content: string
}

export async function getDefaultTemplates(): Promise<Template[]> {
  try {
    const roleTemplates = await TemplateLoader.loadTemplates()
    const templates: Template[] = []

    for (const roleTemplate of roleTemplates) {
      const content = await TemplateLoader.generateCursorRules(roleTemplate)
      templates.push({
        name: roleTemplate.name,
        description: roleTemplate.description,
        content: content,
      })
    }

    return templates
  } catch (error) {
    console.error('加载模板失败:', error)
    return []
  }
}
