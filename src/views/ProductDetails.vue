<script setup>
import { cartStore } from "@/stores/Cart";
import { useProductsStore } from "@/stores/Products";
import { storeToRefs } from "pinia";
import { inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";

const store = useProductsStore();
const { singleProduct } = storeToRefs(store);
const storCart = cartStore();
const emitter = inject("emitter");
const route = useRoute();

const quantity = ref(1);
const tab = ref("");
const loading = ref(false);
const loader = ref(false);

const addToCart = (item) => {
  item.quantity = quantity.value;
  loader.value = true;
  setTimeout(() => {
    loader.value = false;
    storCart.addItem(item);
    emitter.emit("openCart");
    emitter.emit("showSnackbar", item);
  }, 1000);
};

onMounted(async () => {
  try {
    loading.value = true;
    await store.getSingleProduct(route.params.productId);
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("فشل تحميل المنتج:", error);
  }
});
</script>

<template>
  <div class="product-detaild mt-16">
    <v-container fluid>
      <v-row>
        <v-col cols="7" class="text-center">
          <img
            :src="tab ? tab : singleProduct.thumbnail"
            alt=""
            class="w-75 ma-auto"
            height="500"
            v-if="!loading"
          />
          <v-skeleton-loader
            type="image ,image ,image"
            v-if="loading"
          ></v-skeleton-loader>
          <v-tabs center-active height="220" v-model="tab" class="mt-5">
            <v-tab
              :value="image"
              v-for="(image, index) in singleProduct.images"
              :key="index"
              class="mx-10"
            >
              <img :src="image" alt="" width="100" height="200" />
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="5">
          <v-skeleton-loader
            type="article ,article ,article"
            v-if="loading"
          ></v-skeleton-loader>
          <v-card v-if="!loading" elevation="0">
            <v-card-text class="px-0 text-h5">
              ({{ singleProduct.title }}) Sample -
              {{ singleProduct.category }} For Sale
            </v-card-text>
            <div class="rating d-flex align-center ga-2">
              <v-rating
                v-model="singleProduct.rating"
                color="yellow-darken-3"
                readonly
                half-increments
                size="small"
                density="compact"
              ></v-rating>
              <span class="text-caption text-grey-darken-1"
                >stock: {{ singleProduct.stock }}</span
              >
            </div>
            <v-card-text class="text-grey-darken-1 px-0">
              {{ singleProduct.description }}
            </v-card-text>
            <v-card-text class="text-grey-darken-1 px-0 pt-0">
              Brand: {{ singleProduct.brand }}
            </v-card-text>
            <v-card-text class="text-grey-darken-1 px-0 pt-0">
              Availability: {{ singleProduct.availabilityStatus }}
            </v-card-text>
            <v-card-text class="px-0 pt-0">
              <span class="text-h6 font-weight-bold"
                >Price: ${{ singleProduct.price || "N/A" }}</span
              >
              <del
                v-if="singleProduct.discountPercentage"
                class="text-caption text-red ms-1"
                >${{ singleProduct.discountPercentage }}</del
              >
            </v-card-text>
            <v-card-text class="px-0 pt-0">Quantity:</v-card-text>
            <div
              class="quantity rounded-pill border px-3 py-2 d-flex align-center"
              style="width: fit-content"
            >
              <v-icon
                class="cursor-pointer"
                @click="quantity > 1 ? quantity-- : false"
                >mdi-minus</v-icon
              >
              <input
                type="number"
                v-model="quantity"
                min="1"
                max="10"
                class="text-center text-body-1"
              />
              <v-icon class="cursor-pointer" @click="quantity++"
                >mdi-plus</v-icon
              >
            </div>
            <v-card-text>
              Subtotal: ${{
                quantity * Number(singleProduct.discountPercentage).toFixed(2)
              }}
            </v-card-text>
            <v-card-actions class="mt-5">
              <v-btn
                class="rounded-pill border bg-black font-weight-bold"
                color="white"
                width="60%"
                prepend-icon="mdi-cart"
                :loading="loader"
                @click="addToCart(singleProduct)"
              >
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
