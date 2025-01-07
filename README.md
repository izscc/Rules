# Cursor Rules Template

A VSCode extension for managing and applying .cursorrules templates.

这是一个用于管理和应用 .cursorrules 模板的 VSCode 插件。

## Features | 功能

- Apply predefined .cursorrules templates | 应用预定义的 .cursorrules 模板
- Save custom .cursorrules templates | 保存自定义的 .cursorrules 模板
- Multiple role templates available | 提供多个角色模板
- Easy to use command palette integration | 易于使用的命令面板集成

## Usage | 使用方法

### Apply Template | 应用模板

1. Open Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
2. Type "Apply Cursor Rules Template" | 输入"应用 Cursor 规则模板"
3. Select a template from the list | 从列表中选择一个模板
4. The template will be applied to your workspace | 模板将被应用到你的工作区

### Save Custom Template | 保存自定义模板

1. Right-click on any .cursorrules file in the explorer | 在资源管理器中右键点击任意 .cursorrules 文件
2. Select "Save as Cursor Rules Template" | 选择"保存为 Cursor Rules 模板"
3. Enter a name and description for your template | 输入模板名称和描述
4. The template will be saved and available in the template list | 模板将被保存并在模板列表中可用

### Create Template File | 创建模板文件

1. Right-click on any folder in the explorer | 在资源管理器中右键点击任意文件夹
2. Select "Create Cursor Rules Template File" | 选择"创建 Cursor Rules 模板文件"
3. Choose a template from the list | 从列表中选择一个模板
4. The template file will be created in the selected folder | 模板文件将被创建在选中的文件夹中

Note: Custom templates take precedence over built-in templates with the same name.
注意：自定义模板的优先级高于同名的内置模板。

## Available Templates | 可用模板

- AI Assistant
- Python Expert
- Unity Developer
- Product Manager
- VSCode Expert
- And more... | 更多模板...
- Your custom templates | 你的自定义模板

## Requirements | 要求

- VSCode 1.60.0 or above | VSCode 1.60.0 或更高版本

## Extension Settings | 插件设置

This extension contributes the following settings:

- `cursor-rules.applyTemplate`: Apply a Cursor rules template

## Release Notes | 发布说明

### 1.0.7

- 添加文件夹右键创建模板文件功能
- 优化用户界面和错误处理

### 1.0.6

- 添加右键菜单保存模板功能
- 优化模板管理机制

### 0.0.1

Initial release of Cursor Rules Template | 初始版本发布

## Issues | 问题反馈

If you find any issues, please report them on our [GitHub repository](https://github.com/kelisiWu123/cursor-rules-wizard/issues).

如果你发现任何问题，请在我们的 [GitHub 仓库](https://github.com/kelisiWu123/cursor-rules-wizard/issues)上报告。
