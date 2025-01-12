export interface IUser {
	_id: string
	firstName: string
	lastName: string
	profilePhoto: string
}

export interface IUserWithMessage extends IUser {
	message?: string
	date?: string
}

export interface IMessage {
	_id: string
	senderId: string
	receiverId: string
	message: string
	createdAt: Date
}

// export interface IMessageResponse {
// 	_id: string
// 	senderId: string
// 	receiverId: string
// 	newMessage: string
// 	createdAt: Date
// }

export interface ApiError {
	response?: {
		data?: { message: string }
		status: number
	}
}

// export interface ServerToClientEvents {
// 	getOnlineUsers: (onlineUsers: string[]) => void
// 	notification_message: (message: string) => void
// 	selectedUsers: (users: { [key: string]: string }) => void
// 	// notification: (
// 	// 	a: string,
// 	// 	b: string | undefined,
// 	// 	c: string | undefined,
// 	// ) => void
// }

// export interface ClientToServerEvents {
// 	selectedUser: (selectedUser: string) => void
// 	notification: (
// 		a: string,
// 		b: string | undefined,
// 		c: string | undefined,
// 	) => void
// 	// notification_message: (message: string) => void
// 	// selectedUsers: (users: { [key: string]: string }) => void
// }
