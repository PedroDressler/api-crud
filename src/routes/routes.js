import { Router } from "express";
import { getGrades, postGrades } from "../controllers/apiController.js";

const routes = Router()

routes.get('/', (req, res) => {
  res.send('OK');
});

routes.get('/grades/:identifier?/:property?', async (req, res) => res.send(await getGrades(req.params.identifier, req.params.property)))

routes.post('/grades', async (req, res) => res.send(await postGrades(req.body)))

export default routes;