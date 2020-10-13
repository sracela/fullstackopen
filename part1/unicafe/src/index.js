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

const Statistic = props => <p>{props.statistic.name} {props.statistic.results}</p>

const Statistics = (props) => {
  return(
    <div>
      <Statistic statistic={props.statistics[0]} />
      <Statistic statistic={props.statistics[1]} />
      <Statistic statistic={props.statistics[2]} />
    </div>)
}

const App = () => {
  // save clicks of each button to its own state
  // const [good, setGood] = useState(0)
  // const [neutral, setNeutral] = useState(0)
  // const [bad, setBad] = useState(0)

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
    }
  ])

  const handleGoodClick = () => {
    const newStatistics = [...statistics]
    newStatistics[0].results = statistics[0].results + 1
    setStatistics(newStatistics)
  }
  const handleNeutralClick = () => {
    const newStatistics = [...statistics]
    newStatistics[1].results = statistics[1].results + 1
    setStatistics(newStatistics)
  }
  const handleBadClick = () => {
    const newStatistics = [...statistics]
    newStatistics[2].results = statistics[2].results + 1
    setStatistics(newStatistics)
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
      <Statistics statistics={statistics} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)