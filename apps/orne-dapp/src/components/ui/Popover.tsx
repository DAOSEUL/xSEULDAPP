import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import { Icon } from './Icon';
import { AnimatePresence, motion } from 'framer-motion';

type PopoverProps = {
	children: ReactNode;
	trigger: ReactNode;
	closable?: boolean;
	title: string;
};

const MotionContent = motion(PopoverPrimitive.Content);

export function Popover({ children, trigger, closable, title }: PopoverProps) {
	return (
		<PopoverPrimitive.Root>
			<PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
			<AnimatePresence>
				<PopoverPrimitive.Portal>
					<MotionContent
						side="bottom"
						sideOffset={8}
						align="end"
						className="w-96 rounded-lg bg-offWhite p-8 shadow-lg"
						initial={{ x: 0, y: -8, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -16, opacity: 0 }}
					>
						<div className="mb-2 flex items-center justify-between">
							<h3 className="text-2xl font-semibold">{title}</h3>
							{closable && (
								<PopoverPrimitive.Close>
									<Icon name="close" />
								</PopoverPrimitive.Close>
							)}
						</div>
						{children}
					</MotionContent>
				</PopoverPrimitive.Portal>
			</AnimatePresence>
		</PopoverPrimitive.Root>
	);
}
