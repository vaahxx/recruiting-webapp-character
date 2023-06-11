import { useState, useEffect } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

export const Attribute = ({ attribute, onChange }) => {
  const [value, setValue] = useState(0);

  const handleIncrement = (e) => {
    setValue((value) => value + 1);
  };

  const handleDecrement = (e) => {
    setValue((value) => (value < 0 ? 0 : value - 1));
  };

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <div className='attribute'>
      <h2>{attribute}</h2>
      <div className='attribute__value'>
        Value:
        <button onClick={handleDecrement}>-</button>
        {value}
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Coding Exercise</h1>
      </header>
      <section className='App-section'>
        {ATTRIBUTE_LIST.map((attribute) => (
          <Attribute key={attribute} attribute={attribute} />
        ))}
      </section>
    </div>
  );
}

export default App;
