<script setup>
import { useProductsStore } from "@/stores/Products";
import { storeToRefs } from "pinia";
import { inject, onMounted } from "vue";
import enIcon from "@/assets/images/en.png";
import deIcon from "@/assets/images/de.png";
import { ref, defineProps } from "vue";

const store = useProductsStore();
const { categories } = storeToRefs(store);
const emitter = inject("emitter");
const drawer = ref(false);

const props = defineProps({
  windowWidth: {
    type: Number,
  },
});

const langs = ref([
  {
    icon: enIcon,
    lang: "English",
  },
  {
    icon: deIcon,
    lang: "Arabic",
  },
]);

onMounted(() => {
  emitter.on("openMenu", () => {
    drawer.value = true;
  });
});
</script>
<template>
  <div class="menu-drawer">
    <v-navigation-drawer
      v-model="drawer"
      temporary
      :width="props.windowWidth <= 767 ? props.windowWidth / 2 : 370"
      class="px-5 pt-2"
    >
      <v-card elevation="0">
        <v-card-title
          class="font-weight-bold px-0 d-flex justify-space-between align-center"
          >Menu
          <v-icon class="cursor-pointer" size="25" @click="drawer = false"
            >mdi-close
          </v-icon></v-card-title
        >
        <v-list>
          <v-list-item
            v-for="item in categories"
            :key="item.title"
            class="px-0"
            @click="
              $router.push({
                name: 'product_categories',
                query: { categories: item.route, title: item.title },
              })
            "
          >
            <v-list-item-title class="nav-link">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <v-list-item-title class="nav-link"
                  >Languages</v-list-item-title
                >
              </v-list-item>
            </template>
            <v-list-item v-for="lang in langs" :key="lang.lang">
              <v-list-item-title class="px-0 nav-link d-flex align-center ga-2">
                <img :src="lang.icon" alt="" width="30" />
                {{ lang.lang }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 767px) {
  .nav-link {
    font-size: 13px !important;
  }
}
</style>
