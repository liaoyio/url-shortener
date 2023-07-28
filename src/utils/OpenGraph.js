/**
 * 获取 OG 信息
 */

const access_token =
  "EAACIjMruogEBO4bcGBSG7ZATm1MKgQh1aOCA0pJZBPUAl9wZBZBTmztDRtdEdVLSxIEO4DFc63T3SrIFmivbAF7MMcKDjHarXdQae2YnQioR3FgLgUmxgTSy5eNunNGR2v0tXp6ZCyt2mVg3qZBqW5iUQSGyKLYza1qAXY2JgoWCt1jZByRCKhZB1Oa3";
const API = new URL("v17.0", "https://graph.facebook.com");
API.searchParams.set("access_token", access_token);

export default async (url) => {
  let obj = {
    debug: "all",
    format: "json",
    id: url,
    method: "post",
    pretty: 0,
    scrape: true,
    suppress_http_code: 1,
    transport: "cors",
  };
  let formData = new FormData();
  for (const key in obj) {
    formData.set(key, obj[key]);
  }
  const response = await fetch(API, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  return result;
};
