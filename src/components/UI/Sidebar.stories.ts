import Sidebar from './Sidebar.vue'

type Props = InstanceType<typeof Sidebar>['$props']

export default {
  title: 'Sidebar',
  component: Sidebar
}

const Template = (args: unknown) => ({
  components: { Sidebar },
  setup() {
    return { args }
  },
  template: '<Sidebar v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {} as Props
