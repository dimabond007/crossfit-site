import type { VercelRequest, VercelResponse } from "@vercel/node";
import { BoostappClass, ScheduleResponse } from "../src/types/types.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const today = new Date();
    const defaultStart = today.toISOString().slice(0, 10);

    const plus14 = new Date(today);
    plus14.setDate(today.getDate() + 14);
    const defaultEnd = plus14.toISOString().slice(0, 10);

    const { start_date, end_date } = req.query;

    const response = await fetch(
      "https://app.boostapp.co.il/controllerAction/OrderClasses.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Origin: "https://1pa.co",
          Referer: "https://1pa.co/",
          "User-Agent": "Mozilla/5.0",
        },
        body: JSON.stringify({
          getUrl: "5fd5f512f415d",
          action: "getClassesData",
          start_date: start_date || defaultStart,
          end_date: end_date || defaultEnd,
          sessionRequire: false,
        }),
      },
    );
    const text = await response.text();

    try {
      const raw = JSON.parse(text);

      const classes: BoostappClass[] = (raw?.data?.classes || []).map(
        (item: any) => ({
          id: String(item.id),
          title: item.className,
          coach: item.guideName,
          date: item.startDate,
          timeStart: item.startTime,
          timeEnd: item.endTime,
          price: Number(item.purchaseAmount),
          registered: Number(item.clientRegister),
          capacity: Number(item.maxClient),
          full: Boolean(item.isClassFull),
          closed: Boolean(item.registration_closed),
          area: item.section?.Title || null,
          color: item.color || item.class_color || null,
        }),
      );

      return res.status(200).json({
        success: true,
        earliestClassDate: raw?.data?.earliestClassDate,
        enableDays: raw?.data?.enableDays,
        classes,
      });
    } catch (e) {
      console.error("NOT JSON RESPONSE:", text);
      return res.status(500).json({
        success: false,
        error: "Boostapp returned HTML instead of JSON",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
