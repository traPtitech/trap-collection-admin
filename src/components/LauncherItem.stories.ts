import LauncherItem from './LauncherItem.vue'

type Props = InstanceType<typeof LauncherItem>['$props']

export default {
  title: 'LauncherItem',
  component: LauncherItem
}

const Template = (args: unknown) => ({
  components: { LauncherItem },
  setup() {
    return { args }
  },
  template: '<LauncherItem v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  version: {
    name: 'v1.0.0',
    id: '12345',
    createdAt: '2020-01-01'
  }
} as Props
