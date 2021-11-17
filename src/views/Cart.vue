<template>
  <div class="page">
    <div v-if="haveItems" :class="['container', $style.container]">
      <div :class="$style.block">
        <List
          :items="cart"
          v-model="selectedItems"
          @delete-selected="onDeleteSelected"
        >
          <template #item="{ item, toggleSelect, isSelected }">
            <CartItem
              :data="item"
              :selected="isSelected"
              @select="toggleSelect(item)"
            />
          </template>
        </List>
      </div>
      <div :class="[$style.block, $style.order]">
        <div :class="$style.content">
          <div :class="[$style.header, $style.section]">
            <MyButton :class="$style['order-button']" @click="onOrderClick"
              >Перейти к оформлению</MyButton
            >
          </div>
          <div :class="[$style.section, $style['cart-info']]">
            <div :class="[$style['cart-info-section'], $style['count']]">
              <span :class="$style['title']">Ваша корзина</span>
              <span :class="$style['text']">{{ productTotalCount }}</span>
            </div>
            <div :class="$style['cart-info-section']">
              <span :class="$style['title']">Общая стоимость</span>
              <span :class="$style['text']">{{ cartProductsTotalCost }} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <EmptyTextBlock
      v-else
      text="Корзина пуста"
      description="Воспользуйтесь поиском, чтобы найти всё что нужно."
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CartItem from '../components/CartItem.vue';
import EmptyTextBlock from '../components/EmptyTextBlock.vue';
import MyButton from '../components/MyButton.vue';
import List from '../components/List.vue';
import pluralForm from '../utils/pluralForm';

export default {
  name: 'Cart',
  components: {
    CartItem,
    List,
    EmptyTextBlock,
    MyButton,
  },
  data() {
    return {
      selectedItems: [],
    };
  },
  computed: {
    ...mapGetters(['cart', 'cartProductsTotalCount', 'cartProductsTotalCost']),
    haveItems() {
      return this.cart?.length;
    },
    productTotalCount() {
      return `${this.cartProductsTotalCount} ${pluralForm(
        this.cartProductsTotalCount,
        'предмет',
        'предмета',
        'предметов'
      )}`;
    },
    alertMessage() {
      return `Вы оформили заказ ${this.cartProductsTotalCount} ${pluralForm(
        this.cartProductsTotalCount,
        'предмета',
        'предметов',
        'предметов'
      )} на сумму ${
        this.cartProductsTotalCost
      } ₽\n\nСписок товаров:\n${this.cart.reduce(
        (acc, product) => (acc += product?.dish + '\n'),
        ''
      )}
      `;
    },
  },
  methods: {
    ...mapMutations(['deleteFromCart']),
    onDeleteSelected() {
      this.deleteFromCart(this.selectedItems);
    },
    onOrderClick() {
      window.alert(this.alertMessage);
    },
  },
};
</script>

<style module>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: inherit;
}
.block {
  flex: 0 0 calc(66.6666% - 24px);
  max-width: calc(66.6666% - 24px);
  position: relative;
}
.block.order {
  flex: 0 0 33.3333%;
  max-width: 33.3333%;
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.block.order .content {
  position: sticky;
  top: 64px;
  background-color: var(--white);
}
.block.order .section {
  padding: 24px;
}
.cart-info-section {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--grayLighten);
  font-size: 20px;
  line-height: 1.29;
  font-weight: 700;
  padding-bottom: 20px;
}
.cart-info-section:last-child {
  border-bottom: none;
}
.cart-info-section.count .text {
  color: var(--secondaryGray);
  font-size: 14px;
  font-weight: 400;
}
.order-button {
  width: 100%;
  height: 56px;
  background-color: var(--green);
}
</style>
