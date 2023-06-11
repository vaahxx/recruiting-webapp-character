import { useEffect, useState } from "react";
import { calculateAttributeModifier } from "../utils";

export function Attribute({ attribute, modifier, attributeValue, onChange }) {
  const [value, setValue] = useState(attributeValue);
  const [attributeModifier, setAttributeModifier] = useState(
    modifier ? modifier : calculateAttributeModifier(value)
  );

  useEffect(() => {
    setValue(attributeValue);
  }, [attributeValue]);

  const handleIncrement = () => {
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
