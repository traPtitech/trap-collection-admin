import Header from './Header.vue'

type Props = InstanceType<typeof Header>['$props']

export default {
  title: 'Header',
  component: Header
}

const Template = (args: unknown) => ({
  components: { Header },
  setup() {
    return { args }
  },
  template: '<Header v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {} as Props
