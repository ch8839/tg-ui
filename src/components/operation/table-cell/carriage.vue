<template>
  <div class="carriage-wrap">
    <div class="default-carriage-unit-price-setting">
      默认<el-input class="carriage-input" v-model="baseNum" placeholder="请输入" />件内
      <el-input class="carriage-input" v-model="basePrice" placeholder="请输入" />元；
    </div>
    <div class="several-carriage-unit-price-setting">
      每增加<el-input class="carriage-input" v-model="overNum" placeholder="请输入" />件，运费增加
      <el-input class="carriage-input" v-model="overPrice" placeholder="请输入" />元；
    </div>
  </div>
</template>

<script>
export default {
  props: ['scope', 'list'],
  data() {
    return {
      baseNum: '',
      basePrice: '',
      overNum: '',
      overPrice: ''
    }
  },
  mounted() {
    const feeInfo = this.scope.row.feeInfo || {}
    this.baseNum = feeInfo.baseNum
    this.basePrice = feeInfo.basePrice
    this.overNum = feeInfo.overNum
    this.overPrice = feeInfo.overPrice
  },
  methods: {
    judgeSingleBit(val) {
      const singleBitRegular = /^(\-)*(\d+)\.(\d).*$/;
      return singleBitRegular.test(val)
    },
    judgeInt(val) {
      const integerRegular = /^\+?[1-9][0-9]*$/; // 正整数正则
      return integerRegular.test(val)
    }
  },
  watch: {
    'list': {
      handler(newVal, oldVal) {
        if (!(newVal && newVal.length)) return
        const feeInfo = newVal[this.scope.$index].feeInfo
        this.baseNum = feeInfo.baseNum
        this.basePrice = feeInfo.basePrice
        this.overNum = feeInfo.overNum
        this.overPrice = feeInfo.overPrice
      },
      deep: true
    },
    baseNum(newVal, oldVal) {
      if (this.judgeInt(newVal) || newVal === '') {
        this.baseNum = newVal
      } else {
        this.baseNum = oldVal
      }
      this.scope.row.feeInfo.baseNum = this.baseNum
      this.$set(this.list, this.scope.row.$index, this.scope.row)
    },
    basePrice(newVal, oldVal) {
      if (this.judgeInt(newVal) || newVal === '' || newVal === '0') {
        this.basePrice = newVal
      } else {
        this.basePrice = oldVal
      }
      this.scope.row.feeInfo.basePrice = this.basePrice
      this.$set(this.list, this.scope.row.$index, this.scope.row)
    },
    overNum(newVal, oldVal) {
      if (this.judgeInt(newVal) || newVal === '') {
        this.overNum = newVal
      } else {
        this.overNum = oldVal
      }
      this.scope.row.feeInfo.overNum = this.overNum
      this.$set(this.list, this.scope.row.$index, this.scope.row)
    },
    overPrice(newVal, oldVal) {
      if (this.judgeInt(newVal) || newVal === '' || newVal === '0') {
        this.overPrice = newVal
      } else {
        this.overPrice = oldVal
      }
      this.scope.row.feeInfo.overPrice = this.overPrice
      this.$set(this.list, this.scope.row.$index, this.scope.row)
    }
  }
}
</script>

<style lang="less">
.carriage-input {
  padding-left: 5px;
  padding-right: 5px;
  .el-input__inner {
    border-radius: 10px;
  }
}
</style>
