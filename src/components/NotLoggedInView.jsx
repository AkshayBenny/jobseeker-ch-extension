import React from 'react'
import { handleLogin } from '../utils/popupUtils'

export default function NotLoggedInView({
	setLoading,
	setIsLoggedIn,
	setError,
}) {
	return (
		<div>
			<p>Welcome</p>
			<p>Sign up with your Google account to get started!</p>
			<button
				onClick={() =>
					handleLogin(setLoading, setIsLoggedIn, setError)
				}>
				Signup with Google
			</button>
		</div>
	)
}
