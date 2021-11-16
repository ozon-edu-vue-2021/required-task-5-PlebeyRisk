<template>
  <div class="page">
    <div v-if="isShowProductList" class="container">
      <div :class="$style.list">
        <template v-if="!isProductsLoading">
          <CatalogItem v-for="item in products" :key="item.id" :data="item" />
        </template>

        <template v-else>
          <ListItemSkeleton
            v-for="n in 12"
            :key="n"
            :class="$style['list-item-skeleton']"
          />
        </template>
      </div>
    </div>

    <EmptyTextBlock
      v-else
      text="Продуктов пока нет"
      description="Но в скором времени они обязательно появятся!"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import CatalogItem from '../components/CatalogItem.vue';
import ListItemSkeleton from '../components/skeletons/ListItemSkeleton.vue';
import EmptyTextBlock from '../components/EmptyTextBlock.vue';

export default {
  name: 'Home',
  components: {
    CatalogItem,
    ListItemSkeleton,
    EmptyTextBlock,
  },
  computed: {
    ...mapState(['products', 'isProductsLoading', 'isProductsLoading']),
    isShowProductList() {
      return this.products?.length || this.isProductsLoading;
    },
  },
};
</script>

<style module>
.list {
  grid-gap: 1px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  justify-items: center;
}
.list-item-skeleton {
  grid-column-start: span 4;
  height: 342px;
  width: 100%;
  padding: 0 16px;
  padding-top: 24px;
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
