import Editor from './Editor.vue'

type Props = InstanceType<typeof Editor>['$props']

export default {
  title: 'Editor',
  component: Editor
}

const Template = (args: unknown) => ({
  components: { Editor },
  setup() {
    return { args }
  },
  template: '<Editor v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {} as Props
