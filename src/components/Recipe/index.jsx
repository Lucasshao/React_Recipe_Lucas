import React from "react";
import styles from "./index.module.scss";

import { RecipeContext } from "@/App";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";

export function Recipe(props) {
  const { id, name, servings, cookTime, instructions, ingredients } = props;

  const editHandler = React.useCallback(
    (id) => {
      console.log("edit", id);
    },
    [id]
  );

  const deleteHandler = React.useCallback(
    (id) => {
      console.log("delete", id);
    },
    [id]
  );

  const { handleRecipeDel, handleRecipeSelect } =
    React.useContext(RecipeContext);

  return (
    <div className={styles["recipe"]}>
      {/* Header */}
      <Header
        header_info={name}
        id={id}
        editHandler={handleRecipeSelect}
        deleteHandler={handleRecipeDel}
      />
      <Panel
        cookTime={cookTime}
        servings={servings}
        instructions={instructions}
        ingredients={ingredients}
      />
    </div>
  );
}

export function RecipeList(props) {
  const { handleRecipeAdd } = React.useContext(RecipeContext);
  const { recipes } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>
        <span>My Recipes</span>
      </div>
      <div>
        {recipes.map((recipe, index) => {
          return <Recipe key={index} {...recipe} />;
        })}
      </div>

      <div className={styles["add"]}>
        <Button onClick={() => handleRecipeAdd()}>Add Recipe</Button>
      </div>
    </div>
  );
}
