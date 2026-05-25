<template>
  <a-config-provider :theme="lightTheme">
    <div class="m-5">
      <a-button type="primary" @click="showModal"
        >Open Modal with async logic</a-button
      >
      <a-modal
        v-model:open="open"
        title="Title"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
      >
        <p>{{ modalText }}</p>
      </a-modal>
    </div>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { theme } from "ant-design-vue";
import { ref } from "vue";

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#3ecf8e",
    colorInfo: "#22d3ee",
    colorSuccess: "#4ade80",
    colorWarning: "#f97316",
    colorError: "#ef4444",
    colorBgBase: "#0d0f14",
    colorBgContainer: "#13161e",
    colorBgElevated: "#1a1e2a",
    colorTextBase: "#e8eaf0",
    colorTextSecondary: "#8a8fa8",
    colorBorder: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    fontFamily: "'DM Sans', sans-serif",
  },
};

const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#16a34a",
    colorInfo: "#0891b2",
    colorSuccess: "#16a34a",
    colorWarning: "#ea580c",
    colorError: "#ef4444",
    colorBgBase: "#f4f6fb",
    colorBgContainer: "#ffffff",
    colorBgElevated: "#eef1f8",
    colorTextBase: "#1a1d2e",
    colorTextSecondary: "#5a6075",
    colorBorder: "rgba(0,0,0,0.08)",
    borderRadius: 12,
    fontFamily: "'DM Sans', sans-serif",
  },
};

const modalText = ref<string>("Content of the modal");
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  modalText.value = "The modal will be closed after two seconds";
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};
</script>
