# Cursor Rules Template

[![Version](https://img.shields.io/visual-studio-marketplace/v/cursor-rules-template)](https://marketplace.visualstudio.com/items?itemName=cursor-rules-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VSCode](https://img.shields.io/badge/VSCode-1.60+-blue.svg)](https://code.visualstudio.com/)

一个用于快速创建和管理 `.cursorrules` 模板的 VSCode 插件。通过这个插件，你可以轻松地在项目中应用预定义的 Cursor AI 规则模板，提高开发效率。

## ✨ 特性

- 🚀 快速应用预定义的 `.cursorrules` 模板
- 📝 支持多种常用的模板场景
- 🔄 智能处理已存在的配置文件
- 💡 简单直观的用户界面

## 📦 安装

### 从 VS Code 扩展市场安装

1. 打开 VS Code
2. 按下 `Ctrl+P` / `Cmd+P` 打开命令面板
3. 输入 `ext install cursor-rules-template`
4. 点击安装

### 从 VSIX 文件安装

1. 下载最新的 `.vsix` 文件
2. 在 VS Code 中，选择 `扩展` 视图
3. 点击 `...` 更多操作按钮
4. 选择 `从 VSIX 安装...`
5. 选择下载的 `.vsix` 文件

## 🚀 使用方法

1. 在 VS Code 中打开你的项目
2. 按下 `Ctrl+Shift+P` / `Cmd+Shift+P` 打开命令面板
3. 输入 "应用 Cursor 规则模板" 并选择
4. 从列表中选择想要应用的模板
5. 确认创建或覆盖 `.cursorrules` 文件

## 📋 可用模板

本插件提供了多个预定义的模板，包括：

- 基础模板：适用于一般项目的基础配置
- 开发模板：针对开发环境的特殊配置
- 其他更多模板...

## 🛠️ 开发

### 环境要求

- Node.js (>= 14.x)
- VS Code (>= 1.60.0)

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/cursor-rules-template.git

# 安装依赖
npm install

# 编译
npm run compile

# 运行测试
npm run test
```

### 打包

```bash
# 安装 vsce
npm install -g @vscode/vsce

# 打包
vsce package
```

## 📝 更新日志

### [0.0.1] - 2024-01-xx

- 🎉 初始版本发布
- ✨ 添加基本模板功能
- 🐛 修复已知问题

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解更多详情。

## 👨‍💻 作者

- 作者名字
- GitHub: [@kelisiWu123](https://github.com/kelisiWu123)

## 🙏 致谢

- [VS Code](https://code.visualstudio.com/) - 最好的代码编辑器
- [Cursor](https://cursor.sh/) - 强大的 AI 编程助手

---

如果这个项目对你有帮助，请给它一个 ⭐️！
