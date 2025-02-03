<script setup>
import AppLayout from "@/components/global/AppLayout";
import QuickView from "@/components/global/QuickView.vue";
import { inject } from "vue";
import { onMounted, ref } from "vue";

const emitter = inject("emitter");
const snackbar = ref(false);
const titleMsg = ref("");

onMounted(() => {
  emitter.on("showSnackbar", (item) => {
    titleMsg.value = item.title;
    snackbar.value = true;
  });
});
</script>

<template>
  <app-layout>
    <router-view />
    <QuickView />
    <v-snackbar
      v-model="snackbar"
      location="left bottom"
      color="success"
      timeout="3000"
      max-width="300"
      >{{ titleMsg }} has been added to your Cart successful
      <template v-slot:actions>
        <v-icon
          class="cursor-pointer"
          color="white"
          size="25"
          @click="snackbar = false"
          >mdi-close</v-icon
        >
      </template></v-snackbar
    >
  </app-layout>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  input {
    border: none;
    outline: none;
    background: none;
  }
  input:focus {
    border: none;
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
