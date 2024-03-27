import { IBaseMapper } from '../mapper/iBase.mapper';

export class BaseService<TModel> {
  protected mapper: IBaseMapper<any>;

  constructor(baseMapper: IBaseMapper<any>){
    this.mapper = baseMapper;
  }

  async create(tableName, model): Promise<TModel> {
    return await this.mapper.create(tableName, model);
  }

  async retrieveAll(tableName): Promise<TModel[]>{
    return await this.mapper.retrieveAll(tableName);
  }
}