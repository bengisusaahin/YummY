import React from "react";

const UserContext = React.createContext({
  isManager: true,
  isDataSteward: true,
  isAnalyst: true,
  user_id: "",
  user_name: "",
  user_role: "",
});

export default UserContext;
