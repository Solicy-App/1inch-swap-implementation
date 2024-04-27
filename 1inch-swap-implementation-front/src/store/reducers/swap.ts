export const GET_SWAP = "GET_SWAP";

interface Action {
  type: string;
  data?: any;
}
const reducer = (state: any = [], { type, data = 0 }: Action) => {
  switch (type) {
    case GET_SWAP:
      return data;
    default:
      return state;
  }
};
export default reducer;
