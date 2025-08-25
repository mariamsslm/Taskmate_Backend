import { createTask ,editTask, deleteTask,getTaskById,getAllTask,getCategorieTask} from "../controllers/taskController.js";
import { authorized } from "../middelweares/auth.js";
import expres from 'express'

const taskRoute = expres.Router()
taskRoute.post('/create',authorized,createTask)
taskRoute.put('/edit',authorized,editTask)
taskRoute.delete('/delete',authorized,deleteTask)
taskRoute.get('/getId',authorized,getTaskById )
taskRoute.get('/getAllTask',authorized,getAllTask)
taskRoute.get('/getCategorie',authorized,getCategorieTask)


export default taskRoute;