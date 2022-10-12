import FileList from './GameFileList.vue'

type Props = InstanceType<typeof FileList>['$props']

export default {
  title: 'FileList',
  component: FileList
}

const Template = (args: unknown) => ({
  components: { FileList },
  setup() {
    return { args }
  },
  template: '<FileList v-bind="args" />'
})

export const Primary: { args: Props } = Template.bind({})
Primary.args = {
  files: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      type: 'jar',
      md5: '3bccfb0579ab5d81289c459aa8c9a1b0',
      entryPoint: 'PPP.exe',
      createdAt: '2022-09-20T12:27:02.584Z'
    }
  ]
}
