import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  showCart: false,
  articles: {},
  total: 0,
};

function getTotal(articles) {
  return Object.values(articles)
    .map((article) => article.quantity * article.price)
    .reduce((total, price) => total + price, 0);
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addArticle(state, action) {
      const id = action.payload.id;
      if (id in state.articles) {
        if (state.articles[id].quantity < 9) ++state.articles[id].quantity;
      } else {
        state.articles[id] = {
          ...action.payload,
          quantity: 1,
          price: parseFloat(action.payload.price),
        };
      }

      state.total = getTotal(state.articles);
    },
    changeQuantity(state, action) {
      if (action.payload.id in state.articles) {
        action.payload.quantity = Math.min(action.payload.quantity, 9);
        if (action.payload.quantity <= 0) {
          delete state.articles[action.payload.id];
        } else {
          state.articles[action.payload.id].quantity = action.payload.quantity;
        }
        state.total = getTotal(state.articles);
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
