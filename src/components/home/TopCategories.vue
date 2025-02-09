<script setup>
import categories from "@/data/categories.json";
</script>

<template>
  <div class="top-categories">
    <div class="cyber-banner">
      <img class="w-100" src="@/assets/images/cyber-banner.webp" alt="" />
    </div>
    <div class="categories">
      <div class="title d-flex align-center justify-center pa-10">
        <h1 class="font-weight-bold text-center flex-grow-1">Top Categories</h1>
      </div>

      <v-container fluid class="pa-10">
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="3"
            lg="2"
            v-for="item in categories"
            :key="item.title"
            class="text-center"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-img
                class="cursor-pointer"
                height="300"
                :src="item.img"
                v-bind="props"
                :style="{
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                }"
              ></v-img>
            </v-hover>
            <v-card-title class="font-weight-bold">{{
              item.title
            }}</v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
