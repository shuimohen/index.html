export async function onRequest({ request }) {
  const key = "f44a7660881514c58ed987ca5ab934f0";
  const caipiaoid = "17";
  let allList = [];

  // 串行分页，每次20条，间隔300ms，防止探数限流
  for (let offset = 0; offset < 100; offset += 20) {
    const url = `https://api2.tanshuapi.com/api/caipiao/v1/history?key=${key}&caipiaoid=${caipiaoid}&issueno=&start=${offset}&num=20`;
    const res = await fetch(url);
    const json = await res.json();
    
    if (json.data && Array.isArray(json.data)) {
      allList = allList.concat(json.data);
    }
    // 无更多数据直接跳出
    if (!json.data || json.data.length === 0) break;
    // 延时，避免高频请求被拦截
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  allList = allList.slice(0, 100);

  return new Response(JSON.stringify({
    code: 1,
    msg: "success",
    data: allList
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
