<script setup>
import { cartStore } from "@/stores/Cart";
import { useProductsStore } from "@/stores/Products";
import { storeToRefs } from "pinia";
import { inject } from "vue";
import { useRoute } from "vue-router";

const store = useProductsStore();
const { categories } = storeToRefs(store);
const route = useRoute();
const storeCart = cartStore();
const { cartItems } = storeToRefs(storeCart);
const emitter = inject("emitter");

const openCart = () => {
  emitter.emit("openCart");
};
</script>
<template>
  <div class="fixed-nav">
    <v-app-bar color="#0027ab">
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <router-link :to="{ name: 'home' }">
              <img src="@/assets/images/logo.png" alt=""
            /></router-link>
          </v-col>
          <v-col cols="7">
            <ul class="list d-flex justify-space-between align-center pt-2">
              <li v-for="cat in categories" :key="cat.title">
                <router-link
                  class="text-white text-decoration-none"
                  :to="{
                    name: 'product_categories',
                    query: { categories: cat.route, title: cat.title },
                  }"
                  >{{ cat.title }}</router-link
                >
              </li>
            </ul></v-col
          >
          <v-col cols="3">
            <div class="d-flex align-center justify-end ga-2">
              <v-icon size="35px" color="#fff">mdi-magnify</v-icon>
              <v-icon
                color="#ab730d"
                size="35px"
                @click="openCart"
                :style="`cursor: pointer; pointer-events:${
                  route.name === 'cart_page' ? 'none' : 'unset'
                };`"
                >mdi-cart-outline</v-icon
              >
              <v-badge
                color="red"
                :content="cartItems.length"
                location="right top"
                offset-x="14"
                offset-y="-15"
                v-if="cartItems.length"
              ></v-badge>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<style scoped lang="scss">
.list {
  list-style: none;
  font-size: 15px;
  li {
    cursor: pointer;
  }
}
</style>
