<style>
body {
    background-color: #F4E0B9;
    color: black;
    margin-top: 50px;
}

.head-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-and-button {
    display: flex;
}

.shopping-cart-button {
    margin-left: 10px;
}

.add-to-cart-container {
    margin-left: 5px;
}

.book-container {
    display: flex;
    flex-wrap: wrap;
}

.book-information-container {
    padding: 15px;
    width: 200px;
    display: inline-block;
}

.book-card {
    flex: 0 0 20%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px;
}
</style>
    
<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from "axios";
import { Button, Drawer, InputNumber, InputSearch } from 'ant-design-vue';
import { ShoppingTwoTone, ShoppingCartOutlined } from '@ant-design/icons-vue';
import Icon from '@ant-design/icons-vue/lib/components/Icon';
import { toFixed } from 'ant-design-vue/es/input-number/src/utils/MiniDecimal';

const products = ref([
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 10.99,
        genre: "Fiction",
        publicationYear: 1925,
        language: "English",
        pages: 180,
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 12.50,
        genre: "Fiction",
        publicationYear: 1960,
        language: "English",
        pages: 336,
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        price: 9.80,
        genre: "Science Fiction",
        publicationYear: 1949,
        language: "English",
        pages: 328,
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 8.75,
        genre: "Romance",
        publicationYear: 1813,
        language: "English",
        pages: 432,
    },
    {
        id: 5,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        price: 14.99,
        genre: "Fantasy",
        publicationYear: 1997,
        language: "English",
        pages: 309,
    },
    {
        id: 6,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 11.25,
        genre: "Fantasy",
        publicationYear: 1937,
        language: "English",
        pages: 310,
    },
    {
        id: 7,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 10.00,
        genre: "Fiction",
        publicationYear: 1951,
        language: "English",
        pages: 277,
    },
    {
        id: 8,
        title: "Brave New World",
        author: "Aldous Huxley",
        price: 9.50,
        genre: "Science Fiction",
        publicationYear: 1932,
        language: "English",
        pages: 288,
    },
    {
        id: 9,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        price: 15.75,
        genre: "Fantasy",
        publicationYear: 1954,
        language: "English",
        pages: 398,
    },
]);

// onMounted(async () => {
//   try {
//     const response = await axios.get(
//       "https://www.googleapis.com/books/v1/volumes?q=vue.js"
//     );

//     console.log(response);
//     products.value = response.data.items;
//   } catch (error) {
//     console.error("Error fetching books:", error);
//   }
// });

const cart = ref([]);
const quantity = ref(0);

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

watch(cart, () => {
    totalPrice.value = parseFloat(calculateTotalPrice(),toFixed(2));
});

const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price, 0);
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
        <div class="head-container">
            <h2>List of Books</h2>
            <div class="search-and-button">
                <InputSearch placeholder="Search Books" />
                <div class="shopping-cart-button">
                    <Button type="primary" ghost @click="showDrawer">
                        <ShoppingTwoTone />
                    </Button>
                </div>
            </div>
        </div>

        <div class="book-container">
            <div class="book-card" v-for="product in products" :key="product.id">
                <div class="book-information-container">
                    <h3>{{ product.title }}</h3>
                    <p><i>Genre: </i>{{ product.genre }}</p>
                    <p><i>Price: </i>${{ product.price }}</p>
                </div>

                <div class="add-to-cart-container">
                    <Button type="primary" danger @click="addToCart(product)">
                        Add To Cart
                        <ShoppingCartOutlined />
                    </Button>
                </div>
            </div>
            <Drawer v-model:visible="open" class="custom-class" title="Shopping Cart" placement="right"
                @close="closeDrawer">
                <div class="cart">
                    <div v-for="item in cart" :key="item.id">
                        <h3>{{ item.title }}</h3>
                        <p>Genre: {{ item.genre }}</p>
                        <p>Price: {{ item.price }}</p>
                        <Button type="primary" danger ghost @click="removeFromCart(item)">Remove</Button>
                    </div>
                </div>
                <h2 v-if="cart.length > 0">Total Cost: ${{ calculateTotalPrice(cart) }}</h2>
                <h2 v-else>No items :(</h2>
            </Drawer>
        </div>
    </div>
</template>
    