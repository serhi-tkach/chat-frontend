import { FC } from 'react'
import { IUser } from '../../common/types'
import { useAppSelector } from '../../utils/hooks'
import { style } from '../../common/consts'

const UserPhoto: FC<IUser> = (user): JSX.Element => {
	const { onlineUsers } = useAppSelector(state => state.user)

	return (
		<div style={{ minWidth: '62px' }}>
			<img src={user.profilePhoto} width={50} />
			<span
				style={onlineUsers?.includes(user._id) ? style : { display: 'none' }}
			>
				&#10003;
			</span>
		</div>
	)
}

export default UserPhoto
