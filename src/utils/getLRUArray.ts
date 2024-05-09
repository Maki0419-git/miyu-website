export const LRUArray = <T>(array: T[], value: T, maxLength: number) => {
	const index = array.indexOf(value)
	if (index !== -1) {
		array.splice(index, 1)
	}
	if (array.length >= maxLength) {
		array.pop()
	}

	array.unshift(value)

	return [...array]
}
