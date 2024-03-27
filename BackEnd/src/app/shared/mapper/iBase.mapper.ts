export interface IBaseMapper<TModel> {
  create(tableName: string, model:TModel): Promise<TModel>;
  retrieve(criteria:any): Promise<TModel[]>;
  retrieveAll(tableName: string): Promise<TModel[]>;
  retrieveOne(filter:any): Promise<TModel>;
  update(model:TModel): Promise<TModel>;
  delete(id:string): Promise<boolean>;
}