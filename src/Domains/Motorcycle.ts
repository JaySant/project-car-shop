import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motors: IMotorcycle) {
    super(motors);
    this.category = motors.category;
    this.engineCapacity = motors.engineCapacity;
  }
}
