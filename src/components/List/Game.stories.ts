import Game from './Game.vue'

type Props = InstanceType<typeof Game>['$props']

export default {
  title: 'Game',
  component: Game
}

const Template = (args: unknown) => ({
  components: { Game },
  setup() {
    return { args }
  },
  template: '<Game v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {} as Props
