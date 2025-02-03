<script setup>
import { inject, ref } from "vue";
import enIcon from "@/assets/images/en.png";
import deIcon from "@/assets/images/de.png";
import { useProductsStore } from "@/stores/Products";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { cartStore } from "@/stores/Cart";

const store = useProductsStore();
const { categories } = storeToRefs(store);
const route = useRoute();
const storeCart = cartStore();
const { cartItems } = storeToRefs(storeCart);
const emitter = inject("emitter");

const langs = ref([
  {
    icon: enIcon,
    lang: "EN",
    currency: "USD",
  },
  {
    icon: deIcon,
    lang: "DU",
    currency: "EUR",
  },
]);

const slectedLang = ref([
  {
    icon: enIcon,
    lang: "EN",
    currency: "USD",
  },
]);

const openCart = () => {
  emitter.emit("openCart");
};
</script>

<template>
  <div class="nav-bar">
    <v-app-bar color="#0027ab" class="pa-1" height="fit-content" absolute>
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <v-app-bar-title class="pt-2">
              <router-link :to="{ name: 'home' }">
                <img src="@/assets/images/logo.png" alt=""
              /></router-link>
            </v-app-bar-title>
          </v-col>
          <v-col cols="5">
            <div class="search position-relative bg-white rounded-pill">
              <input
                type="text"
                placeholder="Search in our store"
                class="w-100 pa-3"
              />
              <v-icon
                size="40px"
                class="position-absolute top-0 right-0 mt-1 mr-3"
                >mdi-magnify</v-icon
              >
            </div>
          </v-col>
          <v-col cols="4" class="d-flex align-center justify-end ga-5">
            <div class="cart d-flex flex-column align-center">
              <p>Available 24/7 at</p>
              <strong>(090) 123-3556</strong>
            </div>
            <div class="cart d-flex flex-column align-center">
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
                color="blue"
                :content="cartItems.length"
                location="right top"
                offset-x="-10"
                offset-y="-35"
                v-if="cartItems.length"
              ></v-badge>
              <span>Cart</span>
            </div>
            <div class="sign-in d-flex flex-column align-center">
              <v-icon color="#ab730d" size="40px">mdi-account-outline</v-icon>
              <span>Sign In</span>
            </div>
            <div class="wishlist d-flex flex-column align-center">
              <v-icon color="#ab730d" size="35px">mdi-heart-outline</v-icon>
              <span>Wishlist</span>
            </div>
          </v-col>
          <v-col cols="8">
            <ul class="list d-flex justify-space-between">
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
            </ul>
          </v-col>
          <v-col cols="4" class="d-flex align-center justify-end ga-6">
            <div class="help d-flex align-center">
              <v-icon color="blue" size="30px">mdi-headset</v-icon>
              <span>Help</span>
            </div>
            <div
              class="language d-flex justify-center align-center ga-1 cursor-pointer"
              id="language-btn"
            >
              <img :src="slectedLang[0].icon" alt="english flag" />
              <span
                >{{ slectedLang[0].lang }}/ {{ slectedLang[0].currency }}</span
              >
              <v-icon>mdi-chevron-down</v-icon>
              <v-menu activator="#language-btn">
                <v-list v-model:selected="slectedLang" mandatory>
                  <v-list-item
                    v-for="lang in langs"
                    :key="lang.lang"
                    :value="lang"
                  >
                    <v-list-item-title class="d-flex align-center ga-2">
                      <img :src="lang.icon" alt="english flag" class="en" />{{
                        lang.lang
                      }}
                      / {{ lang.currency }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<style lang="scss" scoped>
.list {
  list-style: none;
  margin-top: 15px;
  font-size: 17px;
  li {
    cursor: pointer;
  }
}
.language img {
  width: 30px;
}
.en {
  width: 25px;
}
</style>
