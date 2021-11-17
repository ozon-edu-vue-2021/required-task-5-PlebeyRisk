<template>
  <div :class="$style['cart-item']">
    <div :class="$style.column">
      <input
        :class="$style.checkbox"
        type="checkbox"
        :checked="selected"
        @change="onChangeChecked"
      />
    </div>

    <div :class="$style.column">
      <div :class="$style['image-wrapper']">
        <img
          :class="$style.image"
          :src="require(`../${data.image}`)"
          :alt="data.dish"
        />
      </div>
    </div>

    <div :class="[$style.column, $style.info]">
      <span :class="$style.name">
        {{ data.dish }}
      </span>

      <div :class="$style.actions">
        <div :class="$style['action-wrapper']">
          <MyButton
            :class="$style.action"
            :textColor="favoriteButtonColor"
            onlyText
            @click="onFavoriteClick"
            >{{ favoriteButtonText }}</MyButton
          >
        </div>

        <div :class="$style['action-wrapper']">
          <MyButton :class="$style.action" onlyText @click="onItemDeleteClick"
            >Удалить</MyButton
          >
        </div>
      </div>
    </div>

    <div :class="[$style.column, $style.cost]">
      {{ this.data.cost }}
      ₽
    </div>

    <div :class="$style.column">
      <CounterInput
        :min="1"
        :max="6"
        :value="data.count"
        @input="onCountChange"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import MyButton from './MyButton.vue';
import CounterInput from './CounterInput.vue';
import defaultTypes from '../constants/defaultTypes';
import colors from '../constants/colors';

export default {
  name: 'CartItem',
  components: {
    MyButton,
    CounterInput,
  },
  props: {
    data: defaultTypes.object(),
    selected: defaultTypes.boolean(),
  },
  computed: {
    favoriteButtonText() {
      return this.isFavorite ? 'В избранном' : 'В избранное';
    },
    favoriteButtonColor() {
      return this.isFavorite ? colors.secondary : colors.primary;
    },
    isInCart() {
      return !!this.$store.getters.productInfoFromCart(this.data?.id);
    },
    isFavorite() {
      return !!this.data?.isFavorite;
    },
  },
  methods: {
    ...mapMutations(['addCart', 'deleteFromCart', 'setProductCountInCart']),
    ...mapActions(['toggleFavoriteProduct']),
    onFavoriteClick() {
      this.toggleFavoriteProduct(this.data?.id);
    },
    onItemDeleteClick() {
      this.deleteFromCart(this.data?.id);
    },
    onChangeChecked(event) {
      this.$emit('select', event?.target?.checked);
    },
    onCountChange(val) {
      this.setProductCountInCart({ productId: this.data?.id, count: val });
    },
  },
};
</script>

<style module>
.cart-item {
  display: flex;
  padding: 15px 0;
}
.image-wrapper {
  max-height: 92px;
  max-width: 92px;
}
.column {
  margin-left: 16px;
}
.column:first-child {
  margin-left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cost {
  flex-basis: 100px;
  font-weight: bold;
  font-size: 15px;
  line-height: 1;
  white-space: nowrap;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  line-height: 1.29;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.actions {
  margin-top: 10px;
  display: flex;
  flex-wrap: nowrap;
}
.action-wrapper {
  padding: 0 10px;
  border-right: 1px solid var(--grayLighten);
}
.action-wrapper:first-child {
  padding-left: 0;
}
.action-wrapper:last-child {
  padding-right: 0;
  border: none;
}
.action {
  height: 20px;
  padding: 0;
  font-weight: 400;
  color: var(--primaryLighten);
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
.checkbox {
  cursor: pointer;
}
</style>
