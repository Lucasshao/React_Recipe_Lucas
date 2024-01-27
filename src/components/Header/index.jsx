import React from "react";
import { Button } from "@/components/Button";
import styles from "./index.module.scss";

export function Header(props) {
  const { header_info, id, editHandler, deleteHandler } = props;
  // console.log("Header:", deleteHandler);
  return (
    <>
      <div className={styles["recipe__header"]}>
        <h3 className={styles["recipe__title"]}>{header_info}</h3>
        <div className={styles["recipe_btn_group"]}>
          <Button onClick={() => editHandler(id)}>Edit</Button>
          <Button onClick={() => deleteHandler(id)} className="btn-danger">
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
