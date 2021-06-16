<template>
  <div>
   <div class="form-item" v-if="!isCosmeticsEcommerce">
		<div class="label">起送费</div>
		<el-input :value="minAmountText" :readonly="true" class="form-item-input">
			<el-button slot="append" size="mini" @click="openDialog('delieryMinAmountVisible')">编辑</el-button>
		</el-input>
	</div>
    <!-- 起送价格弹窗 -->
	<el-dialog class="dialog-fix time-dialog" :visible="delieryMinAmountVisible" @close="closeDialog('delieryMinAmountVisible')">
		<div class="" slot="title">起送费</div>
		订单金额超过
		<el-input-number v-model="minAmount" :controls="false" :precision="1" :max="10000" :min="0"></el-input-number>
		元起送
		<div slot="footer">
			<el-button @click="closeDialog('delieryMinAmountVisible')">取消</el-button>
			<el-button class="button-fix" @click="saveMinAmount" :disabled="false">确定</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'minAmountTextInput',
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
	// 保存起送费
	saveMinAmount() {
		const data = {
			shopid: this.shopId,
			bizname: this.bizname,
			minAmount: this.minAmount,
		};
		axios({
			url: this.newApi.SAVE_MINAMOUNT_API,
			method: 'post',
			data,
		})
		.then((response) => {
			if (response && response.status == 200) {
				this.$message({
					type: 'success',
					message: '保存成功',
				});
			}
			this.delieryMinAmountVisible = false;
		})
		.catch(() => {
			this.$message({
				type: 'error',
				message: '保存失败',
			});
			this.delieryMinAmountVisible = false;
		})
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
  width: 30%;
}
</style>
