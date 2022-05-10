import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import classes from "./SearchBox.module.css";

const SearchBox = forwardRef((props, ref) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const searchRef = useRef();
  const searchChangeHandler = (e) => {
    searchRef.current.value === "" ? setIsEmpty(true) : setIsEmpty(false);
    props.onSearchValueChanged(e.target.value);
  };

  const CancelHandler = () => {
    searchRef.current.value = "";
    setIsEmpty(true);
    props.onSearchValueChanged("");
  };

  useImperativeHandle(ref, () => ({
    parentCall() {
      CancelHandler();
    },
  }));
  return (
    <div
      className={classes.searchBox}
      style={{
        borderRadius: props.borderRadius,
      }}
    >
      <AiOutlineSearch className={classes.searchIcon} />
      <input
        type="text"
        onKeyDown={props.searchClick}
        className={classes.input}
        placeholder={props.search}
        ref={searchRef}
        onChange={searchChangeHandler}
      ></input>
      {!isEmpty && (
        <MdCancel onClick={CancelHandler} className={classes.cancelIcon} />
      )}
    </div>
  );
});
SearchBox.defaultProps = {
  search: "Search...",
};

export default SearchBox;
