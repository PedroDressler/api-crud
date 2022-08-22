import { Router } from "express";
import { getGrades, postGrades, putGrades } from "../controllers/apiController.js";

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Welcome to Grades API, go to the <a href="http://localhost:3000">grades section</a>.');
});

routes.get('/grades/:identifier?/:property?', async (req, res) => res.send(await getGrades(req.params.identifier, req.params.property)));

routes.post('/grades', async (req, res) => res.send(await postGrades(req.body)));

routes.put('/grades/:id', async (req, res) => res.send(await putGrades(req.body, req.params.id)));

export default routes;