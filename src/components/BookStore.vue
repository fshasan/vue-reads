<style>
body {
    background-color: #F4E0B9;
    color: black;
    margin-top: 50px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.head-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
    justify-content: space-between;
}


.book-card {
    width: calc(50% - 10px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.book-card img {
    object-fit: cover;
}

.book-information-container {
    flex: 1;
}

.book-card {
    flex: 0 0 20%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px;
}
</style>
    
<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { Button, Drawer, InputSearch, Switch } from 'ant-design-vue';
import { ShoppingTwoTone, ShoppingCartOutlined, BulbFilled, MonitorOutlined, StarOutlined } from '@ant-design/icons-vue';
import Icon from '@ant-design/icons-vue/lib/components/Icon';

type Product = {
    id: string,
    image: string,
    title: string,
    author: string,
    price: number,
    genre: string,
    publicationYear: number,
    language: string,
    pages: number,
}

const products = ref<Product[]>([]);

products.value = [
    {
        title: "The Great Gatsby",
        id: 1,
        image: "src/assets/images/the-great-gatsby.jpg",
        author: "F. Scott Fitzgerald",
        price: 10.99,
        genre: "Fiction",
        publicationYear: 1925,
        language: "English",
        pages: 180,
    },
    {
        title: "The Great Gatsby",
        id: 2,
        image: "src/assets/images/To_Kill_a_Mockingbird.jpg",
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
        image: "src/assets/images/1984.jpg",
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
        image: "src/assets/images/pride-and-prejudice.jpg",
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
        image: "src/assets/images/harry_potter_and_the_sorcerer's_stone.jpg",
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
        image: "src/assets/images/the_hobbit.jpg",
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
        image: "src/assets/images/The_Catcher_in_the_Rye.jpg",
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
        image: "src/assets/images/BraveNewWorld_FirstEdition.jpg",
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
        image: "src/assets/images/LOR.jpg",
        title: "The Lord of the Rings: The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        price: 15.75,
        genre: "Fantasy",
        publicationYear: 1954,
        language: "English",
        pages: 398,
    },
]

const cart = ref<Product[]>([]);

const totalPrice = ref<string>('0');

const isDarkMode = ref<boolean>(false);

const toggleSwitch = () => {
    isDarkMode.value = !isDarkMode.value;
};

const addToCart = (product: Product): void => {

    if (!cart.value.some((item: Product) => item.id === product.id)) {
        cart.value.push(product);
    }
};

const removeFromCart = (item: Product) => {
    const index = cart.value.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
        cart.value.splice(index, 1);
    }
};

const calculateTotalPrice = (cart: Product[]): number => {
    return cart.reduce((total: number, item: Product) => total + item.price, 0);
};

watch(cart, () => {
    totalPrice.value = calculateTotalPrice(cart.value).toFixed(2);
});

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
            <StarOutlined v-if="isDarkMode" />
            <BulbFilled v-else />
            <Switch :checked="isDarkMode" @change="toggleSwitch" />
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
                <img :alt="product.id" :src="product.image" width="150" height="150" />
                <div class="book-information-container">
                    <h3>{{ product.title }}</h3>
                    <p><i>Genre: </i>{{ product.author }}</p>
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
    