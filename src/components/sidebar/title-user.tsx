import { FC } from 'react'
import { IUser } from '../../common/types'
import styles from './sidebar.module.css'
import UserPhoto from './user-photo'

const TitleUser: FC<IUser> = (user): JSX.Element => {
	return (
		<div className={styles.user}>
			<UserPhoto {...user} />
			<span className={styles.text}>
				{user.firstName} {user.lastName}
			</span>
		</div>
	)
}

export default TitleUser
