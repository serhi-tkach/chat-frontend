import { createSlice } from '@reduxjs/toolkit'
import { IUser, IUserWithMessage } from '../../common/types'

const userSlice = createSlice({
	name: 'user',
	initialState: {
		authUser: {} as IUser,
		otherUsers: [] as IUserWithMessage[],
		selectedUser: {} as IUserWithMessage,
		selectedUsers: {} as { [keys: string]: string },
		onlineUsers: [] as string[],
	},
	reducers: {
		setAuthUser: (state, action) => {
			state.authUser = action.payload
		},
		setOtherUsers: (state, action) => {
			state.otherUsers = action.payload
		},
		setSelectedUser: (state, action) => {
			state.selectedUser = action.payload
		},
		setSelectedUsers: (state, action) => {
			state.selectedUsers = action.payload
		},
		setOnlineUsers: (state, action) => {
			state.onlineUsers = action.payload
		},
	},
})
export const {
	setAuthUser,
	setOtherUsers,
	setSelectedUser,
	setSelectedUsers,
	setOnlineUsers,
} = userSlice.actions
export default userSlice.reducer

// const userSlice = createSlice({
// 	name: 'user',
// 	initialState: {
// 		authUser: {} as IUser,
// 		otherUsers: [] as IUserWithMessage[],
// 		selectedUser: {} as IUserWithMessage,
// 		onlineUsers: [] as string[],
// 	},
// 	reducers: {
// 		setAuthUser: (state, action) => {
// 			state.authUser = action.payload
// 		},
// 		setOtherUsers: (state, action) => {
// 			state.otherUsers = action.payload
// 		},
// 		setSelectedUser: (state, action) => {
// 			state.selectedUser = action.payload
// 		},
// 		setOnlineUsers: (state, action) => {
// 			state.onlineUsers = action.payload
// 		},
// 	},
// })
// export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers } =
// 	userSlice.actions
// export default userSlice.reducer
