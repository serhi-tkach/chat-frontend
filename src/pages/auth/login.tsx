import { FC, FormEvent, useState } from 'react'
import styles from './auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { API_URL, instance } from '../../utils/axios'
import { setAuthUser } from '../../store/slices/user'
import { ApiError, IUser } from '../../common/types'
import { useAppDispatch } from '../../utils/hooks'

const Login: FC = (): JSX.Element => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const userData = { email, password }
		try {
			const res = await instance.post<IUser | ApiError>(
				`/api/auth/login`,
				userData,
			)
			dispatch(setAuthUser(res.data))
			navigate('/')
		} catch (error) {
			const err = error as ApiError
			if (err.response?.data)
				toast.error(`${err.response.status} ${err.response.data.message}`)
			if (error instanceof Error) toast.error(error.message)
		}
		setEmail('')
		setPassword('')
	}

	const loginWithGoogle = () => {
		try {
			window.open(`${API_URL}api/auth/google/callback`, '_self')
		} catch (error) {
			if (error instanceof Error) toast.error(error.message)
		}
	}

	return (
		<div className='center'>
			<div className='login-container'>
				<h1>Sign In</h1>
				<form onSubmit={onSubmitHandler}>
					<input
						placeholder='Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						type='text'
					/>
					<input
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
					/>
					<button type='submit'>Sign In</button>
				</form>
				<button onClick={loginWithGoogle}>Continue with Google</button>
				<div className={styles.text}>
					Don`t have an account?
					<Link className={styles.link} to='/register'>
						sign&#160;up
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
