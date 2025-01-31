import { mount } from '@vue/test-utils'
import D2ContainerFull from '@/components/d2-container/components/d2-container-full.vue'

describe('d2-container-full', () => {
  // Exists and is a Vue component instance
  it('is a vue instance', () => {
    const wrapper = mount(D2ContainerFull)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // Include specific class name
  it('contains specific classnames', () => {
    const wrapper = mount(D2ContainerFull, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.d2-container-full')).toBeTruthy()
    expect(wrapper.contains('.d2-container-full__header')).toBeTruthy()
    expect(wrapper.contains('.d2-container-full__body')).toBeTruthy()
    expect(wrapper.contains('.d2-container-full__footer')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(D2ContainerFull, {
      propsData: {
        scrollDelay: 30
      }
    })

    expect(wrapper.props().scrollDelay).toEqual(30)
  })

  // Rendering slot
  it('has one or more slots', () => {
    const wrapper = mount(D2ContainerFull, {
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
