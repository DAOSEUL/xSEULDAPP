import clsx from 'clsx';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
	variant?: 'fill' | 'outline';
	size?: 'sm' | 'lg';
	type?: 'button' | 'submit' | 'reset';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ children, variant = 'fill', className, onClick, size = 'lg', type = 'button' },
	ref
) {
	const classes = clsx(
		'inline-flex items-center justify-center font-semibold px-4 py-2 border border-transparent rounded-full transition-colors',
		{
			'bg-green text-darkGreen hover:bg-green75': variant === 'fill',
			'text-green border-2 !border-green hover:bg-green hover:text-darkGreen': variant === 'outline',
		},
		{
			'h-8 px-3 text-sm': size === 'sm',
			'h-12 w-full text-base': size === 'lg',
		},
		className
	);

	return (
		<button className={classes} ref={ref} type={type} onClick={onClick}>
			{children}
		</button>
	);
});
