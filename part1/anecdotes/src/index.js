import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.text}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = props => <p>{props.text} <br /> has {props.votes} votes</p>

const BestAnecdote = ({ clicked, text, votes}) => {
  if(clicked){
    return(
      <div>
        <Header text="Anecdote with most votes" />
        <Anecdote text={text} votes={votes} />
      </div>)
  } else {
    return <Header text="No votes for now" />
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [best, setBest] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [points, setPoints] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))

  const handleNextAnecdoteClick = () => {
    const random = Math.floor((Math.random() * props.anecdotes.length))
    setSelected(random)
  }

  const handleVoteClick = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
    setClicked(true)
    setBest(copyPoints.indexOf(Math.max(...copyPoints)))
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={props.anecdotes[selected]} votes={points[selected]} />
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={handleNextAnecdoteClick} text="next anecdote" />
      <BestAnecdote clicked={clicked} text={props.anecdotes[best]} votes={points[best]} />
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)