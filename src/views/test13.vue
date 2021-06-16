<template>
  <core-container
    class="booking-escaperoom-order-detail">
    <template v-slot="{ $core }">
      <!-- 订单状态 -->
      <div v-for="(componentItem, index) of transform($core.componentsList)" :key="index">
        <component :is="componentItem.name" :key="index" v-bind="componentItem.vBind" v-on="componentItem.vOn">
            {{ componentItem.template}}
        </component>
        <div v-if="componentItem['morph-gap-next']" class="morph-gap"></div>
      </div>
      
    </template>
  </core-container>
</template>

<script>
import Vue from 'vue'
import coreContainer from '../components/core-container/index'
import myComponent1 from '../components/myComponent1'
import testComponent1 from '../components/testComponent1'
import testComponent2 from '../components/testComponent2'

// Vue.use(myComponent1)
// Vue.use(testComponent1)
// Vue.use(testComponent2)

export default {
    components: {
        coreContainer,
        myComponent1,
        testComponent1,
        testComponent2
    },
    data() {
        return {
            comMap: {},

        }
    },
    created() {
        this.comMap = {
            'testComponent': {
                name: 'myComponent1',
                vBind: {
                    fun1: function(val) {
                        console.log('hhh', val)
                    }
                },
                vOn: {

                },
                'morph-gap-next': true,
                template: `
                    <p>hhhh</p>
                `
            },
            'testComponent1': {
                name: 'testComponent1',
                vBind: {
                    test2_msg: '牛逼'
                }
            },
            'testComponent2': {
                name: 'testComponent2',
                vBind: {
                    userInfo: {
                        name: 'Tom',
                        age: 12
                    }
                },
                vOn: {
                    goShop: function(val) {
                        console.log('shopId:', val)
                    }
                }
            }
        }

    },
    
    mounted() {

    },
    methods: {
        transform(componentsList) {
            let res = []
            console.log('>>>componentsList', componentsList)
            for(let i=0; i<componentsList.length; i++){
                let oriComponentName = componentsList[i]
                let { name, vBind, vOn, 'morph-gap-next':showGap, template } = this.comMap[oriComponentName] || {}
                if(!name) continue
                res.push({
                    name,
                    vBind,
                    vOn,
                    'morph-gap-next':showGap,
                    template
                })
            }
            console.log('res', res)
            return res
        }
    }
}
</script>

<style>

</style>