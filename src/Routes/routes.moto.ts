import { Router } from 'express';
import MotorsControllers from '../Controllers/MotorsControllers';

const routes: Router = Router();

routes.post('/motorcycles', (req, res, next) => 
  new MotorsControllers(req, res, next).createMotors());
routes.get('/motorcycles', (req, res, next) => 
  new MotorsControllers(req, res, next).getAllMotors());
routes.get('/motorcycles/:id', (req, res, next) => 
  new MotorsControllers(req, res, next).findMotorsById());
routes.put('/motorcycles/:id', (req, res, next) => 
  new MotorsControllers(req, res, next).updateMotorsId());

export default routes;