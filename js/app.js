class CalorieTracker{
    constructor(){
        this._calorieLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        this._totalCaloriesConsumed();
        this._totalCaloriesBurned();
        this._totalCaloriesRemaining();
        this._displayCaloriesLimit();
        this._displayTotalCalories();
        this._displayProgressBar();

    }

    addMeal(meal){
        this._meals.push(meal)
        this._totalCalories += meal.calories
        this._render();
    }
    addWorkout(workout){
        this._workouts.push(workout)
        this._totalCalories -= workout.calories
        this._render();
    }
    _displayTotalCalories(){
        const totalCaloriesEl = document.getElementById('calories-total')
        totalCaloriesEl.innerHTML = this._totalCalories
    }
    _displayCaloriesLimit(){
        const caloriesTotalEl = document.getElementById('calories-limit')
        caloriesTotalEl.innerHTML = this._calorieLimit
    }
    _totalCaloriesConsumed(){
        const caloriesConsumedEl = document.getElementById('calories-consumed')
        const consumed = this._meals.reduce((total,meal)=>total+meal.calories,0)
        caloriesConsumedEl.innerHTML = consumed;
    }
    _totalCaloriesBurned(){
        const caloriesBurnedEl = document.getElementById('calories-burned')
        const burned = this._workouts.reduce((total,workout)=>total+workout.calories,0)
        caloriesBurnedEl.innerHTML = burned;
    }
    _totalCaloriesRemaining(){
        const totalCaloriesRemainingEl = document.getElementById('calories-remaining')
        const progressBarEl = document.getElementById('calorie-progress')
        const remaining = this._calorieLimit - this._totalCalories
        totalCaloriesRemainingEl.innerHTML = remaining

        if(remaining < 0){
            totalCaloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light')
            totalCaloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger')
            progressBarEl.classList.remove('bg-success')
            progressBarEl.classList.add('bg-danger')
        }
        else{
            totalCaloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger')
            totalCaloriesRemainingEl.parentElement.parentElement.classList.add('bg-light')
            progressBarEl.classList.remove('bg-danger')
            progressBarEl.classList.add('bg-success')
        }
    }
    _displayProgressBar(){
        const progressBarEl = document.getElementById('calorie-progress')
        const percentage = (this._totalCalories / this._calorieLimit) * 100
        const width = Math.min(percentage,100)
        progressBarEl.style.width = `${width}%`
    }
    _render(){
        this._displayTotalCalories();
        this._totalCaloriesConsumed();
        this._totalCaloriesBurned();
        this._totalCaloriesRemaining();
        this._displayProgressBar();
    }
}

class Meal{
    constructor(name,calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}
class Workout{
    constructor(name,calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

const tracker = new CalorieTracker()
const breakfast = new Meal('breakfast',800)
const lunch = new Meal('lunch',100)
const dinner = new Meal('dinner',100)
tracker.addMeal(breakfast)
tracker.addMeal(lunch)
tracker.addMeal(dinner)

const run = new Workout('run',0)
tracker.addWorkout(run)

console.log(tracker._meals)
console.log(tracker._workouts)
