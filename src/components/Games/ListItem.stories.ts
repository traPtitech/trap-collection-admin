import ListItem from './ListItem.vue'

type Props = InstanceType<typeof ListItem>['$props']

export default {
  title: 'ListItem',
  component: ListItem
}

const Template = (args: unknown) => ({
  components: { ListItem },
  setup() {
    return { args }
  },
  template: '<ListItem v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {} as Props
