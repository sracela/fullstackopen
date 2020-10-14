import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const totalNumber = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    // const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
    return(
      <p>Number of exercises {totalNumber}</p>
    ) 
  }
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
      {course.parts.map((part) => <Part key={part.id} part={part} />)}
        {/* <Part part={course.parts[0]} />
        <Part part={course.parts[1]} />
        <Part part={course.parts[2]} /> */}
      </div>
    )
  }

  const Course = ({ course }) => {  
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
}

export default Course