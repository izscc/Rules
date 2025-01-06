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
exports.createCursorRuleFile = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function createCursorRuleFile(content) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        throw new Error('没有打开的工作区');
    }
    const rootPath = workspaceFolders[0].uri.fsPath;
    const filePath = path.join(rootPath, '.cursorrules');
    try {
        // 检查文件是否已存在
        if (fs.existsSync(filePath)) {
            const answer = await vscode.window.showWarningMessage('.cursorrules 文件已存在，是否覆盖？', '是', '否');
            if (answer !== '是') {
                return;
            }
        }
        fs.writeFileSync(filePath, content, 'utf8');
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : '未知错误';
        throw new Error(`无法创建文件: ${errorMessage}`);
    }
}
exports.createCursorRuleFile = createCursorRuleFile;
//# sourceMappingURL=fileUtils.js.map