<script setup>
import AppNav from "./AppNav.vue";
import AppFooter from "./AppFooter";
import CartDrawer from "./CartDrawer";
import MenuDrawer from "./MenuDrawer";
import FixedNav from "./fixedNav.vue";
import ResponsiveNav from "./ResponsiveNav.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const windowWidth = ref(0);
const route = useRoute();

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.onresize = () => {
    windowWidth.value = window.innerWidth;
  };
});

// Watch windowWidth to handle visibility of elements
watch(windowWidth, (newWidth) => {
  if (newWidth <= 990) {
    // Do something when screen is small
  }
});
</script>

<template>
  <div class="layout">
    <v-layout>
      <CartDrawer :windowWidth="windowWidth" />
      <MenuDrawer :windowWidth="windowWidth" />

      <!-- Adjust padding dynamically based on route and window width -->
      <v-main
        :style="`padding-top: ${
          route.name === 'checkout'
            ? '0px'
            : windowWidth <= 990
            ? '60px'
            : '150px'
        }`"
      >
        <slot></slot>
      </v-main>

      <AppNav v-show="$route.name !== 'checkout' && windowWidth > 990" />
      <ResponsiveNav
        v-show="windowWidth <= 990 && $route.name !== 'checkout'"
      />
      <FixedNav v-show="$route.name !== 'checkout' && windowWidth > 990" />
    </v-layout>
    <AppFooter v-show="$route.name !== 'checkout'" />
  </div>
</template>
