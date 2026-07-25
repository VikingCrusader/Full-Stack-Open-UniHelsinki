import { use } from "react";
import { useState } from "react";
const Title = () => {
  return <h2>give feedback</h2>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatTitle = () => {
  return <h2>statistics</h2>;
};

const Statistics = ({good, neutral, bad, all}) => {

  let avg = (good - bad) / all;
  let positive = (good / all) * 100;
  console.log(avg);

  if (all > 0) {
    return (
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {avg}</p>
        <p>positive {positive} %</p>
      </div>
    );
  } else {
    return (
      <p>No feedback given</p>
    )
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  return (
    <div>
      <Title />
      <Button
        text="good"
        onClick={() => {
          setGood(good + 1);
          setAll(all + 1);
        }}
      />
      <Button
        text="neutral"
        onClick={() => {
          setNeutral(neutral + 1);
          setAll(all + 1);
        }}
      />
      <Button
        text="bad"
        onClick={() => {
          setBad(bad + 1);
          setAll(all + 1);
        }}
      />
      <StatTitle />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
