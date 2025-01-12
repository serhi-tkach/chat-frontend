import styles from './messages.module.css'
import Messages from './messages'
import SendInput from './send-input'
import { useAppSelector } from '../../utils/hooks'
import TitleUser from '../sidebar/title-user'

const MessagesContainer = () => {
	const { authUser, selectedUser } = useAppSelector(state => state.user)

	return (
		<>
			{selectedUser._id ? (
				<div className={styles.message_container}>
					<div className={styles.chatuser}>
						<TitleUser {...selectedUser} />
					</div>
					<div className={styles.messages}></div>
					<Messages />
					<SendInput />
				</div>
			) : (
				<div className={styles.start_messaging}>
					<p
						className={styles.text}
					>{`Hi ${authUser.firstName}! Select a chat to start messaging`}</p>
				</div>
			)}
		</>
	)
}

export default MessagesContainer
