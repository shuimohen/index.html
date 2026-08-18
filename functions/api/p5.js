export async function onRequest({ request }) {
  const key = "f44a7660881514c58ed987ca5ab934f0";
  const caipiaoid = "17";
  let allList = [];
  // 每次20条，循环5次凑100期
  for (let offset = 0; offset < 100; offset += 20) {
    const url = `https://api2.tanshuapi.com/api/caipiao/v1/history?key=${key}&caipiaoid=${caipiaoid}&issueno=&start=${offset}&num=20`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.data && Array.isArray(json.data)) {
      allList = allList.concat(json.data);
    }
    // 没有更多数据提前终止
    if (!json.data || json.data.length === 0) break;
  }
  // 最多保留100条
  allList = allList.slice(0, 100);
  return new Response(JSON.stringify({
    code:1,
    msg:"success",
    data: allList
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
