<style>
body {
    background-color: #F4E0B9;
    color: black;
}

.container {
    display: flex;
}

.products {
    flex: 1;
}

.cart {
    flex: 1;
}

.product-container {
    display: flex;
    flex-wrap: wrap;
}

.product-card {
    flex: 0 0 25%;
    /* Adjust the percentage as per your preference */
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px;
}
</style>
  
<script setup>
import { ref, watch } from 'vue';
import { Button, Drawer } from 'ant-design-vue';

const products = ref([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 15 },
    { id: 3, name: 'Product 3', price: 20 },
]);

const cart = ref([]);

const totalPrice = ref(0);

const addToCart = (product) => {

    if (!cart.value.some(item => item.id === product.id)) {
        cart.value.push(product);
    }
};

const removeFromCart = (item) => {
    const index = cart.value.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
        cart.value.splice(index, 1);
    }
};

// Calculate total price whenever the product list changes
watch(cart, () => {
  totalPrice.value = calculateTotalPrice();
});

const calculateTotalPrice = () => {
  return cart.value.reduce((total, item) => total + item.price, 0);
};

const open = ref(false);

const showDrawer = () => {
    open.value = true;
};

const closeDrawer = () => {
    open.value = false;
};

</script>

<template>
    <div>
        <h2>Products</h2>
        <div class="product-container">
            <div class="product-card" v-for="product in products" :key="product.id">
                <h3>{{ product.name }}</h3>
                <p>Price: {{ product.price }}</p>
                <button @click="addToCart(product)">Add to Cart</button>
            </div>

            <Button type="primary" @click="showDrawer">Show Cart</Button>
            <Drawer v-model:visible="open" class="custom-class" title="Shopping Cart" placement="right" @close="closeDrawer">
                <div class="cart">
                    <h2>List of Items</h2>
                    <div v-for="item in cart" :key="item.id">
                        <h3>{{ item.name }}</h3>
                        <p>Price: {{ item.price }}</p>
                        <button @click="removeFromCart(item)">Remove</button>
                    </div>
                </div>
                <h3>Total Cost: {{ totalPrice }} </h3>
            </Drawer>

        </div>
    </div>
</template>
  