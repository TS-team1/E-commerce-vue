<script setup>
import AppNav from "./AppNav.vue";
import AppFooter from "./AppFooter";
import CartDrawer from "./CartDrawer";
import MenuDrawer from "./MenuDrawer";
import FixedNav from "./fixedNav.vue";
import ResponsiveNav from "./ResponsiveNav.vue";
import { onMounted, ref } from "vue";

const windowWidth = ref(0);

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.onresize = () => {
    windowWidth.value = window.innerWidth;
  };
  console.log(windowWidth.value);
});
</script>

<template>
  <div class="layout">
    <v-layout>
      <CartDrawer />
      <MenuDrawer />
      <v-main
        :style="`padding-top: ${
          $route.name === 'checkout'
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
