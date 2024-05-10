export interface IBaseMapper<TModel> {
  create(tableName: string, model: TModel): Promise<TModel>;
  retrieve(tableName: string, field: string, value: string | number): Promise<TModel[]>;
  retrieveAll(tableName: string): Promise<TModel[]>;
  retrieveOne(tableName: string, field: string, value: string | number): Promise<TModel>;
  update(tableName: string, model: any, field: string, value: string | number): Promise<TModel>;
  delete(tableName: string, field: string, value: string | number): Promise<boolean>;
}
