export default async function handler(): Promise<Response> {
  try {
    const apiKey = process.env.BOOSTAPP_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing BOOSTAPP_API_KEY" },
        { status: 500 },
      );
    }

    const today = new Date().toISOString().split("T")[0];

    const url = new URL("https://api.boostapp.co.il/v1/classes");
    url.searchParams.set("date", today);
    url.searchParams.set("limit", "100");

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();

    if (!res.ok) {
      return Response.json(
        { error: "Boostapp request failed", details: text },
        { status: res.status },
      );
    }

    const raw = text ? JSON.parse(text) : [];

    const data = Array.isArray(raw)
      ? raw.map((item: any) => ({
          id: String(item.id),
          name: item.name ?? "Workout",
          coach: item.trainer_name ?? "",
          start: item.start_time,
          end: item.end_time,
        }))
      : [];

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
