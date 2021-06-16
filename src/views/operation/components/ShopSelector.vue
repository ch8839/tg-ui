<template>
  <singleShopSelector
    :options="shopList"
    :value="shopId"
    :isOperateNational="false"
    @change="searchDistributionConfig"
  />
</template>

<script>
import singleShopSelector from '../../../components/common/single-shop-select'
export default {
    name: 'ShopSelector',
    props: {
        _shopId: {
            type: [String, Number],
        },
        extraValue: {
			type: Object
		}
    },
    components: { singleShopSelector },
    data: function () {
        return {
            // shopList: this.value.shopList
        }
    },
    computed : {
        shopId: {
            get(){
                return this._shopId
            },
            set(newValue){
                console.log('>>_shopIdnewValue', newValue)
                this.$emit('change', { _shopId: newValue} )
            }
        },
        shopList(){
            console.log('shopList', this.extraValue)
            return this.extraValue.shopList
        }
    },
     methods: {
        async searchDistributionConfig(shopId) {
            console.log('>>shopId', shopId)
            // 内层门店改动后，同步切换外层门店
            // const changedShop = !this.isMobile && await triggerShopChange(shopId);
            // if (changedShop) return;

            this.shopId = _.isString(shopId) ? shopId : _.toString(shopId)
            // this.queryDeliverySetting()
        },
  }
}
</script>

<style>
</style>