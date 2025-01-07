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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function registerTemplateCommands(context) {
    // 设置上下文
    templateLoader_1.TemplateLoader.setContext(context);
    // 注册应用模板命令
    let applyTemplateDisposable = vscode.commands.registerCommand('cursor-rules.applyTemplate', async () => {
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
    // 注册保存模板命令
    let saveTemplateDisposable = vscode.commands.registerCommand('cursor-rules.saveAsTemplate', async (uri) => {
        try {
            if (!uri) {
                vscode.window.showErrorMessage('请在 .cursorrules 文件上右键选择此命令');
                return;
            }
            // 读取文件内容
            const content = await fs.promises.readFile(uri.fsPath, 'utf-8');
            // 获取模板名称
            const templateName = await vscode.window.showInputBox({
                prompt: '请输入模板名称',
                placeHolder: '例如：My Custom Template',
                validateInput: (value) => {
                    if (!value) {
                        return '模板名称不能为空';
                    }
                    if (value.length > 50) {
                        return '模板名称不能超过50个字符';
                    }
                    return null;
                },
            });
            if (!templateName) {
                return;
            }
            // 获取模板描述
            const templateDescription = await vscode.window.showInputBox({
                prompt: '请输入模板描述',
                placeHolder: '例如：这是一个自定义的模板',
            });
            if (!templateDescription) {
                return;
            }
            // 构建模板对象
            const template = {
                name: templateName,
                description: templateDescription,
                content: content,
            };
            // 保存模板到用户目录
            const templateDir = path.join(context.globalStorageUri.fsPath, 'templates');
            if (!fs.existsSync(templateDir)) {
                fs.mkdirSync(templateDir, { recursive: true });
            }
            const templatePath = path.join(templateDir, `${templateName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`);
            await fs.promises.writeFile(templatePath, JSON.stringify(template, null, 2), 'utf-8');
            vscode.window.showInformationMessage(`模板 "${templateName}" 保存成功`);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : '未知错误';
            vscode.window.showErrorMessage(`保存模板失败: ${errorMessage}`);
        }
    });
    context.subscriptions.push(applyTemplateDisposable, saveTemplateDisposable);
}
exports.registerTemplateCommands = registerTemplateCommands;
//# sourceMappingURL=templateCommands.js.map