import { mount } from '@vue/test-utils'
import D2Icon from '@/components/d2-icon/index.vue'

describe('d2-icon', () => {
  // Exists and is a Vue component instance
  it('is a vue instance', () => {
    const wrapper = mount(D2Icon)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // Include specific class name
  it('contains specific classnames', () => {
    const wrapper = mount(D2Icon)

    expect(wrapper.is('.fa')).toBeTruthy()
    expect(wrapper.contains('.fa-font-awesome')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(D2Icon, {
      propsData: {
        name: 'font-awesome'
      }
    })

    expect(wrapper.props().name).toEqual('font-awesome')
  })
})
