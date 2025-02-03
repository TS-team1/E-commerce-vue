<script setup>
import { cartStore } from "@/stores/Cart";
import { inject } from "vue";
import { onMounted, ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";

// data
const dialog = ref(false);
const store = cartStore();
const quantity = ref(1);
const tab = ref("");
const product = ref("");
const loading = ref(false);
const loader = ref(false);

const emitter = inject("emitter");

// methods
const addToCart = (item) => {
  item.quantity = quantity.value;
  loader.value = true;
  setTimeout(() => {
    loader.value = false;
    store.addItem(item);
    emitter.emit("openCart");
    emitter.emit("showSnackbar", item);
    dialog.value = false;
  }, 1000);
};
onMounted(async () => {
  emitter.on("openPopup", (item) => {
    loading.value = true;
    product.value = item;
    dialog.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
});
</script>

<template>
  <div class="quick-view mt-10">
    <v-dialog v-model="dialog" max-width="900" max-height="600">
      <v-icon
        style="
          position: absolute;
          top: -17px;
          right: -14px;
          background-color: black;
          color: #bdbbbb;
          z-index: 10;
          font-size: 18px;
          font-weight: 900;
          padding: 13px;
          cursor: pointer;
        "
        @click="dialog = false"
        >mdi-close</v-icon
      >
      <v-card elevation="0" class="content-card">
        <v-container fluid class="bg-white pt-5">
          <v-row>
            <v-col cols="7" class="">
              <img
                :src="tab ? tab : product.thumbnail"
                alt=""
                class="w-100"
                height="400"
                v-if="!loading"
              />
              <v-skeleton-loader
                type="image ,image ,image"
                v-if="loading"
              ></v-skeleton-loader>
              <v-tabs center-active height="220" v-model="tab" class="mt-2">
                <v-tab
                  :value="image"
                  v-for="(image, index) in product.images"
                  :key="index"
                  class="mx-10"
                >
                  <img :src="image" alt="" width="100" height="130" />
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
                  ({{ product.title }}) Sample - {{ product.category }} For Sale
                </v-card-text>
                <div class="rating d-flex align-center ga-2">
                  <v-rating
                    v-model="product.rating"
                    color="yellow-darken-3"
                    readonly
                    half-increments
                    size="small"
                    density="compact"
                  ></v-rating>
                  <span class="text-caption text-grey-darken-1"
                    >stock: {{ product.stock }}</span
                  >
                </div>
                <v-card-text class="text-grey-darken-1 px-0">
                  {{ product.description }}
                </v-card-text>
                <v-card-text class="text-grey-darken-1 px-0 pt-0">
                  Brand: {{ product.brand }}
                </v-card-text>
                <v-card-text class="text-grey-darken-1 px-0 pt-0">
                  Availability: {{ product.availabilityStatus }}
                </v-card-text>
                <v-card-text class="px-0 pt-0">
                  <span class="text-h6 font-weight-bold"
                    >Price: ${{ product.discountPercentage || "N/A" }}</span
                  >
                  <del
                    v-if="product.discountPercentage"
                    class="text-caption text-red ms-1"
                    >${{ product.price }}</del
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
                    quantity * Number(product.discountPercentage).toFixed(2)
                  }}
                </v-card-text>
                <v-card-actions class="mt-">
                  <v-btn
                    class="rounded-pill border bg-black font-weight-bold"
                    color="white"
                    width="60%"
                    prepend-icon="mdi-cart"
                    :loading="loader"
                    @click="addToCart(product)"
                  >
                    Add to Cart
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.content-card {
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: rgb(136, 134, 134);
  }
  &::-webkit-scrollbar-track {
    width: 5px;
    background-color: rgb(201, 201, 201);
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    border: none;
    outline: none;
  }
}
</style>
