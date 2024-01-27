import React from "react";
import { v4 as uuidV4 } from "uuid";
import { RecipeList } from "@/components/Recipe";
import EditorPanel from "./components/EditorPanel";

export const RecipeContext = React.createContext(); //抛出一个centext，实现不同功能，不然要一步一步传
export const StateContext = React.createContext(); //把两个包裹到一块了
const LOCAL_STORAGE_KEY = "topcoderfullstack.recipes";
const sampleRecipes = [
  {
    id: uuidV4(),
    name: "Plain Chicken",
    servings: 3,
    cookTime: "2:45",
    instructions: ["Put salt on Chicken", "Put chicken in oven", "Eat chicken"],
    ingredients: [
      {
        id: uuidV4(),
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: uuidV4(),
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: uuidV4(),
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: ["Put paprika on Pork", "Put pork in oven", "Eat pork"],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds",
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
  {
    id: uuidV4(),
    name: "Plain Apple Pai",
    servings: 10,
    cookTime: "3:45",
    instructions: ["Put apples in pie", "Put pie in oven", "Eat pie"],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds",
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
];

export default function App() {
  // const [recipes, setRecipes] = React.useState(sampleRecipes); //这里sample里面的state变了才能让功能生效。
  // 开始的时候用它，第二次就不能用它了因为要存到local section里
  const [recipes, setRecipes] = React.useState(() => {
    const recipeJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJson) return JSON.parse(recipeJson);
    return sampleRecipes;
  }); //可以把localStroage做成一个函数，如果没拿着，就返回sampleRecipes

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]); //当这个东西跑起来，就不用get，用set存进去。参考项是recipes做出改变时

  const [selectedRecipeId, setSelectRecipeId] = React.useState();

  const selectRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId);

  function handleRecipeDel(id) {
    setRecipes(recipes.filter((recipes) => recipes.id !== id));
    // 1，做成handle因为是触发形式，而不是副作用；2，需要id导航，把对应那一项清掉；3，用filter遍历，找id是不是不等于，不等于就能留下来，相等就会被干掉，而且filter好处会返回一个全新的数组，新的list，添回到recipe里。

    // recipes.forEach((recipe, index) => {
    //   if (recipe.id === id) {
    //     recipes.splice(index, 1);
    //   }
    // }); 这里是找到id那项，把其去掉，还是原来的那个壳，会导致这东西实际上不能更新，React就会认为sampleRecipes没有变，这样就会无法更新，除非做一个新的壳。
  }

  function handleRecipeSelect(id) {
    setSelectRecipeId(id); //有没有取决于这个id，如果id没有了就是‘关闭’了，所以可以把id变成null或undefined
  }

  function handleRecipeAdd() {
    //加的id要这个function创造
    const newRecipe = {
      id: uuidV4(),
      name: "New Recipe",
      servings: 0,
      cookTime: "",
      instructions: [""],
      ingredients: [
        {
          id: uuidV4(),
          name: "",
          amount: "",
        },
        {
          id: uuidV4(),
          name: "",
          amount: "",
        },
      ],
    };
    setRecipes([...recipes, newRecipe]);
    //先造一个壳，把原来的放进去，然后把new的添加到后面
  }

  function handleRecipeChange(id, recipe) {
    //最好是整体传输
    const newRecipes = [...recipes]; //1，copy recipes 重新创造一个壳，这里是必须的，如果你不做copy，react不会认为是一个修改的
    const index = newRecipes.findIndex((r) => r.id === id); //2, find index of recipe 找id，匹配
    newRecipes[index] = recipe; //3， replace recipe 用新的换掉旧的
    setRecipes(newRecipes); //4，set recipes 重新渲染
  }

  const recipeContextValue = {
    handleRecipeDel,
    handleRecipeAdd,
    handleRecipeSelect,
    handleRecipeChange,
  };

  // const stateContextValue ={
  //   recipes,
  //   setRecipes
  // }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectRecipe && <EditorPanel recipe={selectRecipe} />}
    </RecipeContext.Provider>
  );
}
