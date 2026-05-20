export function useSelectedIndex() {
	const selectedIndex = ref(-1);

	const mouseEnterItem = (index: number) => {
		selectedIndex.value = index;
	};

	const mouseLeaveItem = () => {
		selectedIndex.value = -1;
	};

	return {
		selectedIndex,
		mouseEnterItem,
		mouseLeaveItem
	};
}
