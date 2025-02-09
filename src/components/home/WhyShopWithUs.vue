<template>
  <div class="why-shop">
    <v-container fluid>
      <div class="title mt-3">
        <h2><span class="">Why Shop</span> With Us</h2>
      </div>
      <div>
        <v-row>
          <v-col cols="12" md="4" sm="6" lg="3">
            <v-card class="text-white bg-transparent" elevation="0">
              <v-img>
                <img src="@/assets/images/free-shipping.png" alt="" />
              </v-img>
              <v-card-title class="font-weight-bold">
                free Scoping on first order
              </v-card-title>
              <v-card-text class="pb-0">
                Lorem ipsum dolor sit amet consectetur
              </v-card-text>
              <a href="#" class="text-white">Learn More</a>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6" lg="3">
            <v-card class="text-white bg-transparent" elevation="0">
              <v-img>
                <img src="@/assets/images/cash-back.png" alt="" />
              </v-img>
              <v-card-title class="font-weight-bold">
                free Scoping on first order
              </v-card-title>
              <v-card-text class="pb-0">
                Lorem ipsum dolor sit amet consectetur
              </v-card-text>
              <a href="#" class="text-white">Learn More</a>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6" lg="3">
            <v-card class="text-white bg-transparent" elevation="0">
              <v-img>
                <img src="@/assets/images/discount.png" alt="" />
              </v-img>
              <v-card-title class="font-weight-bold">
                free Scoping on first order
              </v-card-title>
              <v-card-text class="pb-0">
                Lorem ipsum dolor sit amet consectetur
              </v-card-text>
              <a href="#" class="text-white">Learn More</a>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6" lg="3">
            <v-card class="text-white bg-transparent" elevation="0">
              <v-img>
                <img src="@/assets/images/weekly-flash-sales.png" alt="" />
              </v-img>
              <v-card-title class="font-weight-bold">
                free Scoping on first order
              </v-card-title>
              <v-card-text class="pb-0">
                Lorem ipsum dolor sit amet consectetur
              </v-card-text>
              <a href="#" class="text-white">Learn More</a>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.why-shop {
  background-image: url("@/assets/images/why-shop-with-us-banner.webp");
  background-size: cover;
  background-repeat: repeat-x;
  // height: 50vh;
  text-align: center;

  .title {
    span {
      color: #5dbdb5;
    }

    h2 {
      font-size: 35px;
      color: white;
    }
  }
}
</style>
