import React, { useRef } from "react";

const Select = (props) => {
  const selectRef = useRef();
  const selectChangeHandler = () => {
    if (props.onChange !== undefined) {
      props.onChange();
    }
    if (props.selectChangeHandler !== undefined) {
      props.selectChangeHandler(selectRef.current.value);
    }
  };
  return (
    <div onClick={props.onClick}>
      <select
        className={props.cSelect}
        onChange={selectChangeHandler}
        ref={selectRef}
      >
        <option defaultValue="-1"> {props.dValue} </option>
        {props.data.map((value, i) =>
          props.dValue !== value ? (
            <option value={value} key={i}>
              {value}
            </option>
          ) : null
        )}
      </select>
    </div>
  );
};
export default Select;
