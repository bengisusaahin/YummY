import React from "react";
import Card from "../Card/Card";
import classes from "./NavigationCard.module.css";
import { useNavigate } from "react-router-dom";

const NavigationCardContent = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <Card
        onClick={() => navigate(`/${props.navLink}`.toLowerCase())}
        cName={classes.cardContainer}
      >
        <div className={classes.container}>
          <div className={classes.image}>{props.cardIcon}</div>
          <div className={classes.text}>
            <p>
              {props.navLink.slice(props.navLink.indexOf("/") + props.index)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NavigationCardContent;
