<script setup>
import { cartStore } from "@/stores/Cart";
import { onMounted, ref, defineProps, watch, inject } from "vue";
import { useRouter } from "vue-router";

const dialog = ref(false);
const store = cartStore();
const router = useRouter();
const emitter = inject("emitter");

const props = defineProps({
  popup: {
    type: Boolean,
    required: true,
  },
});

onMounted(() => {
  dialog.value = props.popup;
});

watch(
  () => dialog.value,
  (newValue) => {
    if (!newValue) {
      setTimeout(() => {
        emitter.emit("closePopup");
      }, 200);
    }
  }
);

const closePopup = () => {
  dialog.value = false;
  store.clearCart();
  router.push({ name: "home" });
};
</script>

<template>
  <div class="order-success">
    <v-dialog v-model="dialog" width="50%" persistent>
      <v-card class="text-center" elevation="0">
        <img src="@/assets/images/download.jpeg" alt="" class="w-25 ma-auto" />
        <v-card-title class="font-weight-bold text-green text-h4"
          >Order Placed Successfully</v-card-title
        >
        <v-card-text class="pt-0 text-grey-darken-1">
          consectetur adipisicing elit. Voluptate odio nobis quibusdam? Quidem
          veritatis aliquid eaque minus iure corporis dolorem dicta veniam
          reiciendis accusantium! Possimus soluta blanditiis ullam voluptate
          harum!</v-card-text
        >
        <v-card-actions class="d-flex justify-center">
          <v-btn
            :loading="!dialog"
            color="#0027ab"
            variant="elevated"
            width="50%"
            class="text-capitalize border"
            @click="closePopup"
            :class="{ 'rounded-pill': $vuetify.display.smAndUp }"
            >Got it!</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
