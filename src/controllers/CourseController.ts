import { getPaginationParams } from "../helpers/getPaginationParams"
import { AuthenticatedRequest } from "../midlewares/auth"

import { courseService } from "../services/courseService"
import { Request,Response } from "express"
import { likeService } from "../services/likeService"
import { favoriteService } from "../services/favoriteService"
export const courseController={
featured:async(req:Request,res:Response)=>{
    try{
const featuredCourses= await courseService.getRamdomFeaturedCourses()
return res.json(featuredCourses)
    }catch(err){
        if(err instanceof Error){
            return res.status(400).json({message:err.message})
        }
    }
},
newest: async(req:Request,res:Response)=>{
try {
    const newestCourses=await courseService.getToptenNewest()
    return res.json(newestCourses)
} catch (error) {
   if(error instanceof Error){
    return res.status(400).json({message: error.message})
   }
}
},
popular:async(req:Request,res:Response)=>{
    try {
        const topten =await courseService.getTopTenByLikes()
        return res.json(topten)
    } catch (error) {
        if(error instanceof Error){
            return res.status(404).json({message:error.message})
        }
    }
},
search:async(req:Request,res:Response)=>{
    const {name}=req.query
    const [page,perPage]=getPaginationParams(req.query)
    try {
        if(typeof name !=='string')throw new Error('Name param must be of type string')
       const courses= await courseService.findByName(name,page,perPage) 
    return res.json(courses)
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({message: error.message})
    }
}},
show: async(req:AuthenticatedRequest,res:Response)=>{
    const userId=req.user!.id
    const courseId=req.params.id
    try{
        const course= await courseService.findByIdWithEpisodes(courseId)
        if(!course){
            return res.status(404).json({message:'Não existe'})
        }
        const favorited=await favoriteService.isFavorited(userId,Number(courseId))
        const liked=await likeService.isLiked(userId,Number(courseId))
return res.json({...course.get(),liked,favorited})
    }catch(err){
        if(err instanceof Error){
            return res.status(404).json({message:err.message})
        }
    }
}
}