import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/main/main-page'
import Register from './pages/auth/register'
import Login from './pages/auth/login'

const App: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='register' element={<Register />} />
			<Route path='login' element={<Login />} />
		</Routes>
	)
}

export default App
