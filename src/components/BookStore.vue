<script setup>
import { ref, computed } from 'vue';
import {
    Button, Badge, Drawer,
    Input, Card, Space,
    Popconfirm, notification,
} from 'ant-design-vue';

import {
    ShoppingTwoTone,
    ShoppingCartOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
    DeleteOutlined,
    QuestionCircleFilled,
} from '@ant-design/icons-vue';
import { useStore } from 'vuex';

const products = ref([
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

]);

const cart = ref([]);

const searchQuery = ref('');

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

const store = useStore();

const addToCart = (product) => {
    if (!store.state.cart.some((item) => item.id === product.id)) {
        store.commit('addToCart', product);
        notification.open({
            message: 'Success!',
            description: `${product.title} has been added to cart.`,
        });
    } else {
        notification.open({
            message: 'Warning!',
            description: `${product.title} is already in your cart!`,
        });
    }
};

</script>

<template>
    <div>
        <div class="head-container">
            <h2>List of Books</h2>
            <div class="search-and-button">
                <Input v-model:value="searchQuery" placeholder="Search Books" />
                <div class="shopping-cart-button">
                    <Badge :count="cart.length" type="primary" ghost @click="showDrawer">
                        <ShoppingTwoTone />
                    </Badge>
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
                    <p>{{ item.title }}</p>
                    <p>Price: ${{ item.quantitativePrice }}</p>
                    <template #extra>
                        <Button type="primary" danger ghost @click="removeFromCart(item)">
                            <DeleteOutlined />
                        </Button>
                    </template>
                    <template #actions>
                        <Space wrap>
                            <Button type="primary" danger @click="decreaseQuantity(item)" :disabled="item.quantity === 1">
                                <MinusCircleOutlined />
                            </Button>
                            <Button type="primary" danger ghost>
                                {{ item.quantity }}
                            </Button>
                            <Button type="primary" @click="increaseQuantity(item)">
                                <PlusCircleOutlined />
                            </Button>
                        </Space>
                    </template>
                </Card>

                <br>
                <div class="total-cost-container">
                    <h2 v-if="cart">
                        <Popconfirm title="Remove all products?" @confirm="clearCart">
                            <template #icon>
                                <QuestionCircleFilled style="color: red" />
                            </template>
                            <div :style="{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'center',
                                zIndex: 1,
                            }">
                                <Button v-if="cart.length > 1" danger>Clear All</Button>
                            </div>
                        </Popconfirm>
                    </h2>
                    <h2 v-else>No items :(</h2>
                </div>
            </Drawer>
        </div>
    </div>
</template>

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
    width: 40%;
    margin-left: auto;
    margin-right: auto;
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
    width: 70%;
    margin-left: auto;
    margin-right: auto;
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
