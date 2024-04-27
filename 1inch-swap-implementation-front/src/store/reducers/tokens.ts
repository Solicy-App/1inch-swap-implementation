import { Token } from "@/src/utils/types/types";

export const GET_TOKENS = "GET_TOKENS";

interface Action {
  type: string;
  data?: Token[] | [];
}
const reducer = (state: Token[] = [], { type, data = [] }: Action) => {
  switch (type) {
    case GET_TOKENS:
      return data;
    default:
      return state;
  }
};
export default reducer;
