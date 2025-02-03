<script setup>
import { useProductsStore } from "@/stores/Products";
import { storeToRefs } from "pinia";
import { watch, ref, computed, inject } from "vue";
import { useRoute } from "vue-router";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";

const route = useRoute();
const store = useProductsStore();
const { categoryProduct } = storeToRefs(store);

// Reactive state for showing images
const showImg = ref({});
const loading = ref(false);

// Default image for fallback
const defaultImage = "https://via.placeholder.com/250";

const emitter = inject("emitter");
const activeItem = ref(null);

const openPopup = (item) => {
  activeItem.value = item.id;
  emitter.emit("openPopup", item);

  setTimeout(() => {
    activeItem.value = null;
  }, 1500);
};

// Fetch products by category when the route changes
watch(
  () => route.query.categories,
  async (newCategory) => {
    if (route.name === "product_categories" && newCategory) {
      document.documentElement.scrollTop = (0, 0);
      try {
        loading.value = true;
        await store.getProductByCategory(newCategory);
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.error("Failed to fetch products:", error);
      }
    }
    console.log("fired");
  },
  { immediate: true }
);

// Computed property to get the category title
const categoryTitle = computed(() => {
  if (!route.query.categories) return route.go(-1);
  return route.query.title || "Products";
});
</script>

<template>
  <div class="product-categories">
    <h1 class="text-center pa-5">{{ categoryTitle }}</h1>
    <v-container fluid>
      <v-row v-if="loading">
        <v-col cols="12" sm="6" md="4" lg="3" v-for="num in 4" :key="num">
          <v-skeleton-loader type="image , article ,button"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-if="!loading" class="pt-5 pb-0">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="item in categoryProduct"
          :key="item.id"
        >
          <v-lazy>
            <v-card class="mx-auto pb-5" :loading="loading">
              <v-hover v-slot="{ isHovering, props }">
                <div class="image position-relative">
                  <v-img
                    v-bind="props"
                    :style="`transition: all 0.3s ease-in-out; cursor: pointer; transform: ${
                      isHovering ? 'scale(1.1)' : 'scale(1)'
                    }`"
                    height="250"
                    :src="
                      showImg[item.title] ? showImg[item.title] : item.thumbnail
                    "
                  ></v-img>
                  <v-btn
                    @click="openPopup(item)"
                    density="compact"
                    width="80"
                    height="30"
                    variant="outlined"
                    color="black"
                    class="quickView"
                    :style="` text-transform: none;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  border-radius: 50px;
                  background-color: white;
                  font-size: 12px;
                  transition: all 0.3s ease-in-out;
                  cursor: pointer;
                  opacity: ${isHovering || activeItem === item.id ? 1 : 0};`"
                  >
                    Quick View
                  </v-btn>
                </div>
              </v-hover>
              <v-card-title>{{
                item.title || "No Title Available"
              }}</v-card-title>
              <v-card-subtitle>
                {{ item.description || "No description available." }}
              </v-card-subtitle>
              <v-rating
                class="ms-2 mt-2"
                v-model="item.rating"
                color="yellow-darken-3"
                readonly
                half-increments
                size="small"
                density="compact"
              ></v-rating>
              <v-card-text>
                <span class="text-md font-weight-bold"
                  >Price: ${{ item.price || "N/A" }}</span
                >
                <del
                  v-if="item.discountPercentage"
                  class="text-caption text-red ms-1"
                  >${{ item.discountPercentage }}</del
                >
              </v-card-text>
              <v-btn-toggle v-model="showImg[item.title]">
                <v-btn
                  size="x-small"
                  v-for="(pic, i) in item.images || []"
                  :value="pic"
                  :key="i"
                >
                  <img
                    :src="pic || defaultImage"
                    width="30px"
                    height="30px"
                    class="rounded-circle border-md mb-2"
                    :alt="`Image ${i + 1}`"
                  />
                </v-btn>
              </v-btn-toggle>
              <div class="d-flex justify-center">
                <v-btn
                  density="compact"
                  class="rounded-pill"
                  variant="outlined"
                  color="primary"
                  @click="
                    $router.push({
                      name: 'product_details',
                      params: { productId: item.id },
                    })
                  "
                >
                  Choose Option
                </v-btn>
              </div>
            </v-card>
          </v-lazy>
        </v-col>
      </v-row>
      <v-row v-if="!loading && !categoryProduct.length">
        <v-col cols="12" class="text-center">
          <p>No products available in this category.</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.product-categories {
  padding: 20px;
}

.v-card {
  transition: box-shadow 0.3s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
