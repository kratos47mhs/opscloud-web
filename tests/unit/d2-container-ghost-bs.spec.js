import { mount } from '@vue/test-utils'
import D2ContainerGhostBs from '@/components/d2-container/components/d2-container-ghost-bs.vue'

describe('d2-container-ghost-bs', () => {
  // Exists and is a Vue component instance
  it('is a vue instance', () => {
    const wrapper = mount(D2ContainerGhostBs, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // Include specific class name
  it('contains specific classnames', () => {
    const wrapper = mount(D2ContainerGhostBs, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.d2-container-ghost-bs')).toBeTruthy()
    expect(wrapper.contains('.d2-container-ghost-bs__header')).toBeTruthy()
    expect(wrapper.contains('.d2-container-ghost-bs__body')).toBeTruthy()
    expect(wrapper.contains('.d2-container-ghost-bs__footer')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(D2ContainerGhostBs, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      },
      propsData: {
        betterScrollOptions: {}
      }
    })

    expect(wrapper.props().betterScrollOptions).toEqual({})
  })

  // Rendering slot
  it('has one or more slots', () => {
    const wrapper = mount(D2ContainerGhostBs, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.text()).toMatch('header')
    expect(wrapper.text()).toMatch('body')
    expect(wrapper.text()).toMatch('footer')
  })
})
