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

  public async getAllCars() {
    const carsAll = await this.carService.getAllCars();
    return this.res.status(200).json(carsAll);
  }

  public async findCarById() {
    try {
      const { id } = this.req.params;
      const car = await this.carService.findCarById(id);
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }

  public async updateCarId() {
    try {
      const { id } = this.req.params;
      const carBody: ICar = { ...this.req.body };
      const car = await this.carService.updateCarById(id, carBody);
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}