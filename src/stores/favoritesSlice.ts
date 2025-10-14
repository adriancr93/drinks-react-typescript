import type { StateCreator } from 'zustand'
import type { Recipe } from '../types'
import { createRecipeSlice, type RecipesSliceType } from './recipeSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'

export type FavoritesSliceType = {
    favorites: Recipe[]
    handledClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handledClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({text: 'Eliminate of Favorites', error: false})
        } else {
            set((state) => ({
                favorites: [ ...state.favorites, recipe]
            }));
            createNotificationSlice(set, get, api).showNotification({text: 'Added to Favorites', error: false})
        }
        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            set({ favorites: JSON.parse(storedFavorites) })
        }
    }
})

// Slice Pattern: https://docs.pmnd.rs/zustand/guides/slice-pattern