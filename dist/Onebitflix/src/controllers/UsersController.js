"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
exports.userController = {
    watching: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.user;
        try {
            const watching = yield userService_1.userService.getKeepWatchingList(id);
            return res.json(watching);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const currentUser = req.user;
        try {
            res.json(currentUser);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ message: error.message });
            }
        }
    }),
    udpate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.user;
        const { firstName, lastName, phone, email, birth } = req.body;
        try {
            const updatedUser = yield userService_1.userService.update(id, {
                firstName, lastName, phone, email, birth
            });
            return res.json(updatedUser);
        }
        catch (err) {
            if (err instanceof Error)
                (res.status(404).json({ message: err.message }));
        }
    }), updatePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { currentPassword, newPassword } = req.body;
        if (!user) {
            return res.status(401).json({ message: 'Não autorizado!' });
        }
        try {
            user.checkPassword(currentPassword, (err, isSame) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                if (!isSame) {
                    return res.status(400).json({ message: 'Senha incorreta' });
                }
                yield userService_1.userService.updatePassword(user.id, newPassword);
                return res.status(204).send();
            }));
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    })
};
