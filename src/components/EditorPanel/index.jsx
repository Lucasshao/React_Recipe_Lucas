import React from "react";
import styles from "./index.module.scss";
import { Button } from "@/components/Button";
import { RecipeContext } from "@/App";
import { v4 as uuidV4 } from "uuid";

export default function EditorPanel(props) {
  const { id, name, cookTime, servings, instructions, ingredients } =
    props.recipe;

  const { handleRecipeSelect, handleRecipeChange } =
    React.useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(id, { ...props.recipe, ...changes });
  } //先id，然后展开，然后是改变的那项，所以最后那项是后者覆盖前者，就把前面的更新了

  function handleInstructionDelect(index) {
    handleChange({
      instructions: [
        ...instructions.slice(0, index),
        ...instructions.slice(index + 1),
      ],
    });
  }

  function handleIngredientDelete(index) {
    handleChange({
      ingredients: [
        ...ingredients.slice(0, index),
        ...ingredients.slice(index + 1),
      ],
    });
  }

  function handleInstructionAdd() {
    handleChange({ instructions: [...instructions, ""] });
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidV4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...ingredients, newIngredient] });
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["remove"]}>
        <Button onClick={() => handleRecipeSelect(null)}>X</Button>
      </div>
      <div className={styles["sample_panel"]}>
        <div className={styles["panel_item"]}>
          <label htmlFor="editor_name">Name</label>
          <input
            id="editor_name"
            type="text"
            value={name}
            onChange={(e) => handleChange({ name: e.target.value })}
          />
        </div>
        <div className={styles["panel_item"]}>
          <label htmlFor="editor_name">Cook Time</label>
          <input
            id="editor_name"
            type="text"
            value={cookTime}
            onChange={(e) => handleChange({ cookTime: e.target.value })}
          />
        </div>
        <div className={styles["panel_item"]}>
          <label htmlFor="editor_name">Servings</label>
          <input
            id="editor_name"
            type="number"
            value={servings}
            onChange={(e) => handleChange({ servings: +e.target.value })}
          />
        </div>
      </div>

      <div className={styles["instructions_panel"]}>
        <span className={styles["title"]}>Instructions</span>
        {instructions &&
          instructions.map((instruction, index) => {
            const instructionId = `instruction-${index}`;
            return (
              <div key={index} className={styles["panel_item"]}>
                <label htmlFor={instructionId}>{index}: </label>
                <input
                  id={instructionId}
                  type="text"
                  value={instruction}
                  onChange={(e) =>
                    handleChange({
                      instructions: [
                        ...instructions.slice(0, index),
                        e.target.value,
                        ...instructions.slice(index + 1),
                      ],
                    })
                  }
                />
                <Button
                  className="btn-danger"
                  onClick={() => handleInstructionDelect(index)}
                >
                  X
                </Button>
              </div>
            );
          })}
        <div className={styles["add"]}>
          <Button onClick={() => handleInstructionAdd()}>
            Add Instruction
          </Button>
        </div>
      </div>

      <div className={styles["ingredients_panel"]}>
        <span className={styles["title"]}>Ingredients</span>
      </div>

      <div className={styles["ingredients_panel"]}>
        <span className={styles["title"]}>Ingredients</span>
        <div className={styles["title_item"]}>
          <label>Name</label>
          <label>Amount</label>
          <span className={styles["hidden"]}>
            <Button className="btn-danger">X</Button>
          </span>
        </div>
        {ingredients &&
          ingredients.map((ingredient, index) => {
            const ingredientId = `ingredient-${index}`;
            return (
              <div key={index} className={styles["panel_item"]}>
                <input
                  id={ingredientId}
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleChange({
                      ingredients: [
                        ...ingredients.slice(0, index),
                        { ...ingredient, name: e.target.value },
                        ...ingredients.slice(index + 1),
                      ],
                    })
                  }
                />
                <input
                  type="text"
                  value={ingredient.amount}
                  onChange={(e) =>
                    handleChange({
                      ingredients: [
                        ...ingredients.slice(0, index),
                        { ...ingredient, amount: e.target.value },
                        ...ingredients.slice(index + 1),
                      ],
                    })
                  }
                />
                <Button
                  className="btn-danger"
                  onClick={() => handleIngredientDelete(index)}
                >
                  X
                </Button>
              </div>
            );
          })}
        <div className={styles["add"]}>
          <Button onClick={() => handleIngredientAdd()}>Add Ingredient</Button>
        </div>
      </div>
    </div>
  );
}
