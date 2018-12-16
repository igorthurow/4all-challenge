import React from 'react'

export const Widgets = (props: Props) => {
	const createCard = (title: string, value: null | number | string, iconClassName: string) => (
		<div className="col-xl-3 col-lg-6 col-xs-12 card-gap">
			<span className="col-md-12 card-container">
				<span className={`card-icon ${title.toLowerCase().replace(' ', '-')}`}>
					<i className={iconClassName} />
				</span>
				<span className="card-data">
					<span className="card-data-value" style={{ opacity: value ? 1 : 0 }}>
						{value ? value : '000'}
					</span>
					<span className="card-data-title">{title || null}</span>
				</span>
			</span>
		</div>
	)

	return (
		<div className="Widgets">
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
		</div>
	)
}

export interface Props {
	cards: {
		newOrders: number
		comments: number
		newUsers: number
		pageViews: number
	} | null
}