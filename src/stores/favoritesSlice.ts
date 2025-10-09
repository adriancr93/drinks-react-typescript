import type { StateCreator } from 'zustand'
import type { Recipe } from '../types'

export type FavoritesSliceType = {
    favorites: Recipe[]
    handledClickFavorite: (recipe: Recipe) => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handledClickFavorite: (recipe) => {
        if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
        } else {
            set((state) => ({
                favorites: [ ...state.favorites, recipe]
            }));
        }
    }
})

// Slice Pattern: https://docs.pmnd.rs/zustand/guides/slice-pattern