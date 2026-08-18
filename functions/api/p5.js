export async function onRequest({ request }) {
  const key = "f44a7660881514c58ed987ca5ab934f0";
  const caipiaoid = "17"; //排列五
  // ✅ 恢复官方原生路由，不要/list
  const url = `https://api2.tanshuapi.com/api/caipiao/v1/winning?key=${key}&caipiaoid=${caipiaoid}&refernumber=100`;

  const res = await fetch(url);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
