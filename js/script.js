const goods = [
    { title: 'Shirt', price: 150, img: 'https://via.placeholder.com/200x150' },
    { title: 'Socks', price: 50, img: 'https://via.placeholder.com/200x150' },
    { title: 'Jacket', price: 350, img: 'https://via.placeholder.com/200x150' },
    { title: 'Shoes', price: 250, img: 'https://via.placeholder.com/200x150' },
    ];
    
const renderProductItem = (item) => {
    return `<div class="product-item">
                <img src="${item.img}">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <btn class="btn-buy">В корзину</btn>
            </div>`;
    };
const renderProductList = (list) => {
    document.querySelector('.products').innerHTML = 
        list.map(item => renderProductItem(item)).join('');
    }
renderProductList(goods);
