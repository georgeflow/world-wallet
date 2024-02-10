import React, { ChangeEvent } from "react";
import "./DropDown.css";
import { useContextHook } from '../Context';

const DropDown: React.FC = () => {
  const { setCurrency } = useContextHook();

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setCurrency(selectedValue);
  };

  return (
    <>
      <div>
        <label>Default currency: </label>
        <select onChange={handleOptionChange}>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
          <option value="GBP">£ GBP</option>
        </select>
      </div>
    </>
  );
}

export default DropDown;
