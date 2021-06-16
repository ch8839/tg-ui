<template>
  <div class="home">
    <component
      v-for="(item, index) of componentConfig"
      :key="index"
      :is="item.componentName"
      :value="formData[item.valueName]"
      :ref="item.componentName"
    ></component>
    <button @click="submit">submit</button>
    <p>
        formdata的数据为:
    </p>
    <p>
        {{JSON.stringify(formData)}}
    </p>
  </div>
</template>

<script>
let shopList = [
  {
    ShopId: '1',
    deliverySupport: true,
    deliveryText: '1:00 ~ 3:00',
  },
  {
    ShopId: '2',
    deliverySupport: false,
    deliveryText: '12:00 ~ 15:00',
  },
  {
    ShopId: '3',
    deliverySupport: true,
    deliveryText: '19:00 ~ 20:00',
  },
]
import {
  ShopSelector,
  deliverySupportSwitch,
  deliveryTextInput,
} from './components/index.js'

export default {
  name: 'delivery_manage',
  components: { ShopSelector, deliverySupportSwitch, deliveryTextInput },
  data: function () {
    return {
      componentConfig: [],
      formData: {},
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
    console.log('env', process.env)
    this.componentConfig = [
      {
        componentName: 'ShopSelector',
        valueName: 'ShopId',
      },
      {
        componentName: 'deliverySupportSwitch',
        valueName: 'deliverySupport',
      },
      {
        componentName: 'deliveryTextInput',
        valueName: 'deliveryText',
      },
    ]
    this.formData = shopList[0]
  },

  mounted() {
    console.log('ref', this.$refs.deliveryTextInput)
    this.componentConfig.forEach((component) => {
      let componentName = component.componentName
      let valueName = component.valueName
      this.$refs[componentName][0].$on('change', (msg) => {
        console.log(`${componentName}-msg`, msg)
        if (componentName == 'ShopSelector') {
          this.formData = shopList.find((item) => item.ShopId == msg)
        } else {
          this.formData[valueName] = msg
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
