import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorsService {
  private motorDomain(motor: IMotorcycle | null): Motorcycle | null {
    if (motor) { return new Motorcycle(motor); }
    return null;
  }

  public async createMotors(motor: IMotorcycle) {
    const motorcyclesODM = new MotorcycleODM();
    const newMotor = await motorcyclesODM.create(motor);
    return this.motorDomain(newMotor);
  }

  public async getAllMotors() {
    const motorcyclesODM = new MotorcycleODM();
    const motors = await motorcyclesODM.find();
    return motors.map((motor) => this.motorDomain(motor));
  }

  public async findMotorById(_id: string) {
    const motorcyclesODM = new MotorcycleODM();
    const motorId = await motorcyclesODM.findVehicleById(_id);
    return this.motorDomain(motorId);
  }

  public async updateMotorsId(_id: string, motor: IMotorcycle) {
    const motorcyclesODM = new MotorcycleODM();
    const update = await motorcyclesODM.updateVehicle(_id, motor);
    return this.motorDomain(update);
  }
}