"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const adminjs_1 = require("./adminjs");
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
app.use(express_1.default.json());
app.use(adminjs_1.adminJs.options.rootPath, adminjs_1.adminJsRouter);
app.use(routes_1.router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    database_1.database.authenticate().then(() => {
        console.log("conection success");
    });
});
