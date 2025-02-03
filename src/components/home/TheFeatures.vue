<template>
  <div class="features">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="4">
          <div
            class="content d-flex align-center justify-center ga-5 flex-column flex-sm-row"
          >
            <v-icon size="40px">mdi-car</v-icon>
            <p>Free Shipping & Returns</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <div
            class="content d-flex align-center justify-center ga-5 flex-column flex-sm-row border-s-md"
          >
            <v-icon size="40px">mdi-shield-check</v-icon>

            <p>Lowest Price Guarantee</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <div
            class="content d-flex align-center justify-center ga-5 border-s-md flex-column flex-sm-row"
          >
            <v-icon size="40px">mdi-trophy</v-icon>

            <p>Longest Warranties Off</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss">
@media (max-width: 600px) {
  .features {
    .content {
      border: none !important;
    }
  }
}
</style>
