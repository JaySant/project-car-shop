import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import { motorcyclesArray } from '../../../__tests__/utils/MotorcyclesMock';
import MotorsService from '../../../src/Services/MotorsService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe('Testa a service do motor', function () {
  it('Testa se cria um novo motocicleta', async function () {
    const motorInput: IMotorcycle = motorcyclesArray[0];
    const motorOutput: Motorcycle = new Motorcycle(motorcyclesArray[0]);

    sinon.stub(Model, 'create').resolves(motorOutput);

    const service = new MotorsService();
    const result = await service.createMotors(motorInput);

    expect(result).to.be.deep.equal(motorOutput);
  });

  it('Testa se retorna null', async function () {
    sinon.stub(Model, 'create').resolves(null);

    const service = new MotorsService();
    const result = await service.createMotors(motorcyclesArray[0]);

    expect(result).to.be.equal(null);
  });

  it('Lista todas as motos', async function () {
    const motorArray = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda CG Titan 150',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    sinon.stub(Model, 'find').resolves(motorArray);

    const service = new MotorsService();
    const result = await service.getAllMotors();

    expect(result).to.be.deep.equal(motorArray);
  });

  it('Lista carro pelo id', async function () {
    const motorArray = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda CG Titan 150',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    sinon.stub(Model, 'findById').resolves(motorArray[0]);

    const service = new MotorsService();
    const result = await service.findMotorById(motorArray[0].id);
    expect(result).to.be.deep.equal(motorArray[0]);
  });

  it('Testa se altera o moto pelo', async function () {
    const motorInput = {
      id: '634852326b35b59438fbea31',
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };

    const motorOutput = {
      id: '634852326b35b59438fbea31',
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorInput);
    const service = new MotorsService();
    const result = await service.updateMotorsId('634852326b35b59438fbea31', motorOutput);
    expect(result).to.be.deep.equal(motorOutput);
  });
  afterEach(function () { return sinon.restore(); });
});