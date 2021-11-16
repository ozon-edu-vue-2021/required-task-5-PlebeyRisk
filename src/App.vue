<template>
  <div id="app">
    <Navigation :class="$style.navigation" :items="navigationLinks" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  computed: {
    ...mapGetters(['favoritesCount', 'cartProductsCount']),
    navigationLinks() {
      return [
        { id: 'home', name: 'Главная', path: '/' },
        {
          id: 'favorites',
          name: 'Избранное',
          path: '/favorites',
          count: this.favoritesCount,
        },
        {
          id: 'cart',
          name: 'Корзина',
          path: '/cart',
          count: this.cartProductsCount,
        },
      ];
    },
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    ...mapActions(['loadProducts']),
    ...mapMutations(['showPreloader', 'hidePreloader']),
  },
};
</script>

<style module>
.navigation {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--white);
}
</style>
