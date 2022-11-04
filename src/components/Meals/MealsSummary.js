import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Fresh Coffee, Delivered To You</h2>
      <p>
        Our passion is to deliver a tasty and aroma rich coffee to any
        point in the city by fastes possible way!
      </p>
      <br></br>
      <p>
      Whether you're searching for something new to warm your mug, seeking the best 
      brew method for your favorite blend or exploring our rarest offerings, you’ve come to the right place.
      </p>
    </section>
  );
};

export default MealsSummary;