import axios1Inch from "@/utils/1inch/axiosInstance";
import { IRepository } from "@/utils/types/repository.interface";
import { RepositoryId } from "@/utils/constants";

export class ChainRepository implements IRepository {
  get = (params: any) => {
    return axios1Inch.get(`${params?.chain}/${RepositoryId.TOKEN}`);
  };
  post = (params: any) => {};
  delete = (id: string | number) => {};
  update = (id: string | number, params: any) => {};
}
