import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions.vue'

import { mockPokemons } from '../../mocks/pokemons.mock'

describe('PokemonOptions Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: mockPokemons
      }
    })
  })

  test('Debe hacer match con el Snapshot', () => {
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('Debe mostrar las 4 opciones correctamente', () => {
    const liTags = wrapper.findAll( 'li' )

    expect(liTags.length).toBe(4)

    liTags.forEach( (li, index) => {
      expect(li.text()).toBe(mockPokemons[index].name)
    })
  });

  test('Debe emitir "selection" con sus respectivos parametros al hacer click', () => {

    const liTags = wrapper.findAll( 'li' )

    liTags.forEach( (li, index) => {
      li.trigger('click')
      expect( wrapper.emitted('selection')[index][0] ).toBe(mockPokemons[index].id);
    });

  });

});
