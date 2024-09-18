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
exports.courseController = void 0;
const getPaginationParams_1 = require("../helpers/getPaginationParams");
const courseService_1 = require("../services/courseService");
const likeService_1 = require("../services/likeService");
const favoriteService_1 = require("../services/favoriteService");
exports.courseController = {
    featured: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const featuredCourses = yield courseService_1.courseService.getRamdomFeaturedCourses();
            return res.json(featuredCourses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }),
    newest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newestCourses = yield courseService_1.courseService.getToptenNewest();
            return res.json(newestCourses);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
        }
    }),
    popular: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const topten = yield courseService_1.courseService.getTopTenByLikes();
            return res.json(topten);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ message: error.message });
            }
        }
    }),
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.query;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            if (typeof name !== 'string')
                throw new Error('Name param must be of type string');
            const courses = yield courseService_1.courseService.findByName(name, page, perPage);
            return res.json(courses);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
        }
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const courseId = req.params.id;
        try {
            const course = yield courseService_1.courseService.findByIdWithEpisodes(courseId);
            if (!course) {
                return res.status(404).json({ message: 'Não existe' });
            }
            const favorited = yield favoriteService_1.favoriteService.isFavorited(userId, Number(courseId));
            const liked = yield likeService_1.likeService.isLiked(userId, Number(courseId));
            return res.json(Object.assign(Object.assign({}, course.get()), { liked, favorited }));
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(404).json({ message: err.message });
            }
        }
    })
};
