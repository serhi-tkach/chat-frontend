import { FormEvent, useEffect, useState } from 'react'
import send from '../../assets/send.svg'
import { setMessages } from '../../store/slices/message'
import { instance } from '../../utils/axios'
import styles from './messages.module.css'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { IMessage } from '../../common/types'

const SendInput = () => {
	const dispatch = useAppDispatch()

	const [message, setMessage] = useState('')
	const [joke, setJoke] = useState('')

	const { authUser, selectedUser, onlineUsers } = useAppSelector(
		state => state.user,
	)
	const { messages } = useAppSelector(state => state.message)
	const { socket } = useAppSelector(state => state.socket)

	const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const res = await instance.post<IMessage>(
				`api/message/send/${authUser?._id}`,
				{
					message,
					receiverId: selectedUser?._id,
				},
			)
			dispatch(setMessages([...messages, res?.data]))
		} catch (error) {
			console.log(error)
		}
		try {
			const res = await axios.get<{ joke: string }>(
				'https://geek-jokes.sameerkumar.website/api?format=json',
			)
			setJoke(res.data.joke)
		} catch (error) {
			console.log(error)
		}

		if (onlineUsers.includes(selectedUser?._id))
			socket?.emit(
				'notification',
				selectedUser?._id,
				authUser.firstName,
				authUser.lastName,
			)

		setMessage('')
	}

	useEffect(() => {
		const autoresponse = async () => {
			if (joke) {
				try {
					const res = await instance.post<IMessage>(
						`api/message/send/${selectedUser?._id}`,
						{
							message: `Auto response: ${joke}`,
							receiverId: authUser?._id,
						},
					)
					dispatch(setMessages([...messages, res?.data]))
				} catch (error) {
					console.log(error)
				}
			}
		}
		setTimeout(() => autoresponse(), 3000)
	}, [joke])

	return (
		<form onSubmit={onSubmitHandler}>
			<div className={styles.form}>
				<input
					value={message}
					onChange={e => setMessage(e.target.value)}
					type='text'
					placeholder='Type your message'
					style={{ paddingRight: '3em' }}
				/>
				<button type='submit' className={styles.icon_button}>
					<img src={send} />
				</button>
			</div>
		</form>
	)
}

export default SendInput
