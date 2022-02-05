import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe( 'App Component', () => {
  let wrapper;

  beforeEach(() => {
      wrapper = shallowMount(App)
  })

  test('Debe hacer match con el Snapshot', () => {
      expect( wrapper.html() ).toMatchSnapshot()
  })

})
