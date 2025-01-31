import { mount } from '@vue/test-utils'
import D2ContainerCard from '@/components/d2-container/components/d2-container-card.vue'

describe('d2-container-card', () => {
  // Exists and is a Vue component instance
  it('is a vue instance', () => {
    const wrapper = mount(D2ContainerCard)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // Include specific class name
  it('contains specific classnames', () => {
    const wrapper = mount(D2ContainerCard, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.d2-container-card')).toBeTruthy()
    expect(wrapper.contains('.d2-container-card__header')).toBeTruthy()
    expect(wrapper.contains('.d2-container-card__body')).toBeTruthy()
    expect(wrapper.contains('.d2-container-card__body-card')).toBeTruthy()
    expect(wrapper.contains('.d2-container-card__footer')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(D2ContainerCard, {
      propsData: {
        scrollDelay: 30
      }
    })

    expect(wrapper.props().scrollDelay).toEqual(30)
  })

  // Rendering slot
  it('has one or more slots', () => {
    const wrapper = mount(D2ContainerCard, {
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
