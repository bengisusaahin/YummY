import React from "react";
import Card from "../../../components/UI/Card/Card";
import { MdOutlineManageAccounts, MdManageSearch } from "react-icons/md";
import NavigationCardContent from "../../../components/UI/NavigationCard/NavigationCard";

const Swoc = () => {
  const adminLink = "swoc/Admin";
  const logbookLink = "swoc/Logbook";

  return (
    <div className={classes.box}>
      <NavigationCardContent
        cardIcon={<MdOutlineManageAccounts />}
        navLink={adminLink}
        index={1}
      ></NavigationCardContent>

      <NavigationCardContent
        cardIcon={<MdOutlineManageAccounts />}
        navLink={logbookLink}
        index={1}
      ></NavigationCardContent>
    </div>
  );
};
export default Swoc;
