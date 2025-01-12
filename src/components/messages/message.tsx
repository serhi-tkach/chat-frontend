import { FC, RefObject, useEffect, useRef, useState } from 'react'
import styles from './messages.module.css'
import { IMessage } from '../../common/types'
import { useAppSelector } from '../../utils/hooks'
import edit from '../../assets/edit.svg'
import TextareaAutosize from 'react-textarea-autosize'

const Message: FC<IMessage> = (message): JSX.Element => {
	const [editData, setEditData] = useState(false)
	const [text, setText] = useState(message.message)

	const scroll = useRef() as RefObject<HTMLDivElement> | null

	const { selectedUser, authUser } = useAppSelector(state => state.user)

	const receiving = message?.senderId === selectedUser?._id
	const sendFrom = message?.senderId === authUser._id
	const sendTo = message?.receiverId === selectedUser._id

	useEffect(() => {
		scroll?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [message])

	return (
		<>
			<div
				ref={scroll}
				className={
					receiving
						? styles.message_receiver
						: sendFrom && sendTo
						? styles.message_sender
						: styles.message_invisible
				}
			>
				{receiving && (
					<img
						alt='profilePhoto'
						src={selectedUser?.profilePhoto}
						width={50}
						height={50}
					/>
				)}

				<div className={styles.message_date}>
					<div className={receiving ? styles.receiver : styles.sender}>
						{message?.message}{' '}
						<div
							style={{
								display: 'flex',
								alignItems: 'flex-end',
							}}
						></div>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							fontSize: '0.8em',
							padding: '0 10px',
						}}
					>
						{sendFrom && (
							<img
								src={edit}
								className='img_btn'
								onClick={() => setEditData(!editData)}
							/>
						)}
						<time>
							{new Date(message.createdAt).toLocaleString('en-US', {
								year: 'numeric',
								month: 'numeric',
								day: 'numeric',
								hour: 'numeric',
								hour12: true,
								minute: 'numeric',
							})}
						</time>
					</div>
				</div>
			</div>
			{editData && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end',
						borderRadius: '2em',
						background: 'lightblue',
						alignSelf: 'flex-end',
						padding: ' 1.2em',
						gap: '0.8em',
					}}
				>
					<TextareaAutosize
						style={{
							padding: '1em 2em',
							width: '30vw',
							borderRadius: '2em',
							border: 'none',
							// background: 'lightblue',
						}}
						value={text}
						onChange={e => setText(e.target.value)}
						autoFocus
					/>
					<button type='submit' className='login-button'>
						<span>&#10003; done</span>
					</button>
				</div>
			)}
		</>
	)
}

export default Message
