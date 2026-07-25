import { useState } from "react";

const App = () => {
  const [value, setValue] = useState(10);

  const handleClick = () => {
    console.log("clicked the button");
    setValue(value + 1);
  };

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  );
};

export default App;

