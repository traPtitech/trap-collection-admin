import GamePageHeader from './GamePageHeader.vue'

type Props = InstanceType<typeof GamePageHeader>['$props']

export default {
  title: 'GamePageHeader',
  component: GamePageHeader
}

const Template = (args: unknown) => ({
  components: { GamePageHeader },
  setup() {
    return { args }
  },
  template: '<GamePageHeader v-bind="args" />'
})

export const Primary: { args: Props } = Template.bind({})
Primary.args = {
  game: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'PrestoRay',
    description:
      '光を操作して進む、3Dのレースゲームです。\n光は超高速ですが、その分制御するのが非常に難しくなっています。\nコースを3周する時間を競うタイムアタックモードには、オンラインランキングを搭載。\n',
    createdAt: '2022-09-16T07:36:04.649Z',
    owners: ['mazrean'],
    maintainers: ['yukikurage', 'BOT_kinano']
  }
}
