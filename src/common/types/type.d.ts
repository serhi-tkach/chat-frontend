export interface ServerToClientEvents {
	getOnlineUsers: (onlineUsers: string[]) => void
	notification_message: (message: string) => void
	selectedUsers: (users: { [key: string]: string }) => void
	// notification: (
	// 	a: string,
	// 	b: string | undefined,
	// 	c: string | undefined,
	// ) => void
}

export interface ClientToServerEvents {
	selectedUser: (selectedUser: string) => void
	notification: (
		a: string,
		b: string | undefined,
		c: string | undefined,
	) => void
	// notification_message: (message: string) => void
	// selectedUsers: (users: { [key: string]: string }) => void
}
