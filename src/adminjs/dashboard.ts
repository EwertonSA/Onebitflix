import AdminJS, { PageHandler } from 'adminjs';
import { Category, Course, Episode, User } from '../models';


export const dashboardOptions:{
    handler: PageHandler,
    component?: string
}={
    component: AdminJS.bundle('./components/Dashboard'),
    handler:async (req,res,context)=>{
      const courses= await Course.count()
      const episodes= await Episode.count()
      const categories= await Category.count()
      const standarUSers=await User.count()
      res.json({
        'Cursos:':courses,
        'Episodios:':episodes,
        'Categorias:':categories,
        'Usuários:':standarUSers
      })
    }
  }