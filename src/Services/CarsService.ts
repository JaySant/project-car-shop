import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarsService {
  private carDomain(car: ICar | null): Car | null {
    if (car) { return new Car(car); }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.carDomain(newCar);
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const cars = await carODM.find();
    return cars.map((car) => this.carDomain(car));
  }

  public async findCarById(_id: string) {
    const carODM = new CarODM();
    const carId = await carODM.findCarById(_id);
    return this.carDomain(carId);
  }

  public async updateCarById(_id: string, car: ICar) {
    const carODM = new CarODM();
    const update = await carODM.updateCar(_id, car);
    return this.carDomain(update);
  }
}