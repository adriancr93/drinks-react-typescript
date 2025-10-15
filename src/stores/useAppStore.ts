import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipeSlice, type RecipesSliceType } from './recipeSlice'
import { type FavoritesSliceType, createFavoritesSlice } from './favoritesSlice'
import { type NotificationSliceType, createNotificationSlice } from './notificationSlice'
import { type AISlice, createAISlice } from './aiSlice'

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
   ...createRecipeSlice(...a),
   ...createFavoritesSlice(...a),
   ...createNotificationSlice(...a),
   ...createAISlice(...a),
})))