import React from "react";
import styles from "./index.module.scss";

export function Instruction(props) {
  const { instructions } = props;
  return (
    <div className={styles["instruction"]}>
      <div className={styles["instruction_title"]}>Instructions:</div>
      {Array.isArray(instructions) &&
        instructions.map((instruction, index) => (
          // 大括号就要return，小括号就不用
          <span key={index} className={styles["instruction_item"]}>
            {instruction}
          </span>
        ))}
    </div>
  );
}
