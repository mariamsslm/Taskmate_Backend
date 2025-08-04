import { createCategorie,deleteCategories ,editCategory,getAllCAtegorie } from '../controllers/categorieController.js'
import express from 'express'

const categorieRoute = express.Router()
categorieRoute.post('/categories',createCategorie)
categorieRoute.delete('/delete',deleteCategories)
categorieRoute.put('/edit',editCategory)
categorieRoute.get('/get',getAllCAtegorie )

export default categorieRoute;