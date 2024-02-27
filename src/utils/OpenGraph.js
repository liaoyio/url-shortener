/**
 * 获取 OG 信息
 */

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "link-preview4.p.rapidapi.com",
  },
};

export default async (url) => {
  let fullURL = new URL("https://link-preview4.p.rapidapi.com/");
  fullURL.searchParams.append("url", encodeURI(url));
  fullURL.searchParams.append("oembed", "false");
  try {
    const response = await fetch(fullURL.href, options);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error(error);
  }
};
