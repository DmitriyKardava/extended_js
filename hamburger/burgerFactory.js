class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}
class Burger {
    constructor(size, add, topping) {//add - состав
        this.size = new Param(this._select(size));
        this.add = new Param(this._select(add));
        this.toppings = this._getToppings(topping);

    }

    _getToppings(name) {
        let result = [];
        this._selectAll(name).forEach(el => {
            result.push(new Param(el));
        });
        return result;
    }

    _select(name) {
        return document.querySelector(`input[name=${name}]:checked`);
    }

    _selectAll(name) {
        return [...document.querySelectorAll(`input[name=${name}]:checked`)];
    }

    _sumPrice() {
        return (this.toppings.reduce((sum, item) => sum + item.price,
            this.size.price + this.add.price));
    }

    _sumCalories() {
        return (this.toppings.reduce((sum, item) => sum + item.calories,
            this.size.calories + this.add.calories));
    }

    showSum(price, calories) {
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }
}