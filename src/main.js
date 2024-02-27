import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { inject } from "@vercel/analytics";

createApp(App).mount("#app");
// 添加 Vercel 分析服务
inject();
console.log(import.meta.env.MODE);
console.log(import.meta.env.VITE_X_RAPIDAPI_KEY);
