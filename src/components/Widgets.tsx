import React from 'react'

/**
 * Component Widgets, will render cards and populate data with props coming from container.
 * @param props Data for cards from container
 */
export const Widgets = (props: Props) => {
	/**
	 * Will create a pre stylized card with the params:
	 * @param title Title for card
	 * @param value Value for card
	 * @param iconClassName Icon for card
	 */
	const createCard = (title: string, value: null | number | string, iconClassName: string) => (
		<div className="col-xl-3 col-lg-6 col-xs-12 card">
			<span className="card-container">
				<span className={`card-icon ${title.toLowerCase().replace(' ', '-')}`}>
					<i className={iconClassName} />
				</span>
				<span className="card-data">
					<span className="card-data-value" style={{ opacity: value ? 1 : 0 }}>
						{value ? value : '000'}
					</span>
					<span className="card-data-title">{title}</span>
				</span>
			</span>
		</div>
	)

	/**
	 * Render the content
	 */
	return (
		<section className="Widgets">
			<div className="row">
				{createCard('New Orders', props.cards && props.cards.newOrders, 'fas fa-shopping-bag')}
				{createCard('Comments', props.cards && props.cards.comments, 'far fa-comment')}
				{createCard('New Users', props.cards && props.cards.newUsers, 'far fa-user')}
				{createCard(
					'Page Views',
					props.cards && (props.cards.pageViews / 1000).toFixed(1) + 'k',
					'fas fa-chart-bar'
				)}
			</div>
		</section>
	)
}

/**
 * Props interface to Widgets Component (for the TypeScript)
 */
export interface Props {
	cards: {
		newOrders: number
		comments: number
		newUsers: number
		pageViews: number
	} | null
}
