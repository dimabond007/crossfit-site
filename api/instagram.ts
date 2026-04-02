const FIELDS =
  "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";

export default async function handler(req: Request): Promise<Response> {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
      return Response.json(
        { error: "Missing INSTAGRAM_ACCESS_TOKEN" },
        { status: 500 },
      );
    }

    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set("fields", FIELDS);
    url.searchParams.set("limit", "10");
    url.searchParams.set("access_token", token);

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return Response.json(
        { error: "Instagram API error", details: errorText },
        { status: res.status },
      );
    }

    const data = await res.json();

    const posts = (data.data ?? []).map((item: any) => ({
      id: item.id,
      caption: item.caption ?? "",
      mediaType: item.media_type,
      image:
        item.media_type === "VIDEO"
          ? item.thumbnail_url || item.media_url
          : item.media_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));

    return Response.json(
      { posts },
      {
        headers: {
          "Cache-Control": "s-maxage=900, stale-while-revalidate=3600",
        },
      },
    );
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
