export async function onRequest({ request }) {
  const key = "f44a7660881514c58ed987ca5ab934f0";
  // 排列五，确认探数接口彩种参数
  const url = `https://api.tanshuapi.com/api/lottery/v1?key=${key}&name=pl5`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ code: -1, msg: err.message }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
