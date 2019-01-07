import * as React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

/**
 * Component Chart, will render the Chart and populate data with props coming from container.
 * @param props Data for Chart from container
 */
export const Chart = (props: Props) => {
	/**
	 * Creates a new random 'Views' data to simulate a comparative Chart (API retrieve just one 'Views' data).
	 */
	const relativeData = () =>
		props.pageViews!.map(chartData => ({
			month: chartData.month,
			views: chartData.views,
			lastMonth: +(chartData.views + (Math.random() * (500 - 100) + 100)).toFixed(0)
		}))

	/**
	 * Render the content
	 */
	return (
		<section className="Chart">
			<h2 className="chart-title">Site Traffic Overview</h2>
			<div style={{ opacity: props.pageViews ? 1 : 0, transition: '.25s' }}>
				{props.pageViews && (
					<ResponsiveContainer height={415}>
						<AreaChart data={relativeData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
							<CartesianGrid />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Area
								name="Current month page views"
								type="monotone"
								dataKey="views"
								stroke="#2CA5FF"
								strokeWidth="2.5"
								fill="#2CA5FF"
								fillOpacity="0.3"
								dot={{
									stroke: 'white',
									strokeWidth: 2,
									fill: '#2CA5FF',
									opacity: 1,
									r: 5,
									fillOpacity: 1
								}}
							/>
							<Area
								name="Last month page views"
								type="monotone"
								dataKey="lastMonth"
								stroke="lightgray"
								strokeWidth="2.5"
								fill="lightgray"
								fillOpacity="0.3"
								dot={{
									stroke: 'white',
									strokeWidth: 2,
									fill: 'lightgray',
									opacity: 1,
									r: 5,
									fillOpacity: 1
								}}
							/>
						</AreaChart>
					</ResponsiveContainer>
				)}
			</div>
		</section>
	)
}

/**
 * Props interface to Charts Component (for the TypeScript)
 */
export interface Props {
	pageViews: Array<{ month: string; views: number }> | null
}
