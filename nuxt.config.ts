// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@ant-design-vue/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  antd: {
    extractStyle: true,
    components: [
      'Alert', 'Avatar', 'Badge', 'Button', 'Checkbox', 'ConfigProvider',
      'DatePicker', 'Descriptions', 'DescriptionsItem', 'Divider', 'Drawer',
      'Dropdown', 'Form', 'FormItem', 'Input', 'InputNumber', 'InputPassword',
      'InputSearch', 'Menu', 'MenuDivider', 'MenuItem', 'MenuItemGroup',
      'Popconfirm', 'Progress', 'RangePicker', 'Rate', 'Segmented', 'Select',
      'SelectOption', 'Skeleton', 'SkeletonAvatar', 'Space', 'SubMenu', 'Table',
      'TabPane', 'Tabs', 'Tag', 'Tooltip',
    ],
    icons: [
      'ArrowDownOutlined', 'ArrowRightOutlined', 'ArrowUpOutlined',
      'BarChartOutlined', 'BarsOutlined', 'CloudOutlined', 'DashboardOutlined',
      'DeleteOutlined', 'EditOutlined', 'ExportOutlined', 'EyeOutlined',
      'GoogleOutlined', 'HomeOutlined', 'IdcardOutlined', 'LeftOutlined',
      'LockOutlined', 'LogoutOutlined', 'MailOutlined', 'MenuOutlined',
      'PhoneOutlined', 'PlusOutlined', 'ReloadOutlined', 'SettingOutlined',
      'TeamOutlined', 'ToolOutlined', 'UserOutlined', 'WalletOutlined',
    ],
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    emailFrom: process.env.EMAIL_FROM,
  },
});
