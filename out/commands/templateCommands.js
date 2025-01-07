"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTemplateCommands = void 0;
const vscode = __importStar(require("vscode"));
const defaultTemplates_1 = require("../templates/defaultTemplates");
const fileUtils_1 = require("../utils/fileUtils");
const templateLoader_1 = require("../utils/templateLoader");
function registerTemplateCommands(context) {
    // 设置上下文
    templateLoader_1.TemplateLoader.setContext(context);
    let disposable = vscode.commands.registerCommand('cursor-rules.applyTemplate', async () => {
        try {
            const templates = await (0, defaultTemplates_1.getDefaultTemplates)();
            if (templates.length === 0) {
                vscode.window.showErrorMessage('没有可用的模板');
                return;
            }
            const selected = await vscode.window.showQuickPick(templates.map((template) => ({
                label: template.name,
                description: template.description,
                template: template,
            })), {
                placeHolder: '选择一个.cursorrules模板',
            });
            if (selected) {
                try {
                    await (0, fileUtils_1.createCursorRuleFile)(selected.template.content);
                    vscode.window.showInformationMessage(`成功创建 ${selected.label} 模板`);
                }
                catch (error) {
                    const errorMessage = error instanceof Error ? error.message : '未知错误';
                    vscode.window.showErrorMessage(`创建模板失败: ${errorMessage}`);
                }
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : '未知错误';
            vscode.window.showErrorMessage(`加载模板失败: ${errorMessage}`);
        }
    });
    context.subscriptions.push(disposable);
}
exports.registerTemplateCommands = registerTemplateCommands;
//# sourceMappingURL=templateCommands.js.map