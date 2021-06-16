<template>
  <div class="city-select-wrap">
     <el-cascader
      :options="options"
      :value="selectedOptions"
      :show-all-levels="false"
      :props="props"
      @change="changeSelectedOptions"
      clearable>
    </el-cascader>
  </div>
</template>

<script>
export default {
  props: ['scope', 'list'],
  data() {
    return {
      props: { multiple: true },
      options: [],
      selectedOptions: []
    }
  },
  mounted() {
    this.options = this.scope.row.rowCityList
    this.selectedOptions = this.scope.row.rowSelectedCityList
  },
  methods: {
    changeSelectedOptions(val) {
      const rowIndex = this.scope.$index
      this.scope.row.rowSelectedCityList = val
      this.selectedOptions = val
      this.list.map((item, index) => {
        if (index === rowIndex) {
          item.rowSelectedCityList = val
        } else {
          item.rowCityList.map(q => {
            q.children.map(p => p.disabled = false)
          })
          val.map(j => {
            item.rowCityList[j[0]].children[j[1]].disabled = true
          })
          item.rowCityList.map(rowItem => rowItem.disabled = _(rowItem.children).map('disabled').every(Boolean))
        }
        this.$set(this.list, index, item)
      })
    }
  },
  watch: {
    'list': {
      handler(newVal, oldVal) {
        if (!_.size(newVal)) return
        this.options = newVal[this.scope.$index].rowCityList
        this.selectedOptions = newVal[this.scope.$index].rowSelectedCityList
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
@import "~@/theme/element/cascader.css";
.city-select-wrap {
  .el-cascader {
    width: 300px;
    .el-input {
      width: 300px;
    }
  }
}
</style>
