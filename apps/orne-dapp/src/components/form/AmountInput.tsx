import { useRifm } from 'rifm';
import { formatFloatingPointNumber, parseNumber } from '~/schema/number';
import { kNumberRegex } from '~/utils/constants';
import type { ComponentPropsWithoutRef } from 'react';

type AmountInputProps = {
	value: string;
	onChange: (value: string) => void;
};

export function AmountInput({
	value,
	onChange,
	type = 'tel',
	...props
}: Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> & AmountInputProps) {
	const rifm = useRifm({
		accept: kNumberRegex,
		value: value,
		onChange: (value) => onChange(parseNumber(value)),
		format: (v) => formatFloatingPointNumber(v, 5),
	});

	return <input autoComplete="off" type={type} {...props} value={rifm.value} onChange={rifm.onChange} />;
}
