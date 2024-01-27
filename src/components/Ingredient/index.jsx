import React from "react";
import styles from "./index.module.scss";

// export function Ingredient(props) {
//   const { ingredients } = props;
//   return (
//     <div className={styles["ingredient"]}>
//       <span className={styles["ingredient_title"]}>Ingredients:</span>
//       {Array.isArray(ingredients) &&
//         ingredients.map((info, index) => (
//           <div className={styles["ingredient_item"]}>
//             <span className={styles["ingredient_name"]}>{info.name}</span>
//             <span className={styles["ingredient_amount"]}>{info.amount}</span>
//           </div>
//         ))}
//     </div>
//   );
// }

export function Ingredient(props) {
  const { ingredients } = props;
  return (
    <div className={styles["ingredient"]}>
      <span className={styles["ingredient_title"]}>Ingredients:</span>
      <div className={styles["ingredient_grid_item"]}>
        {Array.isArray(ingredients) &&
          ingredients.map((info, index) => (
            <React.Fragment key={index}>
              {/* 用grid就是不要外面item那层，把子都暴漏出来，才能形成grid。 
                  然后如果用div，grid就不起作用。需要用到Fragment，其自带key，就不会报错*/}
              <span className={styles["ingredient_name"]}>{info.name}</span>
              <span className={styles["ingredient_amount"]}>{info.amount}</span>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
