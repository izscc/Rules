"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const templateCommands_1 = require("./commands/templateCommands");
function activate(context) {
    (0, templateCommands_1.registerTemplateCommands)(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map