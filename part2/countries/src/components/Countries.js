import React, { useState } from 'react';
import Country from './Country';
import Weather from './Weather';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.show ? 'hide' : 'show' }
  </button>
)

const Countries = ({ countriesToShow }) => {
    const [show, setShow] = useState(new Array(countriesToShow.length).fill(false))

    const setToShow = (selected) => {
      const copyShow = [...show]
      copyShow[selected] = !show[selected]
      setShow(copyShow)
    }
    
    return (
      <div>
      {countriesToShow.map((country, index) => {
        return (
          <div key={country.name}>
            <Country show={show[index]} country={country} />
            <Weather show={show[index]} capital={country.capital} />
            <Button show={show[index]} handleClick={() => setToShow(index)} />
          </div>
        )
      }
      )}
      </div>
    )
}

export default Countries