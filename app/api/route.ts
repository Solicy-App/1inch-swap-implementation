import axios1Inch from "@/utils/1inch/axiosInstance";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest
) {
    const api_path = req.nextUrl.search.replace('?api_path=', '');
    // console.log(decodeURIComponent(api_path));
    // Replace with the actual URL of your external API
    const externalApiUrl = `https://api.1inch.dev/${decodeURIComponent(api_path)}`;

    try {
        const response = await axios1Inch.get(externalApiUrl);

        // Optionally process the data on the server-side before sending
        // (e.g., security checks, transformations)

        return Response.json(response.data);
    }
    catch (error: any) {
        console.error(error);
        return Response.json({ error: "Failed to fetch data" }, {status: 500})
    }
}
