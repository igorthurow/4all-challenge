import React from 'react'
import ReactDOM from 'react-dom'
import { Widgets } from './components/Top'
import './styles/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export class App extends React.Component {
  render() {
    return <Widgets />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
