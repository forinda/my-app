import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Team from './HmpTeam.vue'

describe('Homepage Team', () => {
  it('renders properly', () => {
    describe('Homepage Team', () => {
      it('renders properly', () => {
        const wrapper = mount(Team, {
          props: {
            members: [
              {
                name: 'John Doe',
                role: 'Developer',
                image: 'https://via.placeholder.com/150',
                social: {
                  twitter: 'https://twitter.com',
                  linkedin: 'https://linkedin.com',
                  github: 'https://github.com',
                },
              },
            ],
          },
        })
        expect(wrapper.text()).toContain('Developer')
      })

      it('renders multiple team members', () => {
        const wrapper = mount(Team, {
          props: {
            members: [
              {
                name: 'John Doe',
                role: 'Developer',
                image: 'https://via.placeholder.com/150',
                social: {
                  twitter: 'https://twitter.com',
                  linkedin: 'https://linkedin.com',
                  github: 'https://github.com',
                },
              },
              {
                name: 'Jane Smith',
                role: 'Designer',
                image: 'https://via.placeholder.com/150',
                social: {
                  twitter: 'https://twitter.com',
                  linkedin: 'https://linkedin.com',
                  github: 'https://github.com',
                },
              },
            ],
          },
        })
        expect(wrapper.text()).toContain('Developer')
        expect(wrapper.text()).toContain('Designer')
      })

      it('renders team member social links', () => {
        const wrapper = mount(Team, {
          props: {
            members: [
              {
                name: 'John Doe',
                role: 'Developer',
                image: 'https://via.placeholder.com/150',
                social: {
                  twitter: 'https://twitter.com',
                  linkedin: 'https://linkedin.com',
                  github: 'https://github.com',
                },
              },
            ],
          },
        })
        const links = wrapper.findAll('a')
        expect(links[0].attributes('href')).toBe('https://twitter.com')
        expect(links[1].attributes('href')).toBe('https://linkedin.com')
        expect(links[2].attributes('href')).toBe('https://github.com')
      })
    })
  })
})
