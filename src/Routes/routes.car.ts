import { Router } from 'express';
import CarsControllers from '../Controllers/CarsControllers';

const router: Router = Router();

router.post('/cars', (req, res, next) => new CarsControllers(req, res, next).createCars());

export default router;