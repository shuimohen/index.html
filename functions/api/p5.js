export async function onRequest({ request }) {
  const key = "f44a7660881514c58ed987ca5ab934f0";
  const caipiaoid = "17"; //排列五
  // ✅ 重点：换成 v1/query 历史列表接口，不是 /winning
  const url = `https://api2.tanshuapi.com/api/caipiao/v1/query?key=${key}&caipiaoid=${caipiaoid}&refernumber=100`;

  const res = await fetch(url);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
