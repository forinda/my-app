import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HmpBanner from './HmpBanner.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HmpBanner, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Manage')
  })
})
