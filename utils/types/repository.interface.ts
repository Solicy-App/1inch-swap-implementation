export interface IRepository {
  get: (params: any) => void;
  post: (params: any) => void;
  delete: (id: number | string) => void;
  update: (id: number | string, params: any) => void;
}
