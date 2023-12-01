import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useOrnePresaleToken } from '~/hooks/useOrnePresaleToken';

const rarityOrder = {
	Common: 1,
	Rare: 2,
	Epic: 3,
	Legendary: 4,
};

export function PresaleNFTList() {
	const { data: tokens, isLoading } = useOrnePresaleToken();

	if (isLoading) {
		return (
			<div className="flex justify-center">
				<ThreeDots color="hsl(203,23%,42%)" height="30" />
			</div>
		);
	}

	const sortedTokens = tokens?.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);

	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			{sortedTokens?.map((token) => (
				<div key={token.edition} className="bg-offWhite rounded-lg p-7 shadow-sm">
					<div className="mb-6 flex items-center justify-center">
						<img className="h-32" src={token.media} alt="" />
					</div>

					<div className="flex items-center justify-between">
						<dt className="text-mediumGrey">Title</dt>
						<dd className=" inline-flex items-center font-semibold">{token.title}</dd>
					</div>

					<div className="flex items-center justify-between">
						<dt className="text-mediumGrey">Edition</dt>
						<dd className="inline-flex items-center font-semibold">{token.edition}</dd>
					</div>

					<div className="flex items-center justify-between">
						<dt className="text-mediumGrey">Rarity</dt>
						<dd className=" inline-flex items-center font-semibold">{token.rarity}</dd>
					</div>
				</div>
			))}
		</div>
	);
}
