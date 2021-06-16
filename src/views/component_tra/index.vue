<template>
  <div>
    <!-- <tra-molecules-checkbox-group v-model="checkbox">apple</tra-molecules-checkbox-group> -->
    <tra-order-submit-submit-product-card v-bind="orderInfo" />

    <tra-shopping-cart-pop-info-panel
      :panelData="productDetail.data"
      :title="productDetail.title"
      :subTitle="productDetail.subTitle"
    ></tra-shopping-cart-pop-info-panel>
  </div>
</template>

<script>
import Vue from 'vue'
import {
    TraOrderSubmitSubmitProductCard,
    TraShoppingCartPopInfoPanel,
} from '@nibfe/tra-app-platform-component'
console.log('traComponents', TraOrderSubmitSubmitProductCard)
// import { TraOrderSubmitSubmitProductCard } from '@nibfe/tra-app-platform-component'
// Vue.use(TraMoleculesCheckboxGroup)
Vue.use(TraOrderSubmitSubmitProductCard)
Vue.use(TraShoppingCartPopInfoPanel)
// console.log('TraOrderSubmitSubmitProductCard', TraOrderSubmitSubmitProductCard)
export default {
    name: 'tra-component',
    data() {
        return {
            checkbox: [],
            orderInfo: {
                shopId: '001',
                shopName: '艺星YStar医疗美容机构',
                shopLabelList: ['随时退', '过期退'],
                productList: [
                    {
                        imgUrl:
                            'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1975334708.jpg',
                        productName: '活颜焕肤超微小气泡美肤·清洁黑头美白嫩肤',
                        iconType: 1,
                        count: 1,
                        currentPrice: '180',
                        discountPrice: '150',
                    },
                    {
                        imgUrl:
                            'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1975334708.jpg',
                        productName:
                            '[3次套餐] 乔雅登·雅致 玻尿酸填充·5ml高端长效填充鼻子塑填充鼻子塑填充鼻子塑',
                        iconType: 0,
                        count: 6,
                        currentPrice: '880',
                        discountPrice: '750',
                    },
                    {
                        imgUrl:
                            'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1975334708.jpg',
                        productName:
                            '[3次套餐] 乔雅登·雅致 玻尿酸填充·5ml高端长效填充鼻子塑填充鼻子塑填充鼻子塑',
                        iconType: 1,
                        count: 88,
                        currentPrice: '999999990',
                        discountPrice: '888888880',
                    },
                ],
            },

            productDetail: {
                title: '以下订单需一起支付',
                subTitle: '由于以下订单共享优惠，需要一起付款',
                data: [
                    {
                        type: 'productInfo',
                        children: [
                            {
                                name: '热玛吉超声刀热玛吉超声刀热玛哈哈哈',
                                count: 'x 1',
                                priceIntro: '到手价',
                                price: '￥400',
                            },
                            {
                                name: '激光点痣告别黑点点告别祛斑黑哈哈哈',
                                count: 'x 1',
                                priceIntro: '到手价',
                                price: '￥400',
                            },
                            {
                                name: '热玛吉超声刀热玛吉超声刀热玛哈哈哈',
                                count: 'x 1',
                                priceIntro: '到手价',
                                price: '￥400',
                            },
                        ],
                    },
                    {
                        type: 'discountInfo',
                        discountIntro: '共优惠',
                        discountPrice: '￥1000',
                        totalIntro: '合计',
                        totalPrice: '￥2440',
                        children: [
                            {
                                key: '',
                                value: '本次支付 ￥1120',
                            },
                            {
                                key: '',
                                value: '到店再付 ￥600',
                            },
                            {
                                key: '',
                                value: '分期再付 ￥720',
                            },
                        ],
                    },
                ],
            },
        }
    },
    // components: {
    //     'tra-order-submit-submit-product-card': TraOrderSubmitSubmitProductCard,
    // },
}
</script>

<style lang="scss">
@import '~@nibfe/morph-style';
</style>