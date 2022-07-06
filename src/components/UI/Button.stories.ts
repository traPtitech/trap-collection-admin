import Button from './Button.vue'

type Props = InstanceType<typeof Button>['$props']

export default {
  title: 'Button',
  component: Button
}

const Template = (args: unknown) => ({
  components: { Button },
  setup() {
    return { args }
  },
  template: '<Button v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Primary'
} as Props
