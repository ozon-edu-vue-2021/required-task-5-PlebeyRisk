<template>
  <div class="page">
    <div v-if="haveFavorites" class="container">
      <div :class="$style.list">
        <CatalogItem v-for="item in favorites" :key="item.id" :data="item" />
      </div>
    </div>

    <EmptyTextBlock
      v-else
      text="В Избранном пока ничего нет"
      description="Добавляйте товары в Избранное с помощью ❤️️"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CatalogItem from '../components/CatalogItem.vue';
import EmptyTextBlock from '../components/EmptyTextBlock.vue';

export default {
  name: 'Favorites',
  components: {
    CatalogItem,
    EmptyTextBlock,
  },
  computed: {
    ...mapGetters(['favorites']),
    haveFavorites() {
      return this.favorites?.length;
    },
  },
  methods: {},
};
</script>

<style module>
.container {
  padding: 25px;
  background-color: var(--white);
  min-height: calc(100vh - 64px);
}
.list {
  grid-gap: 1px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background-color: var(--white);
}
.empty {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}
.empty-description {
  margin-top: 10px;
  color: var(--gray);
  font-size: 16px;
  font-weight: 400;
  margin-top: 16px;
}
</style>
