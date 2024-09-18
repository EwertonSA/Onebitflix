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
exports.favoritesController = void 0;
const favoriteService_1 = require("../services/favoriteService");
exports.favoritesController = {
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        try {
            const favorites = yield favoriteService_1.favoriteService.findUserId(userId);
            return res.json(favorites);
        }
        catch (error) {
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
        }
    }),
    save: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const { courseId } = req.body;
        try {
            const favorite = yield favoriteService_1.favoriteService.create(userId, courseId);
            return res.status(201).json(favorite);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const courseId = parseInt(req.params.id, 10);
        if (isNaN(courseId)) {
            return res.status(400).json({ message: "Invalid course ID" });
        }
        try {
            yield favoriteService_1.favoriteService.delete(userId, courseId);
            return res.status(204).send();
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }),
};
