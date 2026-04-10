// api/schedule.js
export default async function handler(req: Request, res: Response) {
  const apiKey = process.env.BOOSTAPP_API_KEY ?? "";
  const businessId = process.env.BOOSTAPP_BUSINESS_ID ?? "";

  try {
    const response = await fetch(
      `https://rest.lee.co.il/schedule/get-schedule?businessId=${businessId}`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKey ?? "",
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch schedule" },
      { status: 500 },
    );
  }
}
