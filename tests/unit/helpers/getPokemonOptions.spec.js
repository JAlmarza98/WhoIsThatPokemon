import getPokemonOptions, { getPokemons, getPokemonNames } from '@/helpers/getPokemonsOptions'

import { mockPokemons } from '../../mocks/pokemons.mock'

describe('getPokemonOptions helpers', () => {

  const pokemonDataTest = mockPokemons

  test('Debe regresar un Array de numeros ', () => {
    const pokemons = getPokemons()

    expect( pokemons.length ).toBe(649)
    expect( pokemons[0] ).toBe(1)
    expect( pokemons[648] ).toBe(649)
  })

  test('Debe retornar un Array de 4 elementos con nombres de pokemons ', async() => {
    const pokemons = await getPokemonNames([1,2,3,4])

    expect( pokemons ).toStrictEqual(pokemonDataTest)
  });

  test('getPokemonOptions debe de retornar un Array ordenardo de forma aleatoria ', async() => {
    const pokemons = await getPokemonOptions()

    expect( pokemons.length).toBe(4)
    expect( pokemons ).toEqual( [
      {
        name: expect.any(String),
        id: expect.any(Number)
      },
      {
        name: expect.any(String),
        id: expect.any(Number)
      },
      {
        name: expect.any(String),
        id: expect.any(Number)
      },
      {
        name: expect.any(String),
        id: expect.any(Number)
      }
    ])
  });

})
