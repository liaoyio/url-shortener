<script setup>
import { onMounted, ref } from "vue";
import {
  LinkIcon,
  XMarkIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/vue/24/outline";

import { ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid } from "@heroicons/vue/24/solid";
import shorten from "../utils/shorten";
import OpenGraph from "../utils/OpenGraph";

const url = ref("");
const shortenedLink = ref("");
const loading = ref(false);
const selected = ref(false);
const OG = ref({});
const shortenedLinkRef = ref();

// 提交
const submit = async (url) => {
  loading.value = true;
  const { link } = await shorten(url);
  shortenedLink.value = link;
  const result = await OpenGraph(url);
  OG.value = result;
  loading.value = false;
};

// 选中 & 复制
const select = () => {
  // 定义选中范围
  const range = new Range();
  range.selectNode(shortenedLinkRef.value);
  // 展示选中状态
  document.getSelection().removeAllRanges();
  document.getSelection().addRange(range);
  // 将文本复制进剪贴板
  document.execCommand("copy");
  selected.value = true;
  setTimeout(() => {
    selected.value = false;
  }, 2000);
};
</script>

<template>
  <div class="shortener">
    <header class="header">
      <h1 class="header__title">Easily shortened URLs!</h1>
    </header>
    <main class="main">
      <form class="main__form" @submit.prevent="submit(url)">
        <div class="input-box">
          <LinkIcon class="icon link-icon"></LinkIcon>
          <input
            class="input"
            type="url"
            placeholder="Your Long URL"
            v-model="url" />
          <XMarkIcon
            :style="{ opacity: url ? '1' : '0' }"
            class="icon x-mark-icon"
            @click="url = ''"></XMarkIcon>
        </div>
        <input class="submit" type="submit" value="Short" />
      </form>
      <div class="main-loading" v-if="loading">
        <ArrowPathIcon class="icon icon arrow-path-icon" />
      </div>
      <div class="main-result" v-if="!loading && shortenedLink">
        <div class="result__url">
          <ShieldCheckIcon class="icon shield-check-icon" />
          <p class="shortenedLink" ref="shortenedLinkRef">
            {{ shortenedLink }}
          </p>
          <ClipboardDocumentCheckIcon
            v-if="!selected"
            class="icon clipboard-document-check-icon"
            @click="select" />
          <ClipboardDocumentCheckIconSolid
            v-else
            class="icon clipboard-document-check-icon"></ClipboardDocumentCheckIconSolid>
        </div>
        <a :href="url" target="_blank" class="result__link-preview">
          <div class="result__link-preview__text">
            <h2 class="title">{{ OG.title }}</h2>
            <p class="des">{{ OG.description }}</p>
            <p class="url">{{ OG.url }}</p>
          </div>
          <div class="result__link-preview__picture">
            <img class="img" :src="OG.image[0].url" alt="" />
          </div>
        </a>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.shortener {
  max-width: 700px;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 40px;
  .header {
    font-family: "Courgette", cursive;
  }
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .main__form {
      display: flex;
      align-items: center;
      gap: 15px;

      .input-box {
        flex: 1;
        display: flex;
        align-items: center;
        border: 2px solid #10a1bd;
        border-radius: 10px;
        padding: 10px;
        gap: 10px;
        .input {
          font-family: "Roboto Mono";
          border: none;
          outline: none;
          font-size: 20px;
          flex: 1;
          caret-color: #10a1bd;
        }
        .icon {
          color: #656b70;
          width: 24px;
          height: 24px;
        }
        .x-mark-icon:hover {
          cursor: pointer;
          color: #10a1bd;
        }
      }
      .submit {
        cursor: pointer;
        font-size: 20px;
        color: #fff;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
        outline: none;
        background-color: #10a1bd;
        &:hover {
          background-color: #0891ab;
        }
      }
    }
    .main-loading {
      display: flex;
      justify-content: center;
      .arrow-path-icon {
        width: 24px;
        height: 24px;
        animation: 3s linear infinite loading;
      }
    }
    .main-result {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .result__url {
        display: flex;
        align-items: center;
        border: 2px solid #10a1bd;
        border-radius: 10px;
        padding: 10px;
        gap: 10px;
        .shortenedLink {
          flex: 1;
          font-size: 20px;
          font-family: "Roboto Mono";
        }
        .icon {
          color: #656b70;
          width: 24px;
          height: 24px;
        }
        .clipboard-document-check-icon:hover {
          cursor: pointer;
        }
      }
      .result__link-preview {
        cursor: pointer;
        display: flex;
        border: 1px solid #ced5db;
        border-radius: 15px;
        overflow: hidden;
        .result__link-preview__text {
          padding: 15px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
          .title {
            color: #0e1119;
          }
          .des {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #68707b;
          }
          .url {
            color: #68707b;
          }
        }
        .result__link-preview__picture {
          flex-basis: 300px;
          .img {
            width: 100%;
            vertical-align: middle;
          }
        }
        &:hover {
          box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.08),
            0 9px 28px 0px rgba(0, 0, 0, 0.05),
            0 12px 48px 16px rgba(0, 0, 0, 0.03);
        }
      }
    }
  }
}
</style>
