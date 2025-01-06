import * as fs from 'fs'
import * as path from 'path'

export interface CursorRule {
  name: string
  description: string
  content: string
}

const templatesPath = path.join(__dirname, 'templates.json')
const templatesJson = JSON.parse(fs.readFileSync(templatesPath, 'utf8'))

export const defaultTemplates: CursorRule[] = Object.values(templatesJson)
