export async function onRequest({ request }) {
  const apiKey = "f44a7660881514c58ed987ca5ab934f0";
  const lotteryId = 17; // 排列五
  const limit = 100; // 近100期

  const url = `https://api.tanshuapi.com/api/lottery/v1/list?key=${apiKey}&lotteryid=${lotteryId}&limit=${limit}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });
  const data = await res.json();

  // 跨域处理，允许前端页面访问
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
    }
  });
}
