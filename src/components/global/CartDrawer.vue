<script setup>
import { cartStore } from "@/stores/Cart";
import { storeToRefs } from "pinia";
import { computed, inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const emitter = inject("emitter");
const store = cartStore();
const drawer = ref(false);
const { cartItems } = storeToRefs(store);
const router = useRouter();

const props = defineProps({
  windowWidth: {
    type: Number,
  },
});

const pushCart = () => {
  router.push({ name: "cart_page" });
  drawer.value = false;
};

const toCheckout = () => {
  store.setLocalStorage();
  router.push({ name: "checkout" });
  drawer.value = false;
};

onMounted(() => {
  store.getCartItems();
});

const calcToPrice = computed(() => {
  let total = 0;

  cartItems.value.forEach((item) => {
    total +=
      Math.ceil(item.price - item.price * (item.discountPercentage / 100)) *
      item.quantity;
  });
  return total;
});

emitter.on("openCart", () => {
  drawer.value = true;
});
</script>

<template>
  <div class="drawer">
    <v-navigation-drawer
      location="right"
      v-model="drawer"
      temporary
      :width="props.windowWidth <= 767 ? props.windowWidth / 2 : 370"
    >
      <div class="cart pa-5">
        <v-card elevation="0">
          <v-card-title
            class="font-weight-bold text-sm-body px-0 d-flex justify-space-between align-center"
            >Shopping Cart
            <v-icon class="cursor-pointer" size="25" @click="drawer = false"
              >mdi-close
            </v-icon></v-card-title
          >
          <v-card-text class="text-grey-darken-1 px-0"
            >{{ cartItems.length }} Items</v-card-text
          >
          <v-card-text
            class="text-grey-darken-1 pt-0 px-0"
            v-if="!cartItems.length"
            >Free Shipping For All Orders Over $10000.00</v-card-text
          >
          <v-card-text
            class="text-grey-darken-1 text-center"
            v-if="!cartItems.length"
            >Your shopping cart is empty</v-card-text
          >
          <div
            class="bar-progress mt-4 position-relative"
            v-if="cartItems.length"
          >
            <v-progress-linear
              :color="
                parseInt((calcToPrice / 10000) * 100) <= 50
                  ? 'red'
                  : parseInt((calcToPrice / 10000) * 100) > 50 &&
                    parseInt((calcToPrice / 10000) * 100) < 100
                  ? 'orange'
                  : 'green'
              "
              height="10"
              striped
              :model-value="
                parseInt((calcToPrice / 10000) * 100) <= 100
                  ? parseInt((calcToPrice / 10000) * 100)
                  : 100
              "
            ></v-progress-linear>
            <svg
              class="icon-shipping-truck"
              viewBox="0 0 40.55 24"
              :fill="
                parseInt((calcToPrice / 10000) * 100) <= 50
                  ? 'red'
                  : parseInt((calcToPrice / 10000) * 100) > 50 &&
                    parseInt((calcToPrice / 10000) * 100) < 100
                  ? 'orange'
                  : 'green'
              "
              width="40.55"
              :style="`position: absolute;
      bottom: 50%;
      left: calc(${
        cartItems.length === 0
          ? 100
          : parseInt((calcToPrice / 10000) * 100) <= 100
          ? parseInt((calcToPrice / 10000) * 100)
          : 100
      }% - 40.55px);
      transition: all 0.15s ease-in-out;`"
            >
              >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    class="truck-body"
                    d="M40.43,11a3.86,3.86,0,0,0-3.68-2.65H28a1.25,1.25,0,0,1-1.43-1.43c0-2.18,0-4.35,0-6.53,0-.31-.08-.36-.37-.36H5.11a1.18,1.18,0,0,0-1.3,1.32c0,.74,0,1.48,0,2.22,0,.21-.06.27-.26.26-.36,0-.71,0-1.07,0a1.19,1.19,0,1,0,0,2.37H7.19c.43,0,.85,0,1.27,0a1,1,0,0,1,1.07,1A1.19,1.19,0,0,1,8.24,8.48H1.35a1.83,1.83,0,0,0-.47,0A1.19,1.19,0,0,0,0,9.85a1.18,1.18,0,0,0,1.19,1h9.66c.34,0,.68,0,1,0A1.19,1.19,0,0,1,13,12.47a1.26,1.26,0,0,1-1.26.76H1.24a1.19,1.19,0,1,0,0,2.38c.76,0,1.51,0,2.26,0,.26,0,.33.07.32.32,0,1,0,2.09,0,3.13A1.18,1.18,0,0,0,5.1,20.36c.63,0,1.26,0,1.9,0,.27,0,.39.06.47.36a4.55,4.55,0,0,0,8.78-.11.29.29,0,0,1,.32-.25H28.09a.3.3,0,0,1,.34.27,4.55,4.55,0,0,0,8.8,0,.31.31,0,0,1,.35-.26c.49,0,1,0,1.47,0a1.37,1.37,0,0,0,1.5-.87V11.41C40.41,11.29,40.47,11.12,40.43,11ZM32.84,21.62A2.18,2.18,0,1,1,35,19.45,2.21,2.21,0,0,1,32.84,21.62Zm-21,0A2.18,2.18,0,1,1,14,19.45,2.2,2.2,0,0,1,11.86,21.62Z"
                  ></path>
                  <path
                    class="truck-body"
                    d="M29.27,6h5.85c.1,0,.2,0,.29,0C33.64,2.72,32,.91,28.91.26V.57c0,1.68,0,3.35,0,5C28.9,5.9,29,6,29.27,6Z"
                  ></path>
                  <path
                    class="wheel"
                    fill="#fff"
                    d="M11.87,17.27A2.18,2.18,0,1,0,14,19.45,2.2,2.2,0,0,0,11.87,17.27Z"
                  ></path>
                  <path
                    class="wheel"
                    fill="#fff"
                    d="M32.85,17.27A2.18,2.18,0,1,0,35,19.45,2.22,2.22,0,0,0,32.85,17.27Z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <v-card-text
            class="text-grey-darken-1 px-0 pb-0"
            v-if="cartItems.length && 10000 - calcToPrice > 0"
            >Only ${{ 10000 - calcToPrice }} Away From Free
            Shipping</v-card-text
          >
          <v-card-text
            class="text-green-darken-1 px-0 pb-0"
            v-if="cartItems.length && 10000 - calcToPrice <= 0"
            >Congrats on Free Shipping</v-card-text
          >
          <v-actions v-if="!cartItems.length">
            <v-btn
              color="black"
              variant="outlined"
              class="text-capitalize mt-3 w-100 border"
              @click="$router.push({ name: 'home' })"
              :class="{ 'rounded-pill': $vuetify.display.smAndUp }"
              >continue shopping</v-btn
            >
          </v-actions>
        </v-card>
        <v-card
          elevation="0"
          v-if="cartItems.length"
          height="300"
          class="overflow-y-scroll mt-4 items-cart"
        >
          <v-container class="px-0 mt-5 pr-0">
            <v-row v-for="item in cartItems" :key="item.id">
              <v-col cols="12" sm="5">
                <img :src="item.thumbnail" class="w-100" alt="" />
              </v-col>
              <v-col cols="12" sm="7">
                <v-card-title
                  style="
                    white-space: pre-wrap;
                    font-size: 14px;
                    line-height: 1.2;
                  "
                  class="px-0"
                  >{{ item.title }} Sample - ({{ item.category }})</v-card-title
                >
                <v-card-text class="text-grey-darken-1 px-0">
                  Category: {{ item.category }}
                </v-card-text>
                <v-card-text class="px-0 py-0 font-weight-bold">
                  Price: ${{ (item.price * item.quantity).toFixed(2) }}
                </v-card-text>

                <v-card-text class="px-0">
                  <div class="footer-item d-flex justify-space-between">
                    <div
                      class="quantity rounded-pill border px-3 py-1 d-flex align-center"
                      style="width: fit-content"
                    >
                      <v-icon
                        class="cursor-pointer"
                        @click="item.quantity > 1 ? item.quantity-- : false"
                        >mdi-minus</v-icon
                      >
                      <input
                        type="number"
                        v-model="item.quantity"
                        min="1"
                        max="10"
                        class="text-center text-body-1"
                      />
                      <v-icon class="cursor-pointer" @click="item.quantity++"
                        >mdi-plus</v-icon
                      >
                    </div>
                    <v-icon
                      class="cursor-pointer text-red"
                      @click="store.removeItem(item)"
                      >mdi-delete</v-icon
                    >
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card elevation="0">
          <v-card-actions class="flex-column mt-5" v-if="cartItems.length">
            <v-btn
              variant="outlined"
              density="compact"
              color="white"
              height="40"
              @click="toCheckout"
              class="text-capitalize w-100 rounded-pill bg-blue font-weight-bold border"
            >
              Check Out
            </v-btn>
            <v-btn
              variant="outlined"
              density="compact"
              color="black"
              height="40"
              class="text-capitalize w-100 rounded-pill font-weight-bold"
              @click="pushCart"
            >
              View Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<style scoped lang="scss">
.items-cart {
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: rgb(156, 153, 153);
  }
  &::-webkit-scrollbar-track {
    width: 5px;
    background-color: rgb(201, 201, 201);
  }
}

@media (max-width: 767px) {
  .drawer {
    .v-card-text {
      font-size: 12px !important;
    }
    button {
      font-size: 12px !important;
      height: 30px !important;
      width: 90px !important;
    }
  }
}
</style>
