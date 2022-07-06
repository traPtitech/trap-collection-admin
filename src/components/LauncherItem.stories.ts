import { Meta, StoryFn } from '@storybook/vue3'

import LauncherItem from './LauncherItem.vue'

type Props = InstanceType<typeof LauncherItem>['$props']

export default {
  title: 'LauncherItem',
  component: LauncherItem
} as Meta<Props>

const Template: StoryFn<Props> = args => ({
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
}
