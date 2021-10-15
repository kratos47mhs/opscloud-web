import { mount } from '@vue/test-utils'
import D2ContainerFrame from '@/components/d2-container-frame/index.bak.vue'

describe('d2-container-frame', () => {
  // Exists and is a Vue component instance
  it('is a vue instance', () => {
    const wrapper = mount(D2ContainerFrame, {
      stubs: ['d2-container']
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // Include specific class name
  it('contains specific classnames', () => {
    const wrapper = mount(D2ContainerFrame, {
      stubs: ['d2-container']
    })

    expect(wrapper.contains('.d2-container-frame')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(D2ContainerFrame, {
      stubs: ['d2-container'],
      propsData: {
        src: 'https://fairyever.com/d2-admin/doc/zh/'
      }
    })

    expect(wrapper.props().src).toEqual('https://fairyever.com/d2-admin/doc/zh/')
  })
})
