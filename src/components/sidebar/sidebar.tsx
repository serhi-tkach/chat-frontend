import { FC, useEffect, useState } from 'react'
import styles from './sidebar.module.css'
import { instance } from '../../utils/axios'
import { setOtherUsers } from '../../store/slices/user'
import toast from 'react-hot-toast'
import { setMessages } from '../../store/slices/message'
import notFound from '../../assets/notfound.png'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import User from './user'
import ChatUser from './chat-user'
import { IMessage, IUserWithMessage } from '../../common/types'
import { findElem } from '../../common/consts'

const Sidebar: FC = (): JSX.Element => {
	const [search, setSearch] = useState('')
	const [joke, setJoke] = useState('')
	const dispatch = useAppDispatch()

	const { authUser, otherUsers, onlineUsers } = useAppSelector(
		state => state.user,
	)
	const { socket } = useAppSelector(store => store.socket)
	const { messages } = useAppSelector(store => store.message)

	const searchUsers = findElem(search, otherUsers)

	const messageToRandomChat = async () => {
		if (onlineUsers?.length > 1)
			try {
				const res = await axios.get<{ joke: string }>(
					'https://geek-jokes.sameerkumar.website/api?format=json',
				)
				setJoke(res.data.joke)
			} catch (error) {
				console.log(error)
			}
	}

	useEffect(() => {
		const sendingToRandomChat = async () => {
			const users = onlineUsers?.filter(it => it !== authUser?._id)
			const receiverId =
				users?.length && users[Math.round(Math.random() * (users?.length - 1))]

			if (receiverId)
				if (joke) {
					try {
						const res = await instance.post<IMessage>(
							`api/message/send/${authUser?._id}`,
							{
								message: `Message to random chat: ${joke}`,
								receiverId,
							},
						)
						dispatch(setMessages([...messages, res?.data]))
					} catch (error) {
						console.log(error)
					}
					socket?.emit(
						'notification',
						receiverId,
						authUser?.firstName,
						authUser?.lastName,
					)
				}
		}
		sendingToRandomChat()
	}, [joke])

	useEffect(() => {
		socket?.on('notification_message', (message: string) =>
			toast.success(message),
		)
	}, [socket])

	useEffect(() => {
		const getOtherUsers = async () => {
			try {
				const res = await instance.get<IUserWithMessage>(`/api/user`)
				dispatch(setOtherUsers(res?.data))
			} catch (error) {
				console.log(error)
			}
		}
		getOtherUsers()
	}, [dispatch, messages])

	return (
		<main className={styles.sidebar}>
			<section className={styles.authuser}>
				<ChatUser {...authUser} />
				<input
					className={`icon ${styles.search}`}
					placeholder='Search or start new chat'
					onChange={e => setSearch(e.target.value)}
				/>
			</section>
			<section className={styles.users}>
				<div className={styles.auth}>
					<div className={styles.chats}>Chats</div>
					<button className='login-button' onClick={messageToRandomChat}>
						Send message to random chat
					</button>
				</div>
				<ul>
					{searchUsers?.length ? (
						searchUsers.map(user => <User key={user._id} {...user} />)
					) : (
						<div className={styles.notfound}>
							<img src={notFound} alt='Not found' />
							<h2>No results</h2>
							There were no results for search {`"${search}"`}
						</div>
					)}
				</ul>
			</section>
		</main>
	)
}

export default Sidebar
