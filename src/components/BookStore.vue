<style>
body {
    background-color: #F6EFE4;
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
    width: calc(33.33% - 20px);
    margin: 10px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.book-card img {
    object-fit: cover;
}

.book-card img,
.book-information-container {
    display: block;
    width: 100%;
}

.book-information-container h3 {
    margin: 10px 0;
    font-size: 18px;
}

.book-information-container p {
    margin: 5px 0;
    font-size: 14px;
}

.total-cost-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

@media screen and (max-width: 768px) {
    .book-card {
        width: calc(50% - 20px);
    }
}

@media screen and (max-width: 480px) {
    .book-card {
        width: 100%;
    }
}
</style>
    
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Button, Drawer, Input, Switch, Card } from 'ant-design-vue';
import { ShoppingTwoTone, ShoppingCartOutlined, BulbFilled, StarOutlined, PlusCircleOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons-vue';

type Product = {
    id: number,
    image: string,
    title: string,
    author: string,
    price: number,
    genre: string,
    publicationYear: number,
    language: string,
    pages: number,
}
type Cart = {
    id: number,
    title: string,
    basePrice: number,
    quantitativePrice: number,
    quantity: number,
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

const cart = ref<Cart[]>([]);

const totalPrice = ref<string>('0');

const isDarkMode = ref<boolean>(false);

const toggleSwitch = () => {
    isDarkMode.value = !isDarkMode.value;
};

const searchQuery = ref<string>('');

const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (query === '') {
        return products.value;
    }
    return products.value.filter((product) => {
        const title = product.title.toLowerCase();
        const author = product.author.toLowerCase();
        return title.includes(query) || author.includes(query);
    });
});

const open = ref(false);

const showDrawer = () => {
    open.value = true;
};

const closeDrawer = () => {
    open.value = false;
};

const addToCart = (product: Product): void => {

    if (!cart.value.some((item: Cart) => item.id === product.id)) {
        const cartItem: Cart = {
            id: product.id,
            title: product.title,
            basePrice: product.price,
            quantitativePrice: product.price,
            quantity: 1,
        }
        cart.value.push(cartItem);
    }
};

const increaseQuantity = (item: Cart): void => {
    item.quantity++
    item.quantitativePrice = item.quantitativePrice + item.basePrice
};

const decreaseQuantity = (item: Cart) => {
    if (item.quantity > 1) {
        item.quantity--
        item.quantitativePrice = item.quantitativePrice - item.basePrice
    }
};

const removeFromCart = (item: Cart) => {
    const index = cart.value.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
        cart.value.splice(index, 1);
    }
};

const clearCart = () => {
    cart.value = [];
};

const calculateTotalPrice = (cart: Cart[]): number => {
    return cart.reduce((total: number, item: Cart) => total + item.quantitativePrice, 0);
};

watch(cart, () => {
    totalPrice.value = calculateTotalPrice(cart.value).toFixed(2);
});

</script>

<template>
    <div>
        <div class="head-container">
            <h2>List of Books</h2>
            <StarOutlined v-if="isDarkMode" />
            <BulbFilled v-else />
            <Switch :checked="isDarkMode" @change="toggleSwitch" />
            <div class="search-and-button">
                <Input v-model:value="searchQuery" placeholder="Search Books" />
                <div class="shopping-cart-button">
                    <Button type="primary" ghost @click="showDrawer">
                        <ShoppingTwoTone />
                    </Button>
                </div>
            </div>
        </div>

        <div class="book-container">
            <div class="book-card" v-for="product in filteredProducts" :key="product.id">
                <img :src="product.image" width="150" height="150" />
                <div class="book-information-container">
                    <h3>{{ product.title }}</h3>
                    <p><i>Author: </i>{{ product.author }}</p>
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
                <Card v-for="item in cart" :key="item.id" :title="'Item No. ' + item.id">
                    <template #extra>
                        <Button type="primary" danger @click="decreaseQuantity(item)" :disabled="item.quantity === 1">
                            <MinusCircleOutlined />
                        </Button>
                        <Button type="primary" danger ghost>
                            {{ item.quantity }}
                        </Button>
                        <Button type="primary" @click="increaseQuantity(item)">
                            <PlusCircleOutlined />
                        </Button>
                    </template>
                    <Button type="primary" danger ghost @click="removeFromCart(item)">
                        <DeleteOutlined />
                    </Button>
                    <h3>{{ item.title }}</h3>
                    <p>Price: ${{ item.quantitativePrice }}</p>

                </Card>
                <br>
                <div class="total-cost-container">
                    <h2 v-if="cart.length > 0">Total Cost: ${{ calculateTotalPrice(cart) }}
                        <br> <Button danger @click="clearCart">Clear All</Button>
                    </h2>
                    <h2 v-else>No items :(</h2>
                </div>
            </Drawer>
        </div>
    </div>
</template>
    