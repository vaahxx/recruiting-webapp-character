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
  const [selectedClass, setSelectedClass] = useState("Barbarian");
  const [currentAttributes, setCurrentAttributes] = useState({});
  const [hasMinimumAttributes, setHasMinimumAttributes] = useState(false);
  const [minimumRequiredStatistics, setMinimumRequiredStatistics] = useState(
    CLASS_LIST.Barbarian
  );

  const handleAttributeValue = (attribute, value) => {
    setCurrentAttributes({ ...currentAttributes, [attribute]: value });
  };

  useEffect(() => {
    const hasMinimumAttribute = (attribute, value) => {
      return value >= CLASS_LIST[selectedClass][attribute];
    };

    const hasAttributes = Object.entries(currentAttributes).length;

    setHasMinimumAttributes(
      hasAttributes &&
        Object.entries(currentAttributes).every(([key, value]) => {
          return hasMinimumAttribute(key, value);
        })
    );
  }, [currentAttributes, hasMinimumAttributes, selectedClass]);

  useEffect(() => {
    setMinimumRequiredStatistics(CLASS_LIST[selectedClass]);
  }, [selectedClass]);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Coding Exercise</h1>
      </header>

      <div
        className={`App-class${
          hasMinimumAttributes ? "--minimum-attributes-complete" : ""
        }`}
      >
        {selectedClass}
      </div>

      <section className='App-class-selector'>
        <select onChange={(e) => setSelectedClass(e.target.value)}>
          {Object.entries(CLASS_LIST).map(([key, value]) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <div className='App-section__minimum-required-statistics'>
          <h4>Minimum required statistics</h4>
          {Object.entries(minimumRequiredStatistics).map(([key, value]) => (
            <span>
              {key}: {value}
            </span>
          ))}
        </div>
      </section>

      <section className='App-section'>
        {ATTRIBUTE_LIST.map((attribute) => (
          <Attribute
            key={attribute}
            attribute={attribute}
            onChange={(attributeValue) =>
              handleAttributeValue(attribute, attributeValue)
            }
          />
        ))}
      </section>
    </div>
  );
}

export default App;
