import express from 'express'
import { categoriesController } from './controllers/CategoryController'
import { courseController } from './controllers/CourseController'
import { episodesController } from './controllers/EpisodeController'
import { authController } from './controllers/authController';
import { ensureAuth, ensureAuthViaQuery } from './midlewares/auth';
import { favoritesController } from './controllers/favoriteController';
import { LikesController } from './controllers/LikesController';
import { userController } from './controllers/UsersController';
export const router= express.Router()
router.post('/auth/register',authController.register)
router.post('/auth/login',authController.login)

router.get('/categories',ensureAuth,categoriesController.index)
router.get('/categories/:id',ensureAuth,categoriesController.show)


router.get('/courses/featured',ensureAuth,courseController.featured)
router.get('/courses/popular',ensureAuth,courseController.popular)
router.get('/courses/newest',courseController.newest)
router.get('/courses/search',ensureAuth,courseController.search)
router.get('/courses/:id',ensureAuth,courseController.show)

router.get('/episodes/stream',ensureAuthViaQuery,episodesController.stream)
router.get('/episodes/:id/watchTime',ensureAuth,episodesController.getWatchTime)
router.post('/episodes/:id/watchTime',ensureAuth,episodesController.setWatchTime)

router.get('/favorites',ensureAuth,favoritesController.index)
router.post('/favorites',ensureAuth,favoritesController.save)
router.delete('/favorites/:id',ensureAuth,favoritesController.delete)

router.post ('/likes',ensureAuth,LikesController.save)
router.delete('/likes/:id',ensureAuth,LikesController.delete)

router.get('/users/current',ensureAuth,userController.show)
router.put('/users/current',ensureAuth,userController.udpate)
router.put('/users/current/password',ensureAuth,userController.updatePassword)
router.get('/users/current/watching', ensureAuth, userController.watching)
