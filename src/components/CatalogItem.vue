<template>
  <div :class="$style['catalog-item']">
    <div :class="$style['favorite-icon']" @click="onFavoriteClick">
      <Icon :name="favoriteIconName" :color="favoriteIconColor" />
    </div>
    <div :class="$style['image-wrapper']">
      <img
        :class="$style.image"
        :src="require(`../${data.image}`)"
        :alt="data.dish"
      />
    </div>
    <div :class="$style.content">
      <span :class="$style.cost">
        {{ data.cost }}
        ₽
      </span>

      <span :class="$style.name">
        {{ data.dish }}
      </span>

      <span :class="$style.description">
        {{ description }}
      </span>

      <div :class="$style.actions">
        <MyButton v-if="!isInCart" @click="onCartClick">В корзину</MyButton>
        <CounterInput
          v-else
          :min="0"
          :max="6"
          :value="count"
          @input="onCountChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import Icon from './Icon.vue';
import MyButton from './MyButton.vue';
import CounterInput from './CounterInput.vue';
import defaultTypes from '../constants/defaultTypes';
import colors from '../constants/colors';
import truncate from '../utils/truncate';

export default {
  name: 'CatalogItem',
  components: {
    Icon,
    MyButton,
    CounterInput,
  },
  props: {
    data: defaultTypes.object(),
  },
  computed: {
    favoriteIconColor() {
      return this.isFavorite ? colors.secondary : colors.primary;
    },
    favoriteIconName() {
      return this.isFavorite ? 'favorite' : 'favorite-border';
    },
    isInCart() {
      return !!this.$store.getters.productInfoFromCart(this.data?.id);
    },
    isFavorite() {
      return !!this.data?.isFavorite;
    },
    dataFromCart() {
      return this.$store.getters.productInfoFromCart(this.data?.id) || {};
    },
    count() {
      return this.dataFromCart?.count;
    },
    description() {
      return truncate(this.data?.description || '', 25 * 3, true);
    },
  },
  methods: {
    ...mapMutations(['addCart', 'deleteFromCart', 'setProductCountInCart']),
    ...mapActions(['toggleFavoriteProduct']),
    onFavoriteClick() {
      this.toggleFavoriteProduct(this.data?.id);
    },
    onCartClick() {
      this.addCart(this.data?.id);
    },
    onCountChange(val) {
      if (!val) {
        this.deleteFromCart(this.data?.id);
        return;
      }
      this.setProductCountInCart({ productId: this.data?.id, count: val });
    },
  },
};
</script>

<style module>
.catalog-item {
  position: relative;
  grid-column-start: span 4;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 0;
  overflow: hidden;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
}
.image-wrapper {
  height: 250px;
  min-height: 250px;
  margin: 24px 16px 8px;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cost {
  margin-top: 5px;
  font-weight: bold;
  font-size: 18px;
}
.name {
  margin-top: 10px;
}
.description {
  display: block;
  flex: 1 0;
  margin-top: 10px;
  color: var(--gray);
}
.actions {
  margin-top: 10px;
}
.favorite-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
