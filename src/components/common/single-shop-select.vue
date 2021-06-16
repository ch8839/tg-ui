<template>
  <el-popover
    :disabled="disabled"
    trigger="click"
    placement="bottom-start"
    popper-class="jc-single-shop-select-dropdown"
    v-model="visible"
    class="jc-single-shop-select"
    :class="{ 'jc-single-shop-select-expended': visible }"
  >
    <el-input
      slot="reference"
      :disabled="disabled"
      :value="selectedShop.shopName"
      suffix-icon="el-icon-down"
      class="jc-single-shop-select-input"
      readonly
    />
    <div >
      <div class="search-bar-wrap" v-show="filterable">
        <el-input
          style="width: 100%"
          v-model="searchValue"
          genre="line"
          prefix-icon="el-icon-search"
          placeholder="查找门店"
          clearable
        />
      </div>
      <section class="city-shop-wrap">
        <aside class="city-list" v-show="cityList.length > 2">
          <div
            v-for="(item, index) in cityList"
            :key="index"
            class="city-item one-line-ellipsis"
            :class="{ 'city-item-active': activeCity === item }"
            @click="activeCity = item"
          >
            <el-tooltip :content="item" placement="top-start" v-if="item.length > 5" class>
              <span>{{ item }}</span>
            </el-tooltip>
            <template v-else>{{ item }}</template>
            <i class="el-icon-city-active el-icon-right" v-show="activeCity === item" />
          </div>
        </aside>
        <main class="shop-list" :style="{ paddingLeft: cityList.length > 2 ? '120px' : 0 }">
          <div v-show="notFound" class="shop-item">没有查找到相关门店，换个词搜索吧！</div>
          <div
            v-for="(shop, index) in activeList[0]"
            :key="`available-${index}`"
            class="shop-item"
            :class="{ 'shop-item-active': value == shop.shopId }"
            @click="handleSelect(shop)"
          >
            <p class="shop-item-name one-line-ellipsis">
              {{ shop.shopName }}<span v-if="shop.branchName">({{ shop.branchName }})</span>
            </p>
            <i class="el-icon-shop-selected el-icon-check-thick" v-show="value == shop.shopId"></i>
            <div v-if="shop.tips && shop.tips.length > 0" class="shop-item-warning">
              <p v-for="(tips, index) in shop.tips" :key="index" v-html="tips"></p>
            </div>
          </div>
          <div v-show="activeList[1] && activeList[1].length > 0" class="separate-line">
            以下为不可选门店:
          </div>
          <div
            v-for="(shop, index) in activeList[1]"
            :key="`unavailable-${index}`"
            class="shop-item shop-item-disabled"
          >
            <p class="shop-item-name one-line-ellipsis">
              {{ shop.shopName }}<span v-if="shop.branchName">({{ shop.branchName }})</span>
            </p>
            <p class="shop-item-address">{{ shop.address }}</p>
            <div v-show="shop.tips && shop.tips.length > 0" class="shop-item-warning">
              <p v-for="(tips, index) in shop.tips" :key="index" v-html="tips"></p>
            </div>
          </div>
        </main>
      </section>
    </div>
  </el-popover>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    // 是否要处理全国逻辑
    isOperateNational: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeCity: '全国',
      visible: false,
      searchValue: '',
    };
  },
  computed: {
    selectedShop() {
      return this.options.find(shop => shop.shopId == this.value) || {};
    },
    cityShopMap() {
      return this.options.reduce(
        (acc, cur) => {
          if (!acc[cur.cityName]) acc[cur.cityName] = [];
          acc[cur.cityName].push(cur);
          return acc;
        },
        this.isOperateNational ? { 全国: this.options.slice() } : [],
      );
    },
    cityList() {
      return Object.keys(this.cityShopMap).reduce(
        (acc, cur) => {
          if (cur != '全国') acc.push(cur);
          return acc;
        },
        ['全国'],
      );
    },
    activeList() {
      const shops = this.cityShopMap[this.activeCity] || [];
      const searchValue = this.searchValue.trim();
      return shops.reduce(
        (acc, shop) => {
          const { available, shopName = '', shopId, branchName = '' } = shop,
            flag = available || this.value == shopId,
            beSearched =
              searchValue && (shopName.includes(searchValue) || branchName.includes(searchValue));
          if (!searchValue || beSearched) {
            if (flag) acc[0].push(shop);
            else acc[1].push(shop);
          }
          return acc;
        },
        [[], []],
      );
    },
    notFound() {
      return (
        this.searchValue.trim() && this.activeList[0].length <= 0 && this.activeList[1].length <= 0
      );
    },
  },
  methods: {
    handleSelect(shop) {
      this.visible = false;
      if (this.value == shop.shopId) return null;
      this.handleInput(shop.shopId);
    },
    handleInput(v) {
      this.$emit('input', v);
      this.$emit('change', v);
    },
  },
};
</script>
<style lang="scss">
$shop-primary-color: #f63;
$border-color: #eee;
.one-line-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.jc-single-shop-select {
  &-input {
    width: 350px !important;
    .el-input {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .el-icon-down {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: -webkit-transform 0.3s linear;
      transition: -webkit-transform 0.3s linear;
      transition: transform 0.3s linear;
      transition: transform 0.3s linear, -webkit-transform 0.3s linear;
    }
  }
  &-dropdown {
    width: 520px;
    overflow: hidden;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid $border-color;
    border-color: $border-color !important;
    .search-bar-wrap {
      margin-bottom: 12px;
    }
    .city-shop-wrap {
      position: relative;
      height: 250px;
      .city-list {
        position: absolute;
        left: 0;
        top: 0;
        width: 120px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        border-right: 1px solid $border-color;
        .city-item {
          height: 50px;
          line-height: 50px;
          padding-right: 26px;
          cursor: pointer;
          &-active {
            color: $shop-primary-color;
            position: relative;
          }
          .el-icon-city-active {
            line-height: 50px;
            position: absolute;
            right: 5px;
          }
        }
      }
      .shop-list {
        width: 100%;
        height: 100%;
        overflow-x: none;
        overflow-y: auto;
        .shop-item {
          padding: 15px 20px 10px 35px;
          position: relative;
          cursor: pointer;
          vertical-align: top;
          &-active {
            color: $shop-primary-color;
          }
          .el-icon-shop-selected {
            position: absolute;
            font-size: 18px;
            right: 5px;
            top: 50%;
            margin-top: -9px;
          }
          &-name {
            margin-bottom: 5px;
            font-size: 15px;
            font-weight: 600;
            line-height: 16px;
            width: 100%;
          }
          &:hover {
            background: #fafafa;
          }
          &-warning {
            margin-top: 3px;
            font-size: 13px;
            line-height: 18px;
            color: red;
            p {
              white-space: normal;
            }
          }
          &-disabled {
            cursor: not-allowed !important;
            color: #999;
          }
        }
        .separate-line {
          background: #efefef;
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          color: #999;
          width: 100%;
          padding-left: 20px;
        }
      }
    }
  }
  &-expended {
    .jc-single-shop-select-input {
      .el-icon-down {
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
  }
}
</style>
