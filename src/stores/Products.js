import axios from "axios";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("ProductsModule", {
  state: () => ({
    products: [],
    furniture: [],
    fragrances: [],
    beauty: [],
    Groceries: [],
    singleProduct: "",
    categoryProduct: [],
    categories: [
      {
        title: "Beauty",
        route: "beauty",
      },
      {
        title: "Laptops",
        route: "laptops",
      },
      {
        title: "Mens Shirts",
        route: "mens-shirts",
      },
      {
        title: "Mens Shoes",
        route: "mens-shoes",
      },
      {
        title: "Fragrances",
        route: "fragrances",
      },
      {
        title: "women's Bags",
        route: "womens-bags",
      },
      {
        title: "Groceries",
        route: "groceries",
      },
    ],
  }),
  actions: {
    async fetchProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((response) => {
          this.furniture = response.data.products.filter(
            (product) => product.category === "furniture"
          );
          this.fragrances = response.data.products.filter(
            (product) => product.category === "fragrances"
          );
          this.beauty = response.data.products.filter(
            (product) => product.category === "beauty"
          );
          this.Groceries = response.data.products.filter(
            (product) => product.category === "groceries"
          );
          this.products = response.data.products.slice(0, 10);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
    async getProductByCategory(category) {
      await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((response) => {
          this.categoryProduct = response.data.products;
        });
    },
    async getSingleProduct(productId) {
      await axios
        .get(`https://dummyjson.com/products/${productId}`)
        .then((response) => {
          this.singleProduct = response.data;
        });
    },
  },
});
