import * as React from 'react'

/**
 * Component Chat, will render the Chat and populate with data coming from container.
 * @param props Data from container for create Chat
 */
export class Chat extends React.Component<Props, State> {
	/**
	 * Initial State
	 */
	public state: State = {
		newMessage: ''
	}

	/**
	 * Format chat Messages
	 */
	formatMessage = () =>
		this.props.messages!.map((message, index) => (
			<div
				key={index}
				className="message-container"
				style={{
					flexDirection: message.displayPortraitLeft ? 'row' : 'row-reverse',
					justifyContent: message.displayPortraitLeft ? 'flex-start' : 'space-between'
				}}
			>
				<div className="picture">
					{message.portrait ? <img src={message.portrait} /> : <div className="no-pic" />}
				</div>
				<div
					className="message-text"
					style={{ padding: message.displayPortraitLeft ? '0 0 0 15px' : '0 15px 0 0' }}
				>
					<div className="top">
						<span className="username">{message.userName}</span>
						<span className="time">{message.time}</span>
					</div>
					<div className="message">{message.message}</div>
				</div>
			</div>
		))

	/**
		* Render the content
	 	*/
	render() {
		return (
			<section className="Chat">
				<h2 className="chat-title">
					<i className="fas fa-comments" />Chat
				</h2>
				<div className="chat-messages" style={{ opacity: this.props.messages ? 1 : 0 }}>
					{this.props.messages && this.formatMessage()}
				</div>
				<div className="chat-send">
					<input
						value={this.state.newMessage}
						onKeyDown={e => {
							if (e.which == 13) {
								this.state.newMessage.length > 1 && this.props.send(this.state.newMessage)
								this.setState({ newMessage: '' })
							}
						}}
						onChange={e => this.setState({ newMessage: e.target.value })}
						placeholder="Type your message here..."
					/>
					<button
						onClick={() => {
							this.state.newMessage.length > 1 && this.props.send(this.state.newMessage)
							this.setState({ newMessage: '' })
						}}
					>
						Send
					</button>
				</div>
			</section>
		)
	}
}

/**
 * Props interface to Chat Component (for the TypeScript)
 */
export interface Props {
	messages: Array<{
		userName: string
		portrait: string
		message: string
		displayPortraitLeft: boolean
		time: string
	}> | null
	send: (newMessage: string) => any
}

export interface State {
	newMessage: string
}
