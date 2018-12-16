import React from 'react'
import ReactDOM from 'react-dom'
import { Widgets } from './components/Widgets'
import './styles/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export class App extends React.Component<{}, State> {
	/**
	 * Initial State
	 */
	public state: State = {
		widgets: null,
		chart: null,
		messages: null
	}

	componentWillMount() {
		/**
		 * Function to get Data from API endpoint.
		 * @param url Endpoint from API
		 */
		const getData = (url: string) => fetch(url).then(response => response.json().then(response => response))

		/**
		 * Get all API Data and set to respective state.
		 */
		Promise.all([
			getData('http://dev.4all.com:3050/widgets'),
			getData('http://dev.4all.com:3050/pageViews'),
			getData('http://dev.4all.com:3050/messages')
		]).then(responses =>
			this.setState({
				widgets: responses[0],
				chart: responses[1],
				messages: responses[2]
			})
		)
	}

	/**
	 * Render the components and if necessary, pass the props for him.
	 */
	render() {
		return (
			<div className="container-fluid">
				<Widgets />
			</div>
		)
	}
}

/**
 * State interface to App (for the TypeScript)
 */
export interface State {
	widgets: {
		newOrders: number
		comments: number
		newUsers: number
		pageViews: number
	} | null
	chart: Array<{
		mouth: string
		views: number
	}> | null
	messages: Array<{
		userName: string
		portrait: string
		message: string
		displayPortraitLeft: boolean
		time: string
	}> | null
}

/**
 * Render App into `root` html id
 */
ReactDOM.render(<App />, document.getElementById('root'))
