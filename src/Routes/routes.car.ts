import { Router } from 'express';
import CarsControllers from '../Controllers/CarsControllers';

const router: Router = Router();

router.post('/cars', (req, res, next) => new CarsControllers(req, res, next).createCars());
router.get('/cars', (req, res, next) => new CarsControllers(req, res, next).getAllCars());
router.get('/cars/:id', (req, res, next) => new CarsControllers(req, res, next).findCarById());
router.put('/cars/:id', (req, res, next) => new CarsControllers(req, res, next).updateCarId());

export default router;