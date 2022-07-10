import Info from './Info.vue'

type Props = InstanceType<typeof Info>['$props']

export default {
  title: 'Info',
  component: Info
}

const Template = (args: unknown) => ({
  components: { Info },
  setup() {
    return { args }
  },
  template: '<Info v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {} as Props
