// api/p5.js 探数API正式版（已填入你的密钥，直接覆盖使用）
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const key = "f44a7660881514c58ed987ca5ab934f0";
  // caipiaoid=11 排列五，num=100 获取100条历史
  const apiUrl = `https://api2.tanshuapi.com/api/caipiao/v1/history?key=${key}&caipiaoid=17&num=100`;

  try {
    const raw = await fetch(apiUrl, { method: "GET" });
    const json = await raw.json();
    const list = [];

    // 适配接口返回结构，提取开奖号码opencode
    if (json?.data?.list && Array.isArray(json.data.list)) {
      for (const item of json.data.list) {
        const num = String(item.opencode || "").replace(/\D/g, "");
        if (/^\d{5}$/.test(num)) {
          list.push(num);
        }
      }
    }
    res.status(200).json({ ok: true, data: list });
  } catch (err) {
    console.error("探数API请求失败：", err);
    res.status(500).json({ ok: false, msg: "接口拉取失败，请检查密钥/权限/剩余次数" });
  }
}
