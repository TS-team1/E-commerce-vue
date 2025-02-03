<template>
  <v-container fluid class="bg-grey-lighten-3 py-13">
    <v-row>
      <v-hover v-slot="{ isHovering, props }">
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          class="pa-5 overflow-hidden"
          v-bind="props"
        >
          <img
            class="w-100"
            src="@/assets/images/playstations.webp"
            alt=""
            :style="{
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
              transform: isHovering ? 'scale(1.1)' : 'scale(1)',
            }"
          />
        </v-col>
      </v-hover>
      <v-hover v-slot="{ isHovering, props }">
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          class="pa-5 overflow-hidden"
          v-bind="props"
        >
          <img
            class="w-100"
            src="@/assets/images/chairs.webp"
            alt=""
            :style="{
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
              transform: isHovering ? 'scale(1.1)' : 'scale(1)',
            }"
          />
        </v-col>
      </v-hover>
      <v-hover v-slot="{ isHovering, props }">
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          class="pa-5 overflow-hidden"
          v-bind="props"
        >
          <img
            class="w-100"
            src="@/assets/images/chairs.webp"
            alt=""
            :style="{
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
              transform: isHovering ? 'scale(1.1)' : 'scale(1)',
            }"
          />
        </v-col>
      </v-hover>
      <v-col cols="12" sm="12" md="6" lg="6" class="pa-3 w-100">
        <img
          class="w-100 cursor-pointer"
          src="@/assets/images/iphones.webp"
          alt=""
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" class="pa-3 cursor-pointer">
        <img class="w-100" src="@/assets/images/laptops.webp" alt="" />
      </v-col>
    </v-row>
  </v-container>
</template>
