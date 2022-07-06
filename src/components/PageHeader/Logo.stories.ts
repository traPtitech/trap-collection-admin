import Logo from './Logo.vue'

type Props = InstanceType<typeof Logo>['$props']

export default {
  title: 'Logo',
  component: Logo
}

const Template = (args: unknown) => ({
  components: { Logo },
  setup() {
    return { args }
  },
  template: '<Logo v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {} as Props
