import { useNavigate } from 'react-router-dom'
import unknown from '../../assets/unknown.png'
import styles from './main-page.module.css'
import { FC, useEffect } from 'react'
import { API_URL, instance } from '../../utils/axios'
import { setAuthUser, setOnlineUsers } from '../../store/slices/user'
import toast, { useToasterStore } from 'react-hot-toast'
import { io } from 'socket.io-client'
import { setSocket } from '../../store/slices/socket'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { ApiError, IUser } from '../../common/types'
import Sidebar from '../../components/sidebar/sidebar'
import MessagesContainer from '../../components/messages/messages.container'

const MainPage: FC = (): JSX.Element => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { authUser } = useAppSelector(state => state.user)
	const { socket } = useAppSelector(state => state.socket)

	const { toasts } = useToasterStore()
	const TOAST_LIMIT = 1

	useEffect(() => {
		toasts.filter((_, i) => i >= TOAST_LIMIT).forEach(t => toast.dismiss(t.id))
	}, [toasts])

	useEffect(() => {
		const checkAuth = async () => {
			if (!authUser?._id) {
				try {
					const res = await instance.get<IUser>('/api/auth/check')
					dispatch(dispatch(setAuthUser(res.data)))
				} catch (error) {
					const err = error as ApiError
					if (err.response?.data)
						toast.error(`${err.response.status} ${err.response.data.message}`)
					// if (error instanceof Error) toast.error(error.message)
				}
			}
		}
		checkAuth()
	}, [dispatch, authUser])

	useEffect(() => {
		if (authUser?._id) {
			const socketIo = io(API_URL, { query: { userId: authUser?._id } })

			dispatch(setSocket(socketIo))

			socketIo.on('getOnlineUsers', onlineUsers => {
				dispatch(setOnlineUsers(onlineUsers))
			})
			// return () => socketIo.close()
		} else {
			if (socket) {
				socket.close()
				dispatch(setSocket(null))
			}
		}
	}, [authUser, dispatch])

	return (
		<>
			{authUser?._id ? (
				<div className={styles.layout}>
					<Sidebar />
					<MessagesContainer />
				</div>
			) : (
				<div className={styles.login}>
					<img src={unknown} alt='Log out user' />
					<button className='login-button' onClick={() => navigate('/login')}>
						Log in
					</button>
				</div>
			)}
		</>
	)
}

export default MainPage
