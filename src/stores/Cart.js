import { defineStore } from "pinia";

export const cartStore = defineStore("cartStore", {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addItem(item) {
      console.log(item);
      let exists = false;
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id === item.id) {
          this.cartItems[i].quantity += item.quantity;
          exists = true;
          break;
        }
      }
      if (!exists) {
        this.cartItems.push(JSON.parse(JSON.stringify(item)));
      }
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    getCartItems() {
      if (localStorage.getItem("cartItems")) {
        this.cartItems = JSON.parse(localStorage.getItem("cartItems"));
      }
    },
    removeItem(item) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id === item.id) {
          this.cartItems.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    clearCart() {
      this.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    setLocalStorage() {
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
  },
});
