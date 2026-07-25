import { addComponent, defineNuxtModule, resolveModule } from '@nuxt/kit'
import { dirname, resolve } from 'pathe'

export default defineNuxtModule({
  meta: {
    name: 'antd-components',
  },
  setup() {
    const antdModuleEntry = resolveModule('@ant-design-vue/nuxt', {
      paths: [import.meta.url],
    })
    const filePath = resolve(dirname(antdModuleEntry), './runtime/antd')

    const components = [
      'Alert', 'Avatar', 'Badge', 'Button', 'Checkbox', 'ConfigProvider',
      'DatePicker', 'Descriptions', 'DescriptionsItem', 'Divider', 'Drawer',
      'Dropdown', 'Form', 'FormItem', 'Input', 'InputNumber', 'InputPassword',
      'InputSearch', 'Menu', 'MenuDivider', 'MenuItem', 'MenuItemGroup',
      'Popconfirm', 'Progress', 'RangePicker', 'Rate', 'Segmented', 'Select',
      'SelectOption', 'Skeleton', 'SkeletonAvatar', 'Space', 'SubMenu', 'Table',
      'TabPane', 'Tabs', 'Tag', 'Tooltip',
    ]

    const icons = [
      'ArrowDownOutlined', 'ArrowRightOutlined', 'ArrowUpOutlined',
      'BarChartOutlined', 'BarsOutlined', 'CloudOutlined', 'DashboardOutlined',
      'DeleteOutlined', 'EditOutlined', 'ExportOutlined', 'EyeOutlined',
      'GoogleOutlined', 'HomeOutlined', 'IdcardOutlined', 'LeftOutlined',
      'LockOutlined', 'LogoutOutlined', 'MailOutlined', 'MenuOutlined',
      'PhoneOutlined', 'PlusOutlined', 'ReloadOutlined', 'SettingOutlined',
      'TeamOutlined', 'ToolOutlined', 'UserOutlined', 'WalletOutlined',
    ]

    for (const comp of components) {
      addComponent({
        name: 'A' + comp,
        export: comp,
        filePath,
        priority: 1,
      })
    }

    for (const icon of icons) {
      addComponent({
        name: icon,
        export: icon,
        filePath,
        priority: 1,
      })
    }
  },
})
