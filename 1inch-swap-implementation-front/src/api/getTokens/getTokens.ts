import axios from "axios";

export const getTokens = async () => {
  try {
    const data: any = await axios.get("http://localhost:3001/tokens/getTokens");
    return data;
  } catch (error) {
    console.log(error);
  }
};
