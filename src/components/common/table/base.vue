<template>
  <div class="table-base">
    <el-table
      :data="listData"
      size='mini'
      style='width:100%'
      ref="rbtable"
      class="rbtable"
      v-loading="loading"
      :empty-text="emptyText"
      border>
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.component"
          :fixed="item.fixed"
          :key="index"
          :label="item.label"
          :width="item.width"
          :align="item.align">
          <template slot-scope="scope">
            <component
              v-bind:is="item.component"
              :scope="scope"
              :list="listData"
            ></component>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-row type="flex" justify="right" class="pagination" v-if="pageSize && total>pageSize">
      <el-pagination :current-page="pageNum" @current-change="handleCurrentChange" :page-size="pageSize"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    table: {
      type: Object,
      default: () => ({})
    },
    list: {
      type: Array,
      default: () => ([])
    },
    pageSize: {
      type: [Number, String],
      default: 10
    },
    pageNum: {
      type: [Number, String],
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    total: {
      type: [Number, String],
      default: 0
    },
    emptyText: {
      type: String,
      default: ''
    }
  },
  computed: {
    columns() {
      return (this.table && this.table.columns) || [];
    },
    listData() {
      return this.list || []
    }
  }
}
</script>
<style lang="less">
.el-table th, .el-table td{
    vertical-align: top;
  }
  .rbtable {
    i,
    .action-label {
      cursor: pointer;
      color: deepskyblue;
      margin-right: 3px;
    }
  }
  .el-table__body-wrapper {
    font-size: 14px;
  }
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .hide-empty-tip{
    .el-table__empty-block{
      display: none;
    }
  }
</style>
