import New from './New.vue'

type Props = InstanceType<typeof New>['$props']

export default {
  title: 'New',
  component: New
}

const Template = (args: unknown) => ({
  components: { New },
  setup() {
    return { args }
  },
  template: '<New v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {} as Props
