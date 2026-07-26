const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <div>
    {props.parts.map((info) => (
      <Part key={info.id} name={info.name} exercises={info.exercises} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Total = (props) => (
  <p>Total of {props.exercises.reduce((acc, cur) => acc + cur, 0)} exercises</p>
);

const Course = (props) => (
  <div>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total exercises={props.course.parts.map((part) => part.exercises)} />
  </div>
);

const Courses = (props) => (
  <div>
    {props.courses.map((item) => (
      <Course key={item.id} course={item} />
    ))}
  </div>
);

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },

    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Courses courses={courses} />;
};

export default App;
