import { createStore } from 'vuex';

const store = createStore({
  state: {
    cart: [],
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart;
    },
    addToCart(state, product) {
      const cartItem = {
        id: product.id,
        title: product.title,
        basePrice: product.price,
        quantitativePrice: product.price,
        quantity: 1,
      };
      state.cart.push(cartItem);
    },
    removeFromCart(state, item) {
      const index = state.cart.findIndex(cartItem => cartItem.id === item.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    increaseQuantity(state, item) {
      item.quantity++;
      item.quantitativePrice += item.basePrice;
    },
    decreaseQuantity(state, item) {
      if (item.quantity > 1) {
        item.quantity--;
        item.quantitativePrice -= item.basePrice;
      }
    },
  },
  getters: {
    cartTotalPrice: state => {
      return state.cart.reduce((accumulator, item) => accumulator + item.quantitativePrice, 0);
    },
  },
});

export default store;