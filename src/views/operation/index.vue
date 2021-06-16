<template>
  <div class="home">
    <component
      v-for="(item, index) of componentConfig"
      :key="index"
      :is="item.componentName"
      v-bind="formData[item.componentName]"
      :shopId="shopId"
      :extraValue="item.extraValue"
      :ref="item.componentName"
    ></component>
    <button @click="submit">submit</button>
    <p>formdata的数据为:</p>
    <p>{{JSON.stringify(formData)}}</p>
  </div>
</template>

<script>
import { ShopSelector, deliverySupportSwitch, timeTextInput, deliveryTextInput} from './components/index.js'

export default {
    name: 'delivery_manage',
    components: { ShopSelector, deliverySupportSwitch, timeTextInput,  deliveryTextInput},
    data: function () {
        return {
            componentConfig: [],
            formData: {},
        }
    },
    computed: {
        shopList(){
            return [
                {
                    available: true,
                    cityName: '全国',
                    shopId: 22387192,
                    shopName: '宠爱它宠物店（东绣路店）',
                },
                {
                    available: true,
                    cityName: '全国',
                    shopId: 19319594,
                    shopName: '花奈儿鲜花',
                },
            ]
        },
        shopId(){
            return this.formData.shopId
        }
    },

    methods: {
        getComponentsValue(name) {
            console.log('name', name)
            let component = this.componentConfig.find(
                (item) => item.componentName == name
            )
            console.log('component', component)
            return this.formData[component.valueName]
        },

        submit() {
            console.log('formdata', this.formData)
        },
    },

    beforeMount() {
        this.componentConfig = [
            {
                componentName: 'ShopSelector',
                extraValue: {
                    shopList: this.shopList
                }
            },
            {
                componentName: 'deliverySupportSwitch',
            },
            {
                componentName: 'timeTextInput',
            },
            {
                componentName: 'deliveryTextInput',
            }
        ]
        this.formData = {
            ShopSelector: {
                _shopId: 22387192,
            },
            deliverySupportSwitch: {
                _deliverySupport: 1,
            },
            timeTextInput: {
                _deliveryTimeList: [
                    {"startTime":"12:00","endTime":"13:00"},
                    {"startTime":"13:00","endTime":"14:00"},
                    {"startTime":"14:00","endTime":"16:00"},
                    {"startTime":"16:00","endTime":"20:00"},
                    {"startTime":"20:00","endTime":"24:00"}
                ],
            },
            deliveryTextInput: {
                _deliveryProvinceFeeList: [
                    {   
                        feeInfo: {
                            baseNum: 10,
                            basePrice: "12",
                            overNum: 2,
                            overPrice: "5"
                        },
                        feeInfoId: "10-12-2-5",
                        provinceCode: "510000",
                        provinceName: "四川省"
                    },
                    {   
                        feeInfo: {
                            baseNum: 999,
                            basePrice: "20",
                            overNum: 10,
                            overPrice: "2"
                        },
                        feeInfoId: "999-20-10-2",
                        provinceCode: "310000",
                        provinceName: "上海市"
                    },
                ],
                _deliveryRangeFeeList: [],
                _deliveryType: 3
            }
        }
    },

    mounted() {
        this.componentConfig.forEach((component) => {
            let componentName = component.componentName
            // let valueName = component.valueName
            this.$refs[componentName][0].$on('change', (msg) => {
                console.log(`${componentName}-msg`, msg)
                for(let key in msg){
                    this.formData[componentName][key] = msg[key]
                }
            })
        })
        // this.$refs.deliveryTextInput[0].$on('input', (msg)=>{
        //   console.log('msg', msg)
        //   this.formData.deliveryText = msg
        // })

        //  this.$refs.deliverySupportSwitch[0].$on('change', (msg)=>{
        //   console.log('msg', msg)
        //   this.formData.deliverySupport = msg
        // })
    },
}
</script>

<style lang="scss" scoped>
</style>
