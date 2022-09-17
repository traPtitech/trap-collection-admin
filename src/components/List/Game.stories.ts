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
Primary.args = {
  games: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'PrestoRay',
      description:
        '光を操作して進む、3Dのレースゲームです。\n光は超高速ですが、その分制御するのが非常に難しくなっています。\nコースを3周する時間を競うタイムアタックモードには、オンラインランキングを搭載。\n',
      createdAt: '2022-09-16T07:36:04.649Z'
    },
    {
      id: '3fa85f64-5717-4562-b3fc-123412341234',
      name: 'PrestoRay',
      description:
        '光を操作して進む、3Dのレースゲームです。\n光は超高速ですが、その分制御するのが非常に難しくなっています。\nコースを3周する時間を競うタイムアタックモードには、オンラインランキングを搭載。\n',
      createdAt: '2022-09-16T07:36:04.649Z'
    }
  ]
} as Props
