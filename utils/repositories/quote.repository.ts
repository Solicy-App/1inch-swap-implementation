import axios1Inch from "@/utils/1inch/axiosInstance";
import { IRepository } from "@/utils/types/repository.interface";
import { RepositoryId } from "@/utils/constants";

export class QuoteRepository implements IRepository {
  get = (params: any) => {
    const { chain, ...props } = params;
    return axios1Inch.get(`${chain}/${RepositoryId.QUOTE}`, {
      params: { ...props },
    });
  };
  post = (params: any) => {};
  delete = (id: string | number) => {};
  update = (id: string | number, params: any) => {};
}
