// import axios from "axios";

// export async function GET() {
//   const url = "https://api.1inch.dev/swap/v6.0/1/tokens";

//   const config = {
//     headers: {
//       Authorization: "Bearer xa6p4HOiqgDvGmU7WG50Xmnv6svtyNnH",
//     },
//     params: {},
//   };

//   try {
//     const response = await axios.get(url, config);
//     // console.log(response.data);

//     let res = JSON.stringify(response.data.tokens)

//     return new Response(res);
//   } catch (error) {
//     // console.error(error);
//     return new Response("Internal server error", { status: 500 });
//   }
// }




import axios from "axios";

export async function GET() {
let cryptoNum = 42161 

  const url = `https://api.1inch.dev/swap/v6.0/${cryptoNum}/approve/spender`;

  const config = {
    headers: {
      Authorization: "Bearer xa6p4HOiqgDvGmU7WG50Xmnv6svtyNnH",
    },
    params: {},
  };

  try {
    const response = await axios.get(url, config);
    console.log(response.data);
    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
