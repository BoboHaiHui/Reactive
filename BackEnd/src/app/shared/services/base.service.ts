import { IBaseMapper } from '../mapper/base.mapper.interface';

export class BaseService<TModel> {
  protected mapper: IBaseMapper<any>;

  constructor(baseMapper: IBaseMapper<any>){
    this.mapper = baseMapper;
  }

  async create(tableName:string, model:TModel): Promise<TModel> {
    return await this.mapper.create(tableName, model);
  }

  async retrieveAll(tableName: string): Promise<TModel[]>{
    return await this.mapper.retrieveAll(tableName);
  }

  async retrieveOne(tableName:string, field: string, value: string|number): Promise<TModel>{
    return await this.mapper.retrieveOne(tableName, field, value);
  }

  async retrieve(tableName:string, field: string, value: string|number): Promise<TModel[]>{
    return await this.mapper.retrieve(tableName, field, value);
  }

  async update(tableName: string, model: TModel, field: string, value: string|number): Promise<TModel> {
    return await this.mapper.update(tableName, model, field, value);
  }
}