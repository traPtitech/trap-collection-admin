import PageHeader from './PageHeader.vue'

type Props = InstanceType<typeof PageHeader>['$props']

export default {
  title: 'PageHeader',
  component: PageHeader
}

const Template = (args: unknown) => ({
  components: { PageHeader },
  setup() {
    return { args }
  },
  template: '<PageHeader v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {} as Props
