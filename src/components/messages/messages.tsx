import { useEffect } from 'react'
import { setMessages } from '../../store/slices/message'
import { instance } from '../../utils/axios'
import Message from './message'
import styles from './messages.module.css'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { IMessage } from '../../common/types'

const Messages = () => {
	const dispatch = useAppDispatch()

	const { selectedUser } = useAppSelector(state => state.user)
	const { socket } = useAppSelector(state => state.socket)
	const { messages } = useAppSelector(state => state.message)

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const res = await instance.get<IMessage[]>(
					`api/message/${selectedUser?._id}`,
				)
				dispatch(
					setMessages(
						res.data.sort(
							(a, b) =>
								new Date(a.createdAt).getTime() -
								new Date(b.createdAt).getTime(),
						),
					),
				)
			} catch (error) {
				console.log(error)
			}
		}
		fetchMessages()
	}, [selectedUser, dispatch])

	useEffect(() => {
		socket?.on('newMessage', (newMessage: IMessage) => {
			dispatch(setMessages([...messages, newMessage]))
		})
		// return () => socket?.off('newMessage')
	}, [messages, dispatch, socket, selectedUser])

	return (
		<div className={styles.message}>
			{messages?.map(message => (
				<Message key={message._id} {...message} />
			))}
		</div>
	)
}

export default Messages
