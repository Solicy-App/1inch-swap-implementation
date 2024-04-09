import { IRepository } from "@/utils/types/repository.interface";
import { IService } from "@/utils/types/service.interface";
import { getRepository } from "@/utils/repositories";
import { RepositoryId } from "@/utils/constants";

class ChainService implements IService {
  constructor(
    private readonly api: IRepository = getRepository(RepositoryId.TOKEN)
  ) {}

  /**
   * @description Get all available chains for swap by chain id
   * @param params
   * @returns {array}
   */
  get = (params: any) => {
    return this.api.get(params);
  };
}

export default new ChainService();
