import axios from 'axios'

export const API_URL = 'http://localhost:8008'

export const instance = axios.create({
	withCredentials: true,
	baseURL: API_URL,
	// baseURL: `${process.env.REACT_APP_URL}`,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
	},
})
