import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorsService from '../Services/MotorsService';

export default class MotorsControllers {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private motorService: MotorsService;
  
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.motorService = new MotorsService();
  }
  
  public async createMotors() {
    const car: IMotorcycle = { ...this.req.body };
  
    try {
      const newMotor = await this.motorService.createMotors(car);
      return this.res.status(201).json(newMotor);
    } catch (error) {
      this.next(error);
    }
  }
  
  public async getAllMotors() {
    const motorsAll = await this.motorService.getAllMotors();
    return this.res.status(200).json(motorsAll);
  }
  
  public async findMotorsById() {
    try {
      const { id } = this.req.params;
      const motorcycles = await this.motorService.findMotorById(id);
      if (!motorcycles) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
  
  public async updateMotorsId() {
    try {
      const { id } = this.req.params;
      const motorBody: IMotorcycle = { ...this.req.body };
      const motorcycles = await this.motorService.updateMotorsId(id, motorBody);
      if (!motorcycles) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}