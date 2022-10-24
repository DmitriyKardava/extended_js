
const API_URL ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        cartItems: [],
        filtered: [],
        products: [],
    },
    components: {cart, products, search},
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered =  this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        //console.log(this)
    }
})