import { IUserWithMessage } from './types'

export const style = {
	color: 'green',
	border: '1px solid green',
	borderRadius: '50%',
	padding: '0 0.16em',
	marginLeft: -10,
}

export const findElem = (
	el: string,
	arr: IUserWithMessage[],
): IUserWithMessage[] =>
	arr.filter(it =>
		`${it.firstName?.toLowerCase()} ${it.lastName?.toLowerCase()}`.includes(
			el?.toLowerCase(),
		),
	)
