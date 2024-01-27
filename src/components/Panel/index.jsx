import React from "react";
import styles from "./index.module.scss";
import { Instruction } from "@/components/Instruction";
import { Ingredient } from "@/components/Ingredient";

export function Panel(props) {
  const { cookTime, servings, instructions, ingredients } = props;
  return (
    <div className={styles["panel"]}>
      <div>
        <span className={styles["title"]}>Cook Time: </span>
        <span>{cookTime}</span>
      </div>

      <div>
        <span className={styles["title"]}>Servings: </span>
        <span>{servings}</span>
      </div>
      {/* Instructions:  */}
      <Instruction instructions={instructions} />
      {/* Ingredients: 这里是数据里面叫instructions在App里的，是list->recipe->panel传过来的。然后区别大写的Instruction组键*/}
      <Ingredient ingredients={ingredients} />
    </div>
  );
}
