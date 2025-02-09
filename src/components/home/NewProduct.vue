<script setup>
import { defineProps, inject, ref } from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import { Pagination, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";

const showImg = ref({});
const emitter = inject("emitter");
const activeItem = ref(null);

const openPopup = (item) => {
  activeItem.value = item.id;
  emitter.emit("openPopup", item);

  setTimeout(() => {
    activeItem.value = null;
  }, 1500);
};

const breakpoints = ref({
  0: {
    slidesPerView: 1,
  },
  580: {
    slidesPerView: 2,
  },
  1025: {
    slidesPerView: 3,
  },
});

// define props
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="new-product">
    <div class="title d-flex align-center justify-space-between pa-4">
      <h1 class="text-red">New Products</h1>
      <a href="#" class="text-black">Shop All</a>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="7" v-if="!products.length" class="pt-16">
          <v-row>
            <v-col cols="4" v-for="num in 3" :key="num">
              <v-skeleton-loader
                type="image , article ,button"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7" class="pa-3 order-1 order-md-0" v-else>
          <swiper
            :modules="[Pagination, Autoplay]"
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :loop="true"
            :breakpoints="breakpoints"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :slides-per-view="3"
            :space-between="20"
            class="mySwiper pb-15 pt-16"
            :autoplay="{ delay: 2500, disableOnInteraction: false }"
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
                        showImg[item.title]
                          ? showImg[item.title]
                          : item.thumbnail
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
                      class="rounded-circle border-md mb-2"
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
          </swiper>
        </v-col>
        <v-col cols="12" md="5">
          <img class="w-100 mt-4" src="@/assets/images/vr-banner.webp" alt="" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
