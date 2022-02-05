import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage.vue'

import { mockPokemons } from '../../mocks/pokemons.mock'

describe('PokemonOptions Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage)
  })

  test('Debe hacer match con el Snapshot sin datos', () => {
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('Debe hacer match con el Snapshot con datos', () => {
    const wrapper = mount(PokemonPage, {
      data () {
        return {
          pokemonArr: mockPokemons,
          pokemon: mockPokemons[1],
          showPokemon: false,
          showAnswer: false,
          message: '',
          score: 0
        }
      }
    })

    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('Debe de llamar mixPokemonArray al montarse', () => {
    const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray')
    shallowMount(PokemonPage)

    expect(mixPokemonArraySpy).toHaveBeenCalled()
  })

  test('Debe mostar los compoenentes PokemonPicture y PokemonOptions', () => {
    const wrapper = shallowMount(PokemonPage, {
      data () {
        return {
          pokemonArr: mockPokemons,
          pokemon: mockPokemons[1],
          showPokemon: false,
          showAnswer: false,
          message: '',
          score: 0
        }
      }
    })

    const picture = wrapper.find('pokemon-picture-stub')
    const options = wrapper.find('pokemon-options-stub')

    expect(picture.exists()).toBeTruthy()
    expect(options.exists()).toBeTruthy()

    expect(picture.attributes('pokemonid')).toBe(`${mockPokemons[1].id}`)
    expect(options.attributes('pokemons')).toBeTruthy()
  })

  test('Puebas en checkAnswer', async() => {
    const wrapper = shallowMount(PokemonPage, {
      data () {
        return {
          pokemonArr: mockPokemons,
          pokemon: mockPokemons[1],
          showPokemon: false,
          showAnswer: false,
          message: '',
          score: 0
        }
      }
    })

    await wrapper.vm.checkAnswer(mockPokemons[1].id)
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('h2').text()).toBe(`Yes, ${mockPokemons[1].name}`)
    expect(wrapper.vm.showPokemon).toBeTruthy()

    await wrapper.vm.checkAnswer(mockPokemons[2].id)
    expect(wrapper.vm.message).toBe(`Oops, it was ${mockPokemons[1].name}`)

  })

})
