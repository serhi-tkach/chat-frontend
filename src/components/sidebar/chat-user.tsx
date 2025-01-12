import { FC, useState } from 'react'
import { IUser } from '../../common/types'
import { useAppDispatch } from '../../utils/hooks'
import styles from './sidebar.module.css'
import { instance } from '../../utils/axios'
import toast from 'react-hot-toast'
import {
	setAuthUser,
	setOtherUsers,
	setSelectedUser,
} from '../../store/slices/user'
import { setMessages } from '../../store/slices/message'
import TitleUser from './title-user'
import edit from '../../assets/edit.svg'

const ChatUser: FC<IUser> = (user): JSX.Element => {
	const [editData, setEditData] = useState(false)
	const [firstName, setFirstname] = useState(user.firstName)
	const [lasttName, setLastname] = useState(user.lastName)

	const dispatch = useAppDispatch()

	const logoutHandler = async () => {
		try {
			const res = await instance.get<{ message: string }>(`api/auth/logout`)
			console.log(res.data.message)
			toast.success(`${res.status} ${res.data.message}`)
			dispatch(setAuthUser({}))
			dispatch(setMessages({}))
			dispatch(setOtherUsers([]))
			dispatch(setSelectedUser({}))
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmitEdit = () => {}

	return (
		<>
			<div className={styles.auth}>
				<TitleUser {...user} />
				<div>
					<img
						src={edit}
						className='img_btn'
						onClick={() => setEditData(!editData)}
						style={{ marginRight: '0.3em', marginBottom: '-0.2em' }}
					/>
					<button className='login-button' onClick={logoutHandler}>
						Log out
					</button>
				</div>
			</div>
			{editData && (
				<form
					onSubmit={handleSubmitEdit}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end',
						borderRadius: '0.3em',
						background: 'lightblue',
						alignSelf: 'flex-end',
						padding: ' 1.2em',
					}}
				>
					<input
						value={firstName}
						onChange={e => setFirstname(e.target.value)}
						autoFocus
					/>
					<input
						value={lasttName}
						onChange={e => setLastname(e.target.value)}
					/>
					<button
						type='submit'
						className='login-button'
						style={{ marginTop: '0.4em' }}
					>
						<span>&#10003; done</span>
					</button>
				</form>
			)}
		</>
	)
}

export default ChatUser
