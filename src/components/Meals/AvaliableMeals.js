import classes from './AvaliableMeals.module.css';
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Espresso',
      description: 'Our smooth signature Espresso Roast with rich flavor and caramelly sweetness is at the very heart of everything we do.',
      price: 2.99
    },
    {
      id: 'm2',
      name: 'Caffè Americano',
      description: 'Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance.',
      price: 3.49
    },
    {
      id: 'm3',
      name: 'Cappuccino',
      description: 'Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam. An alchemy of barista artistry and craft.',
      price: 4.49
    },
    {
      id: 'm4',
      name: 'Caffè Latte',
      description: 'Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up.',
      price: 4.49
    },
  ];

const AvaliableMeals = () => {
    const mealList = DUMMY_MEALS.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

    return <section className={classes.meals}>
            <Card>
              <ul>{mealList}</ul>  
            </Card>
    </section>
}

export default AvaliableMeals;