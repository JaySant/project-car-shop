import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarsService from '../Services/CarsService';

export default class CarsControllers {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private carService: CarsService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.carService = new CarsService();
  }

  public async createCars() {
    const car: ICar = { ...this.req.body };

    try {
      const newCar = await this.carService.createCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }
}
