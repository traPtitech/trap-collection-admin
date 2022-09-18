import GameTimeline from './GameTimeline.vue'

type Props = InstanceType<typeof GameTimeline>['$props']

export default {
  title: 'GameTimeline',
  component: GameTimeline
}

const Template = (args: unknown) => ({
  components: { GameTimeline },
  setup() {
    return { args }
  },
  template: '<GameTimeline v-bind="args" />'
})

export const Primary: { args: Props } = Template.bind({})
Primary.args = {
  versions: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'v1.0.2',
      description: '- 新機能3の追加\n- 新機能4の追加\n',
      url: 'string',
      files: {
        win32: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        darwin: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        jar: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      },
      imageID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      videoID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      createdAt: '2022-09-17T23:54:48.260Z'
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa5',
      name: 'v1.0.0',
      description: '- 新機能1の追加\n- 新機能2の追加\n',
      url: 'string',
      files: {
        win32: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        darwin: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        jar: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      },
      imageID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      videoID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      createdAt: '2022-09-17T23:54:48.260Z'
    }
  ]
}
