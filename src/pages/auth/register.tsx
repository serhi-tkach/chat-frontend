import toast from 'react-hot-toast'
import { setAuthUser } from '../../store/slices/user'
import { instance } from '../../utils/axios'
import styles from './auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { ApiError } from '../../common/types'
import { useAppDispatch } from '../../utils/hooks'

const Register: FC = (): JSX.Element => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		gender: '',
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setUser({ ...user, gender: e.target.value })

	const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const userData = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: user.password,
			gender: user.gender,
		}
		try {
			const res = await instance.post(`/api/auth/register`, userData)
			dispatch(setAuthUser(res.data))
			navigate('/')
		} catch (error) {
			const err = error as ApiError
			if (err.response?.data)
				toast.error(`${err.response.status} ${err.response.data.message}`)
			if (error instanceof Error) toast.error(error.message)
		}
		setUser({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			gender: '',
		})
	}

	return (
		<div className='center'>
			<div className='login-container'>
				<h1>Sign Up</h1>
				<form onSubmit={onSubmitHandler}>
					<input
						placeholder='First name'
						value={user.firstName}
						onChange={e => setUser({ ...user, firstName: e.target.value })}
						type='text'
					/>
					<input
						placeholder='Last name'
						value={user.lastName}
						onChange={e => setUser({ ...user, lastName: e.target.value })}
						type='text'
					/>
					<input
						placeholder='Email'
						value={user.email}
						onChange={e => setUser({ ...user, email: e.target.value })}
						type='text'
						// type='email'
					/>
					<input
						placeholder='Password'
						value={user.password}
						onChange={e => setUser({ ...user, password: e.target.value })}
						type='password'
					/>
					<div className={styles.radio}>
						<label className={styles.label}>
							<input
								type='radio'
								name='radio'
								value='male'
								onChange={handleChange}
								className={styles.input}
							/>
							Male
						</label>

						<label className={styles.label}>
							<input
								type='radio'
								name='radio'
								value='female'
								onChange={handleChange}
								className={styles.input}
							/>
							Female
						</label>
					</div>
					<button type='submit'>Sign Up</button>
				</form>
				<div className={styles.text}>
					Already have an account?
					<Link className={styles.link} to='/login'>
						sign&#160;in
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Register
