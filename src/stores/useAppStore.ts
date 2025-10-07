import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipeSlice, type RecipesSliceType } from './recipeSlice'

export const useAppStore = create<RecipesSliceType>()(devtools((...a) => ({
   ...createRecipeSlice(...a)
})))