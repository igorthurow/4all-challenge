import React from 'react'
import ReactDOM from 'react-dom'
import { Widgets } from './components/Widgets'
import { Chart } from './components/Charts'
import './styles/css/index.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import { Chat } from './components/Chat'

export class App extends React.Component<{}, AppState> {
	/**
	 * Initial State
	 */
	public state: AppState = {
		widgets: null,
		chart: null,
		messages: null,
		newMessage: []
	}

	public API = 'http://dev.4all.com:3050'
	componentWillMount() {
		/**
		 * Endpoint from API
		 */

		/**
		 * Function to get Data from API endpoint.
		 * @param url Endpoint from API
		 */
		const getData = (url: string) => fetch(url).then(response => response.json().then(response => response))

		/**
		 * Get all Endpoint Data and set to respective state.
		 */
		Promise.all([
			getData(`${this.API}/widgets`),
			getData(`${this.API}/pageViews`),
			getData(`${this.API}/messages`)
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
			<div className="App container-fluid">
				<h1 className="title">Dashboard</h1>
				<Widgets cards={this.state.widgets} />
				<Chart pageViews={this.state.chart} />
				<Chat
					send={newMessage => {
						this.setState(
							{
								newMessage: this.state.newMessage.concat([
									{
										message: newMessage,
										displayPortraitLeft: true,
										portrait: '',
										time: '1 min ago',
										userName: 'Eu'
									}
								])
							},
							() =>
								fetch(`${this.API}/messages`, {
									method: 'POST',
									headers: {
										Accept: 'application/json',
										'Content-Type': 'application/json'
									},
									body: JSON.stringify(newMessage)
								})
						)
					}}
					messages={
						this.state.newMessage ? (
							this.state.messages && this.state.messages.concat(this.state.newMessage)
						) : (
							this.state.messages
						)
					}
				/>
			</div>
		)
	}
}

/**
 * State interface to App (for the TypeScript)
 */
export interface AppState {
	widgets: {
		newOrders: number
		comments: number
		newUsers: number
		pageViews: number
	} | null
	chart: Array<{
		month: string
		views: number
	}> | null
	messages: Array<{
		userName: string
		portrait: string
		message: string
		displayPortraitLeft: boolean
		time: string
	}> | null
	newMessage: Array<{
		userName: string
		portrait: string
		message: string
		displayPortraitLeft: boolean
		time: string
	}>
}

/**
 * Render App into `root` html id
 */
ReactDOM.render(<App />, document.getElementById('root'))
