<script setup>
import qualityData from "@/data/quality.json";
</script>

<template>
  <div
    class="quality-features bg-grey-lighten-3 d-flex justify-space-around align-center ga-2"
  >
    <v-container fluid>
      <v-row justify="space-around" align="center" class="pa-5">
        <v-col
          v-for="item in qualityData"
          :key="item.title"
          class="text-center rounded-md"
          cols="12"
          sm="6"
          md="3"
          lg=""
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              height="300"
              width="100%"
              :elevation="isHovering ? 5 : 1"
              class="d-flex flex-column justify-center align-center"
              :class="isHovering ? 'bg-blue-lighten-4' : 'white'"
              rounded="5"
            >
              <div class="parent">
                <v-card-text class="text-center">
                  <div class="mx-auto w-33" v-html="item.svg"></div>
                </v-card-text>
                <v-card-title
                  class="text-center text-sm font-weight-bold"
                  style="font-size: 15px"
                >
                  {{ item.title }}
                </v-card-title>
                <v-card-text
                  class="text-center mt-3 text-grey"
                  style="font-size: 13px"
                >
                  {{ item.description }}
                </v-card-text>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
