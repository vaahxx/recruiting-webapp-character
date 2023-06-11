import { useState, useEffect, Suspense, useLayoutEffect } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

const API_URL =
  "https://recruiting.verylongdomaintotestwith.ca/api/{vaahxx}/character";

function calculateAttributeModifier(value) {
  return Math.floor((value - 10) / 2);
}

function Attribute({ attribute, modifier, attributeValue, onChange }) {
  const [value, setValue] = useState(attributeValue);
  const [attributeModifier, setAttributeModifier] = useState(
    modifier ? modifier : calculateAttributeModifier(value)
  );

  useEffect(() => {
    setValue(attributeValue);
  }, [attributeValue]);

  const handleIncrement = (e) => {
    setValue((value) => value + 1);
  };

  const handleDecrement = (e) => {
    setValue((value) => (value < 0 ? 0 : value - 1));
  };

  useEffect(() => {
    setAttributeModifier(calculateAttributeModifier(value));
  }, [value]);

  useEffect(() => {
    onChange?.({
      attribute: value,
      modifier: attributeModifier,
    });
  }, [value, attributeModifier]);

  return (
    <div className='attribute'>
      <h2>
        {attribute} → modifier: {attributeModifier}
      </h2>
      <div className='attribute__value'>
        Value:
        <button onClick={handleDecrement}>-</button>
        {value}
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}

function App() {
  const [selectedClass, setSelectedClass] = useState("Barbarian");
  const [currentAttributes, setCurrentAttributes] = useState({});
  const [hasMinimumAttributes, setHasMinimumAttributes] = useState(false);
  const [minimumRequiredStatistics, setMinimumRequiredStatistics] = useState(
    CLASS_LIST.Barbarian
  );
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState({
    class: CLASS_LIST.Barbarian,
    attributes: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
  });

  const handleAttributeValue = ({
    attribute,
    attributeValue,
    attributeModifier,
  }) => {
    setCurrentAttributes({
      ...currentAttributes,
      [attribute]: {
        value: attributeValue,
        modifier: attributeModifier,
      },
    });

    setCharacter({
      class: selectedClass,
      attributes: {
        ...character.attributes,
        [attribute]: {
          value: attributeValue,
          modifier: attributeModifier,
        },
      },
    });
  };

  useEffect(() => {
    const hasMinimumAttribute = (attribute, value) => {
      return value >= CLASS_LIST[selectedClass][attribute];
    };

    const hasAttributes = Object.entries(currentAttributes).length;

    setHasMinimumAttributes(
      hasAttributes &&
        Object.entries(currentAttributes).every(([key, { value }]) => {
          return hasMinimumAttribute(key, value);
        })
    );
  }, [currentAttributes, hasMinimumAttributes, selectedClass]);

  useEffect(() => {
    setMinimumRequiredStatistics(CLASS_LIST[selectedClass]);
  }, [selectedClass]);

  useLayoutEffect(() => {
    setIsLoading(true);
    const fetchCharacter = async () => {
      try {
        const result = await fetch(API_URL);

        const data = await result.json();

        if (!data.body) {
          return;
        }

        setCharacter(data.body);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, []);

  const saveCharacter = async () => {
    const result = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    });

    await result.json();

    alert("Character saved!");
  };

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
            <span key={key}>
              {key}: {value}
            </span>
          ))}
        </div>
      </section>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className='App-section'>
          {ATTRIBUTE_LIST.map((attribute) => (
            <Attribute
              key={attribute}
              attribute={attribute}
              attributeValue={character.attributes[attribute].value || 0}
              modifier={character.attributes[attribute].modifier || 0}
              onChange={({
                attribute: attributeValue,
                modifier: attributeModifier,
              }) =>
                handleAttributeValue({
                  attribute,
                  attributeValue,
                  attributeModifier,
                })
              }
            />
          ))}
        </section>
      )}

      <button onClick={saveCharacter}>Save</button>
    </div>
  );
}

export default App;
