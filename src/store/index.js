import Vue from 'vue';
import Vuex from 'vuex';
import getRandomImageUrl from '../utils/getRandomImageUrl';
import deleteDuplicates from '../utils/deleteDuplicates';
import { errorHandler } from '../error';

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    cartProducts: [],
    products: [],
    isProductsLoading: false,
  }),
  getters: {
    productInfoFromCart: (state) => (productId) => {
      return state.cartProducts.find((item) => item?.id === productId);
    },
    favorites: (state) => {
      return state.products.filter((item) => item?.isFavorite);
    },
    favoritesCount: (state, getters) => {
      return getters.favorites?.length;
    },
    cartProductsCount: (state, getters) => {
      return getters.cart?.length || 0;
    },
    cartProductsTotalCount(state) {
      return state.cartProducts.reduce(
        (acc, cartProduct) => acc + (cartProduct?.count || 0),
        0
      );
    },
    cartProductsTotalCost(state) {
      return state.cartProducts.reduce((acc, cartProduct) => {
        const foundProduct = state.products.find(
          (item) => item?.id === cartProduct?.id
        );

        return acc + (foundProduct?.cost || 0) * (cartProduct?.count || 0);
      }, 0);
    },
    cart: (state) => {
      return state.cartProducts.reduce((acc, cartProduct) => {
        const foundProduct = state.products.find(
          (item) => item?.id === cartProduct?.id
        );

        return foundProduct
          ? [...acc, { ...foundProduct, ...cartProduct }]
          : acc;
      }, []);
    },
  },
  mutations: {
    addFavorite: (state, productId) => {
      const foundProductIndex = state.products.findIndex(
        (item) => item?.id === productId
      );

      const foundProduct = state.products?.[foundProductIndex];
      if (foundProduct?.isFavorite) {
        return;
      }

      Vue.set(state.products, foundProductIndex, {
        ...foundProduct,
        isFavorite: true,
      });
    },
    deleteFromFavorites: (state, productId) => {
      const foundProductIndex = state.products.findIndex(
        (item) => item?.id === productId
      );

      const foundProduct = state.products?.[foundProductIndex];
      if (!foundProduct?.isFavorite) {
        return;
      }

      Vue.set(state.products, foundProductIndex, {
        ...foundProduct,
        isFavorite: false,
      });
    },
    setProductCountInCart: (state, payload = {}) => {
      const { productId, count } = payload;

      if (!productId || !count) {
        return;
      }

      const foundProductIndex = state.cartProducts.findIndex(
        (item) => item?.id === productId
      );

      if (foundProductIndex < 0) {
        return;
      }

      Vue.set(state.cartProducts, foundProductIndex, {
        ...state.cartProducts?.[foundProductIndex],
        count,
      });
    },
    resetFavorites: (state) => {
      state.products = state.products.map((item) => ({
        ...item,
        isFavorite: false,
      }));
    },
    addCart: (state, productId) => {
      if (state.cartProducts.some((item) => item?.id === productId)) {
        return;
      }

      state.cartProducts.unshift({
        id: productId,
        count: 1,
      });
    },
    deleteFromCart: (state, payload) => {
      if (payload?.length && Array.isArray(payload)) {
        state.cartProducts = state.cartProducts.filter((cartProduct) =>
          payload[0]?.id !== undefined
            ? payload.some((itemId) => itemId !== cartProduct?.id)
            : !payload.includes(cartProduct?.id)
        );
        return;
      }

      state.cartProducts = state.cartProducts.filter(
        (item) => item?.id !== payload
      );
    },
    resetCart: (state) => {
      state.cartProducts = [];
    },
    setProducts: (state, payload) => {
      state.products = payload && Array.isArray(payload) ? payload : [];
    },
    setProductsLoading(state, payload) {
      state.isProductsLoading = !!payload;
    },
  },
  actions: {
    toggleFavoriteProduct: ({ state, commit }, productId) => {
      const foundProduct = state.products.find(
        (item) => item?.id === productId
      );

      if (foundProduct?.isFavorite) {
        commit('deleteFromFavorites', productId);
        return;
      }

      commit('addFavorite', productId);
    },
    loadProducts: async ({ commit }, { size = 30 } = {}) => {
      const prepareProducts = (arr = []) => {
        return arr.map((item) => ({
          ...item,
          image: getRandomImageUrl(),
          cost: Math.floor(Math.random() * 998) + 99,
          isFavorite: false,
        }));
      };

      commit('setProductsLoading', true);

      try {
        const response = await fetch(
          `https://random-data-api.com/api/food/random_food?size=${size}`
        );

        let products = prepareProducts(
          deleteDuplicates((await response?.json()) || [])
        );

        commit('setProducts', products || []);
      } catch (error) {
        errorHandler(error);
      }

      commit('setProductsLoading', false);
    },
  },
});
