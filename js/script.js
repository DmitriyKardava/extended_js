// function makeGETRequest(url) {
//     return new Promise(function(resolve, reject) {
//         var xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
    
//         xhr.onload = function() {
//           if (this.status == 200) {
//             resolve(this.response);
//           } else {
//             var error = new Error(this.statusText);
//             error.code = this.status;
//             reject(error);
//           }
//         };
    
//         xhr.onerror = function() {
//           reject(new Error("Network Error"));
//         };
    
//         xhr.send();
//       });
//     }
const API_URL ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.products = [];
        // this.fetchProducts();
        this.fetchProducts()
            .then(data => {
                this.products = [...data];
                this.render()
            });
    }
    async fetchProducts() {
        // makeGETRequest(`${API_URL}/catalogData.json`).then(
        //     response => {
        //         this.products = JSON.parse(response);
        //         this.render();    
        //     },
        //     error => console.error(error)
        // );
    //}
        try {
            const result = await fetch(`${API_URL}/catalogData.json`);
            return await result.json();
        } catch (error) {
            console.log(error);
        }
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
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = 'https://via.placeholder.com/200x150';
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
    constructor(container = '.cart-block') {
        this.container = container;
        this.items = [];
        this._clickBasket();
    }
    getItem(id) {
        return this.items.find(item => item.id === id);
    }
    addItem(item) {
        if(this.getItem(item.id)) {
                this.getItem(item.id).count++;
        } else {
            if (!item.count) {
                item.count = 1;
            }
            this.items.push(item);
        }
    }

    deleteItem(id) {
        const oldItem = this.getItem(id); 
        if (oldItem){
            if (oldItem.count > 0){
                this.getItem(id).count--;
            }
            else {
                this.items.splice(this.items.indexOf(oldItem),1)
            }
        }
    }

    render() {
        const block = document.querySelector(this.container);
        for (let item of this.items) {
            const productObj = new BasketItem(item);
            block.insertAdjacentHTML('beforeend', productObj.render(item));
        }
    }
    _clickBasket() {
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        console.log('111');
    }
}

class BasketItem {
    render(product) {
        return `<div class="cart-item" data-id="${product.id}">
                <div class="product-bio">
                    <img src="${product.img}" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">${product.name}</p>
                        <p class="product-quantity">Quantity: ${product.count}</p>
                        <p class="product-single-price">$${product.price}</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">$${product.count * product.price}</p>
                    <button class="del-btn" data-id="${product.id}">&times;</button>
                </div>
                </div>`
    }
}

let basket = new Basket();
let list = new ProductsList();

basket.addItem({'id':1,'name':'good', 'price':123, 'img':'https://via.placeholder.com/200x150'});
basket.addItem({'id':1,'name':'good', 'price':123, 'img':'https://via.placeholder.com/200x150'});
basket.addItem({'id':1,'name':'good', 'price':123, 'img':'https://via.placeholder.com/200x150'});
basket.addItem({'id':1,'name':'good', 'price':123, 'img':'https://via.placeholder.com/200x150'});
basket.addItem({'id':1,'name':'good', 'price':123, 'img':'https://via.placeholder.com/200x150'});

basket.deleteItem(1);
// basket.deleteItem(1);

//console.log(basket);
basket.render();

//console.log(list.getSum());

