<script setup>
import { cartStore } from "@/stores/Cart";
import { storeToRefs } from "pinia";
import { inject } from "vue";
import { useRoute } from "vue-router";

const storeCart = cartStore();
const { cartItems } = storeToRefs(storeCart);
const route = useRoute();
const emitter = inject("emitter");

const openCart = () => {
  emitter.emit("openCart");
};
const openMenu = () => {
  emitter.emit("openMenu");
};
</script>
<template>
  <div class="responsive-nav">
    <v-app-bar>
      <v-container>
        <v-row class="d-flex align-center">
          <v-col cols="4"
            ><v-app-bar-nav-icon
              @click="openMenu"
              width="40px"
            ></v-app-bar-nav-icon>
            <v-icon class="ms-3">mdi-magnify</v-icon></v-col
          >

          <v-col cols="4" class="text-center">
            <img
              src="@/assets/images/footer-logo.webp"
              alt=""
              class="w-50 cursor-pointer"
              @click="$router.push({ name: 'home' })"
            />
          </v-col>
          <v-col cols="4" class="d-flex align-center justify-end ga-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              focusable="false"
              width="30px"
              role="presentation"
              class="icon icon-account"
            >
              <path
                d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 16 8 C 13.25 8 11 10.25 11 13 C 11 14.515625 11.707031 15.863281 12.78125 16.78125 C 10.53125 17.949219 9 20.300781 9 23 L 11 23 C 11 20.226563 13.226563 18 16 18 C 18.773438 18 21 20.226563 21 23 L 23 23 C 23 20.300781 21.46875 17.949219 19.21875 16.78125 C 20.292969 15.863281 21 14.515625 21 13 C 21 10.25 18.75 8 16 8 Z M 16 10 C 17.667969 10 19 11.332031 19 13 C 19 14.667969 17.667969 16 16 16 C 14.332031 16 13 14.667969 13 13 C 13 11.332031 14.332031 10 16 10 Z"
              ></path>
            </svg>
            <v-badge
              color="black"
              v-if="cartItems.length"
              :content="cartItems.length"
              class="text-white"
              overlap
            >
              <svg
                @click="openCart"
                :style="`cursor: pointer; pointer-events:${
                  route.name === 'cart_page' ? 'none' : 'unset'
                };`"
                viewBox="0 0 30 30"
                width="27px"
                class="icon icon-cart"
                enable-background="new 0 0 30 30"
              >
                <g>
                  <g>
                    <path
                      d="M20,6V5c0-2.761-2.239-5-5-5s-5,2.239-5,5v1H4v24h22V6H20z M12,5c0-1.657,1.343-3,3-3s3,1.343,3,3v1h-6V5z M24,28H6V8h4v3    h2V8h6v3h2V8h4V28z"
                    ></path>
                  </g>
                </g>
              </svg>
            </v-badge>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>
