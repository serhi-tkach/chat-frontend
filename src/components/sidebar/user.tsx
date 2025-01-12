import { setSelectedUser } from '../../store/slices/user'
import styles from './sidebar.module.css'
import { IUserWithMessage } from '../../common/types'
import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import UserPhoto from './user-photo'
import remove from '../../assets/remove.svg'
import { instance } from '../../utils/axios'

const User: FC<IUserWithMessage> = (user): JSX.Element => {
	const [removeChat, setRemoveChat] = useState(false)
	const dispatch = useAppDispatch()

	const { selectedUser } = useAppSelector(state => state.user)
	const { socket } = useAppSelector(state => state.socket)

	const deleteChat = () => {
		setRemoveChat(!removeChat)
	}

	const handleDeleteChat = async () => {
		try {
			const res = await instance.delete(`api/message/${selectedUser?._id}`)
			console.log(res?.data)
			setRemoveChat(false)
			dispatch(setSelectedUser({}))
			socket?.emit('selectedUser', user._id)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<li className={selectedUser?._id === user._id ? styles.li_selected : ''}>
				<div
					className={styles.flex}
					onClick={() => {
						socket?.emit('selectedUser', user._id)
						dispatch(setSelectedUser(user))
					}}
				>
					<UserPhoto {...user} />
					<div className={styles.user_message}>
						<span>
							{user.firstName} {user.lastName}
						</span>
						<span className={styles.selected_message}>{user?.message}</span>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
					}}
				>
					<time
						style={{
							fontSize: '0.8em',
							whiteSpace: 'nowrap',
						}}
					>
						{' '}
						{user?.date
							? new Date(user.date as string).toLocaleString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric',
							  })
							: null}
					</time>
					{user?.message && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							{user._id === selectedUser._id && (
								<img src={remove} className='img_btn' onClick={deleteChat} />
							)}
						</div>
					)}
				</div>
			</li>
			{removeChat && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1em',
						borderRadius: '0.3em',
						background: 'lightgrey',
						padding: ' 1.2em',
					}}
				>
					<span style={{ fontSize: '1.2em', fontWeight: 600, color: 'red' }}>
						Confirm deleting the chat
					</span>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<button
							onClick={() => setRemoveChat(false)}
							className='login-button'
						>
							Cancel
						</button>
						<button
							onClick={handleDeleteChat}
							style={{ background: 'red', color: 'white' }}
							className='login-button'
						>
							Delete chat
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default User
