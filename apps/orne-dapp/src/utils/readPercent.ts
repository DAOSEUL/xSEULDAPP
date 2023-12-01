export function readPercent(value: string | null) {
	if (!value) return 0;

	return (Number(value) / 100).toFixed(2);
}
