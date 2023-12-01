import * as TooltipPrimitive from '@radix-ui/react-tooltip';

type TooltipProps = {
	children: React.ReactNode;
	trigger: React.ReactNode;
};

export default function Tooltip({ children, trigger }: TooltipProps) {
	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root>
				<TooltipPrimitive.Trigger>{trigger}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content className="rounded bg-mediumGrey py-1 px-2 text-xs text-white" sideOffset={8}>
						{children}
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}
