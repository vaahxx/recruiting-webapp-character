import { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";
import {
  defaultCharacter,
  hasMinimumAttribute,
  mountDefaultCharacters,
} from "./utils";
import { Attribute } from "./Attribute";

const API_URL =
  "https://recruiting.verylongdomaintotestwith.ca/api/{vaahxx}/character";

function App() {
  const [selectedClass, setSelectedClass] = useState("Barbarian");
  const [hasMinimumAttributes, setHasMinimumAttributes] = useState(false);
  const [minimumRequiredStatistics, setMinimumRequiredStatistics] = useState(
    CLASS_LIST.Barbarian
  );
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState(mountDefaultCharacters());
  const [character, setCharacter] = useState(defaultCharacter);

  const handleAttributeValue = ({
    attribute,
    attributeValue,
    attributeModifier,
  }) => {
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

    setCharacters(
      characters.map((character) => {
        if (character.class === selectedClass) {
          return {
            ...character,
            attributes: {
              ...character.attributes,
              [attribute]: {
                value: attributeValue,
                modifier: attributeModifier,
              },
            },
          };
        }
        return character;
      })
    );
  };

  useEffect(() => {
    const selectedCharacter = characters.find(
      (character) => character.class === selectedClass
    );

    setCharacter(selectedCharacter);
  }, [characters]);

  useEffect(() => {
    const attributeEntries = Object.entries(character.attributes);
    setHasMinimumAttributes(
      attributeEntries.every(([key, { value }]) => {
        return hasMinimumAttribute(key, value, selectedClass);
      })
    );
  }, [hasMinimumAttributes, selectedClass, character]);

  useEffect(() => {
    setMinimumRequiredStatistics(CLASS_LIST[selectedClass]);
    const savedCharacter = characters.find(
      (character) => character.class === selectedClass
    );
    setCharacter({
      class: selectedClass,
      ...savedCharacter,
    });
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

        setCharacters(data.body);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, []);

  const saveCharacter = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characters),
      });
      alert("Saved successfully");
    } catch (error) {
      alert("Something happened! :(");
    }
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
