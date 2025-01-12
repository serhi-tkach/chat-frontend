import { createSlice } from '@reduxjs/toolkit'

const socketSlice = createSlice({
	name: 'socket',
	initialState: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		socket: null as any,
	},
	reducers: {
		setSocket: (state, action) => {
			state.socket = action.payload
		},
	},
})
export const { setSocket } = socketSlice.actions
export default socketSlice.reducer
