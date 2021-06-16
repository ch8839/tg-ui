<template>
  <div class="form-item">
    <div class="label">开启配送服务</div>
    <el-switch
      :value="deliverySupport"
      :disabled="deliverySupportClickFlag"
      @change="deliverySupportChange"
    ></el-switch>
    <span>{{deliverySupport ? '是' : '否'}}</span>
  </div>
</template>

<script>
export default {
    name: 'deliverySupportSwitch',
    props: {
        _deliverySupport: {
            type: Number,
		},		
    },
    data: function () {
        return {
			deliverySupportClickFlag: false, // 配送保存接口的点击Flag
			// deliverySupport: false
		}
    },
    computed: {
		deliverySupport: {
			get(){
				console.log('this.deliverySupport', this._deliverySupport)
				return this._deliverySupport == 1 ? true: false
			},
			set(newValue){
				console.log('newValue', newValue)
				// this.deliverySupportClickFlag = true
				let isSupport = newValue ? 1 : 2
				this.$emit('change', { _deliverySupport : isSupport} )
				// this.deliverySupportClickFlag = false
			}
		}
	},
    methods: {
        deliverySupportChange(newVal) {
			console.log('>>>newVal', newVal)
            this.deliverySupport = newVal
            // this.saveDeliverySupport()
        },

        saveDeliverySupport() {
            this.deliverySupportClickFlag = true
            axios({
                method: 'post',
                url: this.newApi.SAVE_DELIVERY_SUPPORT_API,
                data: {
                    shopid: this.shopId,
                    deliverysupport: this.deliverySupport ? 1 : 2,
                    bizname: this.bizname,
                },
            })
                .then(() => {
                    this.deliverySupportClickFlag = false
                    this.$message({
                        type: 'success',
                        message: '保存成功',
                    })
                })
                .catch((e) => {
                    const errorData = e.response && e.response.data
                    this.deliverySupportClickFlag = false
                    this.deliverySupport = !this.deliverySupport // 如果接口挂了，不应该让用户保存
                    this.$message({
                        type: 'error',
                        message: (errorData && errorData.content) || '未知错误',
                    })
                    window.Owl &&
                        window.Owl.addError(
                            'fetchError: trade/rulemanage/delivery/savedeliverysupport.api',
                            {
                                tags: {
                                    errorMsg: e,
                                    bizName: this.bizname,
                                },
                                category: 'ajaxError',
                            }
                        )
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
</style>
