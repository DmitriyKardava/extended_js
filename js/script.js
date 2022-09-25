class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.products = [];
        this._fillProducts();
    }
    _fillProducts() {
        this.products = [
            {
                id: 1, title: 'Shirt', price: 150,
                img: 'https://via.placeholder.com/200x150'
            },
            {
                id: 2, title: 'Socks', price: 50,
                img: 'https://via.placeholder.com/200x150'
            },
            {
                id: 3, title: 'Jacket', price: 350,
                img: 'https://via.placeholder.com/200x150'
            },
            {
                id: 4, title: 'Shoes', price: 250,
                img: 'https://via.placeholder.com/200x150'
            },
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        this.products.forEach(product => {
            block.insertAdjacentHTML('beforeend',
                new ProductItem(product).render());
        });
    }
    getSum() {
        return (this.products.reduce((sum, item) => sum + item.price, 0));
    }
}

class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
        <img src="${this.img}" alt="Product img">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <btn class="btn-buy">В корзину</btn>
    </div>`;
    }
}

class Basket {
    addItem() {

    }
    deleteItem() {

    }
    changeItem() {

    }
    render() {

    }
}

class BasketItem {
    render() {

    }
}

let list = new ProductsList();
list.render();
console.log(list.getSum());

