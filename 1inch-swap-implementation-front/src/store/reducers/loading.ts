export const GET_LOADING = "GET_LOADING";

interface Action {
  type: string;
  data?: boolean;
}
const reducer = (state: any = [], { type, data = false }: Action) => {
  switch (type) {
    case GET_LOADING:
      return data;
    default:
      return false;
  }
};
export default reducer;
