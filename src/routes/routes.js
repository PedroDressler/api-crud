import { application, Router } from "express";
import { getGrades, postGrade, putGrade, deleteGrade, sumGrades, modoGrades, ThreeBests } from "../controllers/apiController.js";

const routes = Router();

routes.get('/', (req, res) => res.send('Welcome to Grades API, go to the <a href="http://localhost:3000/grades">grades section</a>.'));

routes.get('/grades/:identifier?/:property?', async (req, res) => res.send(await getGrades(req.params.identifier, req.params.property))); // Retornar os dados ou retornar dados de um id

routes.post('/grades', async (req, res) => res.send(await postGrade(req.body)));

routes.put('/grades/:id', async (req, res) => res.send(await putGrade(req.body, req.params.id)));

routes.delete('/grades/:id', async (req, res) => res.send(await deleteGrade(req.params.id)));

routes.get('/total/:id/:subject?', async (req, res) => res.send(await sumGrades(req.params.id, req.params.subject)));

routes.get('/media/:id/:subject?', async (req, res) => res.send(await modoGrades(req.params.id, req.params.subject)));

routes.get('/bests/:subject', async (req, res) => res.send(await ThreeBests(req.params.subject)));

export default routes;
