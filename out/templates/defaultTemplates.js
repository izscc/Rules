"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultTemplates = void 0;
const templateLoader_1 = require("../utils/templateLoader");
async function getDefaultTemplates() {
    return await templateLoader_1.TemplateLoader.loadTemplates();
}
exports.getDefaultTemplates = getDefaultTemplates;
//# sourceMappingURL=defaultTemplates.js.map