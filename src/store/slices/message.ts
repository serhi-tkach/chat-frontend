import { createSlice } from '@reduxjs/toolkit'
import { IMessage } from '../../common/types'

const messageSlice = createSlice({
	name: 'message',
	initialState: {
		messages: [] as IMessage[],
	},
	reducers: {
		setMessages: (state, action) => {
			state.messages = action.payload
		},
	},
})

export const { setMessages } = messageSlice.actions
export default messageSlice.reducer
