import { IBaseMapper } from '../mapper/iBase.mapper';

export class BaseService<TModel> {
  protected mapper: IBaseMapper<any>;

  constructor(baseMapper: IBaseMapper<any>){
    this.mapper = baseMapper;
  }

  async create(tableName, userModel): Promise<TModel> {
    // Example usage of baseMapper method
    return await this.mapper.create(tableName, userModel);
  }
}