/**
 * 获取 OG 信息
 */

const access_token =
  "EAACIjMruogEBO4iWJO2cSFzyzKTpnCLBhhU422tHeVYWy1iKHldLBvtwybHoeFLcfwrjLPBHNzVMMs6BKkbjmruwoRNnL9qpm7Hhl1OrmdsZCRlBiAvEmILqa3mp2nnPhtZAZAW95kdOhVzwpDphcDBtJwVgx5XQOYnNKaGJOlxMUchZC0crxaCTjGW3gIR8xth9bZBYPhb0DoQZDZD";
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
