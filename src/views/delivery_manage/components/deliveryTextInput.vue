<template>
  <div class="home">
    <h2>deliveryTextInput</h2>

    <input v-model="deliveryText" class="form-item-input"/>
    <button @click="change">修改</button>
    <el-dialog
      class="dialog-fix time-dialog"
      :visible="delieryMinAmountVisible"
      @close="closeDialog('delieryMinAmountVisible')"
    >
      <div class slot="title">起送费</div>输入
      <el-input v-model="minAmount"></el-input>

      <div slot="footer">
        <el-button @click="closeDialog('delieryMinAmountVisible')">取消</el-button>
        <el-button class="button-fix" @click="saveMinAmount" :disabled="false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'deliveryTextInput',
  props: {
    value: {
      type: String,
    },
  },
  data: function () {
    return {
      // deliveryText: '配送时间：' +  this.value, //不能直接对props接收的值修改，声明一个指向post_value的引用
      delieryMinAmountVisible: false,
    //   minAmount: this.value 
    }
  },
  computed: {
    deliveryText: {
      get(){
        return '配送时间：' +  this.value
      },
      // set(newValue){
      //   console.log('newValue', newValue)
      //   this.value = newValue
        
      // }
      
    },
    minAmount: {
        get(){
            return this.value
        },
        set(newValue){
            this.$emit('change', newValue)
        }
    }
  },


  methods: {
    change() {
      this.delieryMinAmountVisible = true
    },
    closeDialog() {
      this.delieryMinAmountVisible = false
    },
    saveMinAmount() {
      this.$emit('change', this.minAmount)
      this.delieryMinAmountVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
//重用代码块：使用 @mixin进行代码块的定义，使用@include进行已定义的代码块的调用；
.home {
  border: 1px solid #2cc7a5;
  padding: 10px;
  display: block;
  margin-bottom: 10px;
}

.form-item-input {
    width: 30%
}
</style>
