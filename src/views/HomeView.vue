<script setup>
import Banner from "@/components/home/UpperBanner.vue";
import TheFeatures from "@/components/home/TheFeatures.vue";
import TopOffers from "@/components/home/TopOffers.vue";
import ProductComponent from "@/components/home/ProductsSwiper.vue";
import TopCategories from "@/components/home/TopCategories.vue";
import NewProduct from "@/components/home/NewProduct.vue";
import QualityFeatures from "@/components/home/QualityFeatures.vue";
import WhyShopWithUs from "@/components/home/WhyShopWithUs.vue";
import { onMounted } from "vue";
import { useProductsStore } from "@/stores/Products";
import { storeToRefs } from "pinia";

const store = useProductsStore();
const { products, furniture, fragrances, beauty, Groceries } =
  storeToRefs(store);

onMounted(async () => {
  await store.fetchProducts();
});
</script>
<template>
  <Banner />
  <TheFeatures />
  <TopOffers />
  <ProductComponent
    :products="products"
    title="Flash Deals"
    titleColor="red"
    :index="0"
  />
  <TopCategories />
  <ProductComponent
    :products="Groceries"
    title="Groceries"
    titleColor="black"
    :index="6"
  />
  <QualityFeatures />
  <ProductComponent
    :products="fragrances"
    title="Top Fragrances"
    titleColor="black"
    :index="4"
  />
  <v-container fluid>
    <v-row class="imges-bundle d-flex justify-center align-center">
      <v-col cols="6">
        <img class="w-100" src="@/assets/images/band-right-cover.webp" alt="" />
      </v-col>
      <v-col cols="6">
        <img class="w-100" src="@/assets/images/band-left-cover.webp" alt="" />
      </v-col>
    </v-row>
  </v-container>
  <ProductComponent
    :products="beauty"
    title="Top Beauty"
    titleColor="black"
    :index="0"
  />
  <div class="tv-img pa-3 w-100">
    <img src="@/assets/images/tv-banner.webp" alt="" />
  </div>
  <NewProduct :products="furniture" />
  <WhyShopWithUs />
</template>
