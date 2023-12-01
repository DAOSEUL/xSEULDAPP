import close from '~/assets/icons/close.svg';
import dashboard from '~/assets/icons/dashboard.svg';
import dropdown from '~/assets/icons/dropdown.svg';
import earn from '~/assets/icons/earn.svg';
import info from '~/assets/icons/info.svg';
import linkTo from '~/assets/icons/linkto.svg';
import menu from '~/assets/icons/menu.svg';
import plus from '~/assets/icons/plus.svg';
import swap from '~/assets/icons/swap.svg';
import tree from '~/assets/icons/tree.svg';
import wallet from '~/assets/icons/wallet.svg';
import twitter from '~/assets/icons/twitter.svg';
import telegram from '~/assets/icons/telegram.svg';
import github from '~/assets/icons/github.svg';
import notion from '~/assets/icons/notion.svg';
import medium from '~/assets/icons/medium.svg';
import infoMin from '~/assets/icons/info-min.svg';

type IconProps = {
	name:
		| 'close'
		| 'dashboard'
		| 'dropdown'
		| 'earn'
		| 'info'
		| 'linkTo'
		| 'menu'
		| 'plus'
		| 'swap'
		| 'tree'
		| 'wallet'
		| 'twitter'
		| 'telegram'
		| 'github'
		| 'notion'
		| 'medium'
		| 'info-min';
	className?: string;
};

const icons = {
	close,
	dashboard,
	dropdown,
	earn,
	info,
	linkTo,
	menu,
	plus,
	swap,
	tree,
	wallet,
	twitter,
	telegram,
	github,
	notion,
	medium,
	'info-min': infoMin,
};

export function Icon({ name, className }: IconProps) {
	return <img src={icons[name]} alt={name} className={className} />;
}
