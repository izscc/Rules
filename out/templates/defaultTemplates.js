"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultTemplates = void 0;
const templateLoader_1 = require("../utils/templateLoader");
async function getDefaultTemplates() {
    try {
        const roleTemplates = await templateLoader_1.TemplateLoader.loadTemplates();
        const templates = [];
        for (const roleTemplate of roleTemplates) {
            const content = await templateLoader_1.TemplateLoader.generateCursorRules(roleTemplate);
            templates.push({
                name: roleTemplate.name,
                description: roleTemplate.description,
                content: content,
            });
        }
        return templates;
    }
    catch (error) {
        console.error('加载模板失败:', error);
        return [];
    }
}
exports.getDefaultTemplates = getDefaultTemplates;
//# sourceMappingURL=defaultTemplates.js.map