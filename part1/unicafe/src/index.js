import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.text}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const Buttons = ({ handlers, statistics }) => {
  return(
    <div>
      <Button onClick={handlers[0]} text={statistics[0].name} />
      <Button onClick={handlers[1]} text={statistics[1].name} />
      <Button onClick={handlers[2]} text={statistics[2].name} />
    </div>
  )
}

const Statistic = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = (props) => {
  if (props.clicked) {
  return(
    <div>
      <table>
      <tbody>
        <Statistic text={props.statistics[0].name} value={props.statistics[0].results} />
        <Statistic text={props.statistics[1].name} value={props.statistics[1].results} />
        <Statistic text={props.statistics[2].name} value={props.statistics[2].results} />
        <Statistic text={props.metrics[0].name} value={props.metrics[0].results} />
        <Statistic text={props.metrics[1].name} value={props.metrics[1].results} />
        <Statistic text={props.metrics[2].name} value={props.metrics[2].results} />
      </tbody>
    </table>
    </div>
    )} else{
    return <p>No feedback given</p>
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [clicked, setClicked] = useState(false)
  const [statistics, setStatistics] = useState([
    {
      name: 'good',
      results: 0
    },
    {
      name: 'neutral',
      results: 0
    },
    {
      name: 'bad',
      results: 0
    },
  ])
  const metrics = [
    {
      name: 'all',
      results: statistics[0].results + statistics[1].results + statistics[2].results
    },
    {
      name: 'average',
      results: (statistics[0].results - statistics[2].results) / (statistics[0].results + statistics[1].results + statistics[2].results)
    },
    {
      name: 'positive',
      results: '' + statistics[0].results / (statistics[0].results + statistics[1].results + statistics[2].results) * 100 + ' %'
    }
  ]

  const handleGoodClick = () => {
    const newStatistics = [...statistics]
    newStatistics[0].results = statistics[0].results + 1
    setStatistics(newStatistics)
    setClicked(true)
  }
  const handleNeutralClick = () => {
    const newStatistics = [...statistics]
    newStatistics[1].results = statistics[1].results + 1
    setStatistics(newStatistics)
    setClicked(true)
  }
  const handleBadClick = () => {
    const newStatistics = [...statistics]
    newStatistics[2].results = statistics[2].results + 1
    setStatistics(newStatistics)
    setClicked(true)
  }

  const handlers = [
    handleGoodClick,
    handleNeutralClick,
    handleBadClick
  ]


  return (
    <div>
      <Header text="give feedback" />
      <Buttons handlers={handlers} statistics={statistics} />
      <Header text="statistics" />
      <Statistics statistics={statistics} metrics={metrics} clicked={clicked}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)