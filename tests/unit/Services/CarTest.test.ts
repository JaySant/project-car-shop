import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarsService from '../../../src/Services/CarsService';
import { carsArray } from '../../../__tests__/utils/CarsMock';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';

describe('', function () {
  it('Testa se cria um novo carro', async function () {
    const carInput: ICar = carsArray[0];
    const carOutput: Car = new Car(carsArray[0]);

    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarsService();
    const result = await service.createCar(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Testa se lista os carros', async function () {
    const carArray = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    sinon.stub(Model, 'find').resolves(carArray);

    const service = new CarsService();
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(carArray);
  });

  it('Testa se retorna null', async function () {
    sinon.stub(Model, 'create').resolves(null);

    const service = new CarsService();
    const result = await service.createCar(carsArray[0]);

    expect(result).to.be.equal(null);
  });

  it('Lista carro pelo id', async function () {
    const carArray = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: true,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    sinon.stub(Model, 'findById').resolves(carArray[0]);

    const service = new CarsService();
    const result = await service.findCarById(carArray[0].id);
    expect(result).to.be.deep.equal(carArray[0]);
  });

  it('Testa se altera o carro pelo', async function () {
    const carInput = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carOutput = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(carInput);
    const service = new CarsService();
    const result = await service.updateCarById('634852326b35b59438fbea2f', carOutput);
    expect(result).to.be.deep.equal(carOutput);
  });
  afterEach(function () { return sinon.restore(); });
});
