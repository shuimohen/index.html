export async function onRequest({ request }) {
  const key = "f44a7660881514c58ed987ca5ab934f0";
  const caipiaoid = "17";
  // ✅ 改用 v1/history 接口，取100期
  const url = `https://api2.tanshuapi.com/api/caipiao/v1/history?key=${key}&caipiaoid=${caipiaoid}&issueno=&start=0&num=100`;

  const res = await fetch(url);
  const rawText = await res.text();
  let data;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    data = { raw: rawText, error: "JSON解析失败" };
  }
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
