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

export default Courses;
