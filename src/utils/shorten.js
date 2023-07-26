const API = "https://api-ssl.bitly.com/v4/shorten";
const TOKEN = "2eb19ec870d76d56559ee96fd5621a58571bbdff";

export default async function shorten(longUrl) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      long_url: longUrl,
    }),
  });
  const result = await response.json();
  return result;
}
