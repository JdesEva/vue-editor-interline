import Vue from 'vue'
import { mount } from '@vue/test-utils'
import vueEditor from '../../packages/vueEditor/src/vueEditor'

describe('vueEditor', () => {
  const wrapper = mount(vueEditor)

  it('create', async () => {
    return Vue.nextTick().then(function () {
      expect(wrapper.contains('.w-e-text')).toBe(true)
    })
  })
})
