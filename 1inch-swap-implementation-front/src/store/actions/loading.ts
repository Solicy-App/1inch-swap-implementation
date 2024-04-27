import { GET_LOADING } from "../reducers/loading";

export const getLoadingAction =
  (loading: boolean) =>
  async (dispatch: (arg0: { type: string; data: boolean }) => void) => {
    try {
      dispatch({ type: GET_LOADING, data: loading });
    } catch (error) {
      console.log(error);
    }
  };
