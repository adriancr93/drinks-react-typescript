import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipeSlice, type RecipesSliceType } from './recipeSlice'
import { type FavoritesSliceType, createFavoritesSlice } from './favoritesSlice'

export const useAppStore = create<RecipesSliceType & FavoritesSliceType>()(devtools((...a) => ({
   ...createRecipeSlice(...a),
   ...createFavoritesSlice(...a)
})))