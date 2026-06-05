export function useAvatar(
	avatar?: string,
	defaultAvatar: string = DefaultAvatar.MUSIC
) {
	return avatar ? avatar : defaultAvatar;
}
