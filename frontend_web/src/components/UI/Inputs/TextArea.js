import React, { Fragment } from "react";

const TextArea = (props) => {
  return (
    <Fragment>
      <div className={props.cLabel}>{props.labelName}</div>
      <textarea
        className={props.cArea}
        type="text-area"
        placeholder="Lorem Ipsum"
      />
    </Fragment>
  );
};

export default TextArea;
