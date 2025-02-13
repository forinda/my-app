import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HmpBanner from './HmpTeamMember.vue'
describe('HmpTeamMember Component', () => {
  describe('HmpTeamMember Component', () => {
    it('should render the component', () => {
      const wrapper = mount(HmpBanner, {
        props: {
          image: 'https://via.placeholder.com/150',
          role: 'Developer',
          name: 'John Doe',
        },
      })
      expect(wrapper.text()).toContain('John Doe')
    })

    it('should render the correct role', () => {
      const wrapper = mount(HmpBanner, {
        props: {
          image: 'https://via.placeholder.com/150',
          role: 'Developer',
          name: 'John Doe',
        },
      })
      expect(wrapper.text()).toContain('Developer')
    })

    it('should render the correct image', () => {
      const wrapper = mount(HmpBanner, {
        props: {
          image: 'https://via.placeholder.com/150',
          role: 'Developer',
          name: 'John Doe',
        },
      })
      const img = wrapper.find('img')
      expect(img.attributes('src')).toBe('https://via.placeholder.com/150')
    })

    it('should render default slot content', () => {
      const wrapper = mount(HmpBanner, {
        props: {
          image: 'https://via.placeholder.com/150',
          role: 'Developer',
          name: 'John Doe',
        },
      })
      expect(wrapper.html()).toContain('<img src="https://via.placeholder.com/150"')
    })
  })
})
