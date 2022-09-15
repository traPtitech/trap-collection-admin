import Layout from './Layout.vue'

type Props = InstanceType<typeof Layout>['$props']

export default {
  title: 'Layout',
  component: Layout
}

const Template = (args: unknown) => ({
  components: { Layout },
  setup() {
    return { args }
  },
  template: '<Layout v-bind="args" />'
})

export const Primary: { args: Props } = Template.bind({})
Primary.args = {}
