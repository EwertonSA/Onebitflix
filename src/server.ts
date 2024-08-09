import express  from 'express'
import {database} from './database'
import { adminJs, adminJsRouter} from './adminjs'
import { router } from './routes'
import path from 'path'
import cors from 'cors'


const app= express()
app.use(cors())
app.use(express.static(path.join(__dirname, '../','public')));
app.use(express.json())
app.use(adminJs.options.rootPath, adminJsRouter)
app.use(router)
const PORT= process.env.PORT||3000
app.listen(PORT,()=>{
    database.authenticate().then(()=>{
        console.log("conection success")
    })
  
})