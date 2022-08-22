import { Router } from "express";
import { getGrades, postGrade, putGrade, deleteGrade, sumGrades } from "../controllers/apiController.js";

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Welcome to Grades API, go to the <a href="http://localhost:3000/grades">grades section</a>.');
});

routes.get('/grades/:identifier?/:property?', async (req, res) => res.send(await getGrades(req.params.identifier, req.params.property)));

routes.post('/grades', async (req, res) => res.send(await postGrade(req.body)));

routes.put('/grades/:id', async (req, res) => res.send(await putGrade(req.body, req.params.id)));

routes.delete('/grades/:id', async (req, res) => res.send(await deleteGrade(req.params.id)));

routes.get('/grades/total/:student/:subject?', async (req, res) => res.send(await sumGrades(req.params.id)));

export default routes;