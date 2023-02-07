import { Model, Schema, models, model } from 'mongoose';

abstract class AbstractODM<T> {
  protected schema: Schema<T>;
  protected model: Model<T>;
  protected modelName: string;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  async create(obj: T): Promise<T> {
    const result = await this.model.create({ ...obj });
    return result;
  }

  async find(): Promise<T[]> {
    return this.model.find();
  }

  async findCarById(_id: string): Promise<T | null> {
    return this.model.findById({ _id });
  }
}

// https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid

export default AbstractODM;