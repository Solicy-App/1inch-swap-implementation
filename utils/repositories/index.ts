import { RepositoryId } from "../constants";
import { ChainRepository } from "./chain.repository";
import { QuoteRepository } from "./quote.repository";

const repositories = {
  tokens: ChainRepository,
  quote: QuoteRepository,
};

export const getRepository = (name: RepositoryId) => new repositories[name]();
