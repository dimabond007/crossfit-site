// export default async function handler(): Promise<Response> {
//   try {
//     const API_KEY = process.env.BOOSTAPP_API_KEY;

//     const res = await fetch("https://api.boostapp.co.il/v1/schedule", {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//       },
//     });

//     const data = await res.json();

//     return Response.json({ data });
//   } catch (e) {
//     return Response.json({ error: "error" }, { status: 500 });
//   }
// }

export default async function handler() {
  return Response.json({
    data: [
      {
        id: "1",
        name: "Crossfit",
        coach: "John",
        start: new Date().toISOString(),
      },
    ],
  });
}
