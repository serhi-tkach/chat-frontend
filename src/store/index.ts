import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user'
import messageSlice from './slices/message'
import socketSlice from './slices/socket'

const store = configureStore({
	reducer: {
		user: userSlice,
		message: messageSlice,
		socket: socketSlice,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
