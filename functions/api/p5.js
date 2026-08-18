export async function onRequestGet({ request }) {
  const key = "f44a7660881514c58ed987ca5ab934f0";
  const caipiaoid = "17";
  const urlObj = new URL(request.url);
  const offset = urlObj.searchParams.get("offset") || 0;
  const targetUrl = `https://api2.tanshuapi.com/api/caipiao/v1/history?key=${key}&caipiaoid=${caipiaoid}&issueno=&start=${offset}&num=20`;
  
  const res = await fetch(targetUrl);
  const rawText = await res.text();
  let data;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    data = { error: "JSON解析失败", raw: rawText };
  }
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
