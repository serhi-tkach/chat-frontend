import axios from 'axios'

export const API_URL = '/'

export const instance = axios.create({
	withCredentials: true,
	baseURL: API_URL,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
	},
})
