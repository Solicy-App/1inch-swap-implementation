import { getTokens } from "@/src/api/getTokens/getTokens";
import { GET_TOKENS } from "../reducers/tokens";
import { Token } from "@/src/utils/types/types";

interface GetTokensAction {
  type: typeof GET_TOKENS;
  data: Token[] | [];
}

export const getTokensAction =
  () => async (dispatch: (action: GetTokensAction) => void) => {
    try {
      const { data } = await getTokens();

      if (data.length > 0) {
        dispatch({ type: GET_TOKENS, data });
      }
    } catch (error) {
      console.log(error);
    }
  };
