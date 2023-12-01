import astro from '~/assets/tokens/astro.png';
import luna from '~/assets/tokens/luna.png';
import orne from '~/assets/tokens/xseul.png';
import { Token } from '~/utils/constants';

type IconTokenProps = {
	name: Token;
	className?: string;
	size?: number;
};

const tokens = {
	[Token.Orne]: orne,
	[Token.Luna]: luna,
	[Token.Astro]: astro,
};

export function IconToken({ name, className, size = 24 }: IconTokenProps) {
	return <img src={tokens[name]} alt={name} className={className} width={size} height={size} />;
}
