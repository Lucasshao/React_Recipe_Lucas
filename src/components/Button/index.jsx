import React from "react";
import styles from "./index.module.scss";
import { classNameStyled } from "@/utils";

export function Button(props) {
  const { className, ...rest } = props;
  const btnClassName = classNameStyled(className, styles, [
    "btn",
    "btn-primary",
  ]);
  return <span className={btnClassName} {...rest}></span>;
}
