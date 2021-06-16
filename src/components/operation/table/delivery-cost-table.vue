<template>
  <div class="delivery-cost-table">
    <table-base
      :table="table"
      :list="list"
    ></table-base>
    <el-button :disabled="!showNationalExpressButton" class="delivery-cost-item-add-btn" @click="addDeliveryCostTableItem">+ 添加</el-button>
  </div>
</template>

<script>
import tableBase from '../../common/table/base'; // 基础表格组件
import citySelect from '../table-cell/city-select'; // 配送城市选择组件
import carriage from '../table-cell/carriage'; // 运费设置组件
import operate from '../table-cell/operate'; // 操作组件
export default {
  name: 'delivery-cost-table',
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    showNationalExpressButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      table: {
        columns: [
          {
            prop: 'citySelect',
            label: '配送城市',
            width: 350,
            component: citySelect,
          },
          {
            prop: 'carriage',
            label: '运费',
            width: 350,
            component: carriage,
          },
          {
            prop: 'operate',
            label: '操作',
            width: 100,
            component: operate,
          }
        ]
      }
    }
  },
  components: {
    'table-base': tableBase,
    'city-select': citySelect,
    carriage,
    operate
  },
  methods: {
    addDeliveryCostTableItem() {
      this.$emit('addDeliveryCostTableItem')
    }
  },
}
</script>

<style lang="less">
.delivery-cost-table {
  margin-top: 10px;
}
.delivery-cost-item-add-btn {
  border: 1px solid #EBEEF5 !important;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
