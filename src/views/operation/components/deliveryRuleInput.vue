<template>
  <div>
    <!-- v-if="isCosmeticsEcommerce" -->
    <div class="form-item">
      <div class="label">包邮规则</div>
      <el-input :value="deliveryFreeConfig" :readonly="true" class="form-item-input">
        <el-button slot="append" size="mini" @click="openDialog('deliveryRuleVisible')">编辑</el-button>
      </el-input>
    </div>
    <el-dialog
      class="dialog-fix delivery-rule"
      :visible="deliveryRuleVisible"
      @close="closeDialog('deliveryRuleVisible')"
    >
      <div class slot="title">包邮规则</div>
      <div>
        <div class="sub-title">包邮规则</div>
        <span>订单满</span>
        <el-input class="input-postage-price" placeholder="请输入" v-model="postagePrice"></el-input>
        <span>元包邮</span>
      </div>
      <div slot="footer">
        <el-button @click="closeDialog('deliveryRuleVisible')">取消</el-button>
        <el-button class="button-fix" :disabled="!postagePrice" @click="saveDeliveryRule">保存设置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  	name: 'deliveryRuleInput',
  	props: {
    	value: {
      		type: Object,
    	},
  	},
	data: function () {
		return {
		
		}
	},
	computed: {

	},
  	methods: {
		openDialog(visible) {
			this[visible] = true
		},
		closeDialog(visible) {
			this[visible] = false
			this.queryDeliverySetting()
		},
		// 保存包邮规则
		saveDeliveryRule() {
			const params = {
				minAmount: this.postagePrice,
				bizname: this.bizname,
				shopid: this.shopId
			}
			const load = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			axios({
				method: 'post',
				url: this.newApi.SAVE_DELIVERY_RULE_API,
				data: params
			}).then(res => {
				this.$message({
					type: 'success',
					message: '保存成功',
				});
				this.closeDialog('deliveryRuleVisible')
			}).catch(e => {
				const errorData = e.response && e.response.data
				this.$message({
					type: 'error',
					message: errorData && errorData.content || '未知错误',
				});
			}).then(() => {
				load.close()
			})
		},
  	}
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
  width: 30%;
}
</style>
