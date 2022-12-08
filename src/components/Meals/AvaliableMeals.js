import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

import classes from "./AvaliableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvaliableMeals = () => {
  const [menu, setMenu] = useState([]);
  const { isLoading, error, sendRequest: sendMenuRequest } = useHttp();

  useEffect(() => {
    const createMenuList = (menuData) => {
      const loadedMenu = [];

      for (const key in menuData) {
        loadedMenu.push({
          id: key,
          name: menuData[key].name,
          description: menuData[key].description,
          price: menuData[key].price,
        });
      }

      setMenu(loadedMenu);
    };

    sendMenuRequest(
      {
        url: "https://react-food-order-991cc-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      createMenuList
    );
  }, [sendMenuRequest]);

  const spinner = (
    <div className={classes["lds-roller"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  let content;

  if (isLoading) {
    content = spinner;
  };

  if (menu.length > 0) {
    let menuList = (
      <ul>
        {menu.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
      </ul>
    );
    
    content = menuList;
  }

  if (error) {
    const errorText = <div className={classes["error-text"]}>{error}</div>
    content = errorText;
  }

  return (
    <section className={classes.meals}>
      <Card>
        {content}
      </Card>
    </section>
  );
};

export default AvaliableMeals;
