import React from "react";
import styles from "./style.module.css";

const Block = ({ digit }) => {
  const { block } = styles;
  return <div className={`${block}`}>{digit}</div>;
};

export default Block;
