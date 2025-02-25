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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const templateCommands_1 = require("./commands/templateCommands");
const enhancedTemplateCommands_1 = require("./commands/enhancedTemplateCommands");
const templateViewProvider_1 = require("./views/templateViewProvider");
const statusBarManager_1 = require("./views/statusBarManager");
const templateLoader_1 = require("./utils/templateLoader");
function activate(context) {
    try {
        console.log('Activating Cursor Rules Template extension');
        // 确保扩展存储目录存在
        const storageUri = context.globalStorageUri;
        const fs = require('fs');
        if (!fs.existsSync(storageUri.fsPath)) {
            fs.mkdirSync(storageUri.fsPath, { recursive: true });
        }
        // 设置模板加载器上下文
        templateLoader_1.TemplateLoader.setContext(context);
        // 注册模板视图提供者
        const templateViewProvider = new templateViewProvider_1.TemplateViewProvider(context);
        const templateTreeView = vscode.window.createTreeView('cursorRulesTemplates', {
            treeDataProvider: templateViewProvider,
            showCollapseAll: true
        });
        // 注册状态栏
        const statusBarManager = new statusBarManager_1.StatusBarManager(context);
        // 注册命令
        (0, templateCommands_1.registerTemplateCommands)(context);
        (0, enhancedTemplateCommands_1.registerEnhancedTemplateCommands)(context, templateViewProvider);
        // 添加到订阅中
        context.subscriptions.push(templateTreeView);
        console.log('Cursor Rules Template extension activated successfully');
    }
    catch (error) {
        console.error('Failed to activate Cursor Rules Template extension:', error);
        vscode.window.showErrorMessage('Cursor Rules Template 插件激活失败');
        throw error;
    }
}
exports.activate = activate;
function deactivate() {
    console.log('Deactivating Cursor Rules Template extension');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map