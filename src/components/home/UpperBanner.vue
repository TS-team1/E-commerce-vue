<template>
  <div class="upper-banner">
    <div class="parent">
      <img src="@/assets/images/banner-bg.jpg" alt="" />
      <div class="content">
        <h1><span>Huge Saving</span> on UHD Television</h1>
        <p>sale up to 70% off on select items*</p>
        <v-btn
          style="border-radius: 30px; text-transform: none"
          variant="outlined"
          width="150"
          height="40"
          density="compact"
          class="text-capitalize mt-10 text-white"
          >Shop Now</v-btn
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upper-banner {
  .parent {
    position: relative;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .content {
      position: absolute;
      top: 12%;
      left: 10%;
      width: 30%;
      h1 {
        font-size: 50px;
        color: #fff;
        span {
          color: #43f0ca;
        }
      }
      p {
        font-size: 18px;
        color: #fff;
        margin-top: 10px;
      }
    }
  }
}

// media queries
@media (max-width: 990px) {
  .upper-banner {
    .parent {
      .content {
        width: 65%;
        h1 {
          font-size: 40px;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .upper-banner {
    .parent {
      height: 300px;
      .content {
        width: 40%;
        h1 {
          font-size: 30px;
        }
        p {
          font-size: 15px;
        }
      }
    }
  }
}
@media (max-width: 575px) {
  .upper-banner {
    .parent {
      height: 250px;
      .content {
        width: 37%;
        left: 2%;
        h1 {
          font-size: 24px;
        }
        p {
          font-size: 12px;
        }
        button {
          font-size: 12px !important;
          height: 30px !important;
          width: 90px !important;
        }
      }
    }
  }
}
</style>
