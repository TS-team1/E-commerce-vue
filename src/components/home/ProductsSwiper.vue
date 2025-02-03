<script setup>
import { defineProps, ref, inject } from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import { Pagination, Navigation, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { useProductsStore } from "@/stores/Products";
import { storeToRefs } from "pinia";

const showImg = ref({});
const emitter = inject("emitter");
const activeItem = ref(null);
const store = useProductsStore();
const { categories } = storeToRefs(store);

const breakpoints = ref({
  0: {
    slidesPerView: 1,
  },
  580: {
    slidesPerView: 2,
  },
  676: {
    slidesPerView: 3,
  },
  990: {
    slidesPerView: 4,
  },
});
const openPopup = (item) => {
  activeItem.value = item.id;
  emitter.emit("openPopup", item);

  setTimeout(() => {
    activeItem.value = null;
  }, 1500);
};

// define props
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  titleColor: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
  },
});
</script>

<template>
  <div class="productsSwiper pa-10">
    <!-- Swiper Container -->
    <div class="title d-flex align-center justify-space-between">
      <h1 :class="[`text-${props.titleColor}`]">{{ props.title }}</h1>
      <router-link
        :to="{
          name: 'product_categories',
          query: {
            title: categories[props.index].title,
            categories: categories[props.index].route,
          },
        }"
        >Shop All</router-link
      >
    </div>
    <v-container fluid v-if="!products.length">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="3" v-for="num in 4" :key="num">
              <v-skeleton-loader
                type="image , article ,button"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <swiper
      :modules="[Pagination, Navigation, Autoplay]"
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :slides-per-view="4"
      :space-between="30"
      class="mySwiper pb-15 pt-16"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :loop="true"
      :breakpoints="breakpoints"
    >
      <!-- Loop through products -->
      <swiper-slide v-for="item in props.products" :key="item.id">
        <v-card class="mx-auto pb-5">
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
                width="60"
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
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.description }}</v-card-subtitle>
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
              >Price: ${{ item.price }}</span
            >
            <del class="text-caption text-red ms-1"
              >${{ item.discountPercentage }}</del
            >
          </v-card-text>
          <v-btn-toggle v-model="showImg[item.title]" mandatory>
            <v-btn
              size="x-small"
              v-for="(pic, i) in item.images"
              :value="pic"
              :key="i"
              ><img
                :src="pic"
                width="30px"
                height="30px"
                class="rounded-circle border-md"
                alt=""
            /></v-btn>
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
      </swiper-slide>
      <!-- Pagination & Navigation -->
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.productsSwiper {
  .swiper-button-prev,
  .swiper-button-next {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgb(70, 69, 69);
    background-color: white;
    top: 30%;
    &::after {
      color: rgb(70, 69, 69);
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 17px;
      font-weight: 900;
    }
  }
}
</style>
