<template>
  <div>
    <div class="form-item">
      <div class="label">可配送/自提时间（宠物电商填写时间请与接单时间保持一致，否则无法生效）</div>
      <el-input :value="timeText" :readonly="true" class="form-item-input">
        <el-button slot="append" size="mini" @click="openDialog('deliveryTimeVisible')">编辑</el-button>
      </el-input>
    </div>
    <el-dialog
      class="dialog-fix time-dialog"
      :visible="deliveryTimeVisible"
      @close="closeDialog('deliveryTimeVisible')"
    >
      <div slot="title">可配送/自提时间</div>
      <div>
        <div>
          <div class="delivery-time-item" v-for="(item, index) in deliveryTime" :key="index">
            <el-time-select
              format="HH:mm"
              v-model="item.startTime"
              @change="checkTime"
              :picker-options="{
                                start: index > 0 ? deliveryTime[index-1].endTime : '00:00',
                                step: '01:00',
                                end: '23:00',
                            }"
              value-format="HH:mm"
            ></el-time-select>~
            <el-time-select
              format="HH:mm"
              v-model="item.endTime"
              value-format="HH:mm"
              @change="checkTime"
              :picker-options="{
                                start: deliveryTime[index].startTime,
                                step: '01:00',
                                end: '24:00',
                                minTime: deliveryTime[index].startTime,
                            }"
            ></el-time-select>
            <el-button type="text" v-if="deliveryTime.length > 1" @click="deleteTime(index)">删除</el-button>
          </div>
        </div>
        <el-button @click="addTimeItem" :disabled="disableAdd">添加</el-button>
      </div>
      <div slot="footer">
        <el-button @click="closeDialog('deliveryTimeVisible')">取消</el-button>
        <el-button class="button-fix" @click="saveDeliveryTime" :disabled="disableConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*
	接收form数据：_deliveryTimeList
	依赖于_deliveryTimeList的自组件数据：deliveryTime, timeText,,
	得到最新deliveryTimeList是数组形式，入参时须转化为Json字符串
*/
import Vue from 'vue'
export default {
    name: 'timeTextInput',
    props: {
        _deliveryTimeList: {
            type: Array,
        },
    },
    data: function () {
        return {
			deliveryTimeVisible: false,
			// deliveryTime : [{startTime: '', endTime: ''}]
		}
    },
    computed: {
		deliveryTimeList: {
			get(){
				return this._deliveryTimeList
			},
			set(newValue){
				this.$emit('change', {_deliveryTimeList: newValue})
			}
		},

		deliveryTime(){
			const hasDeliveryTimeList = this.deliveryTimeList && this.deliveryTimeList.length
			return hasDeliveryTimeList ? this.deliveryTimeList : [{startTime: '', endTime: ''}]; 
		},

		// hasDeliveryTimeList(){
		// 	return this.deliveryTimeList && this.deliveryTimeList.length
		// },

		timeText() {
            let result = '';
            this.deliveryTime.forEach(item => {
                result += item.startTime ? `${item.startTime} ~ ${item.endTime} ` : '';
            });
            return result;
		},
		disableAdd() {
            const l = this.deliveryTime.length - 1;
            if(this.deliveryTime[l].endTime == '') {
                return true;
            }
            if(this.deliveryTime[l].startTime == this.deliveryTime[l].endTime) {
                return true;
            }
            if(l >= 8) {
                return true;
            }
            return false;
		},
		disableConfirm() {
            const l = this.deliveryTime.length - 1;
            if(this.deliveryTime[l].endTime == '') {
                return true;
            }
            if(this.deliveryTime[l].startTime == this.deliveryTime[l].endTime) {
                return true;
            }
            return false;
        },
	},

	// watch: {
	// 	hasDeliveryTimeList:{
	// 		handler(newValue, oldValue){
	// 			console.log('oldValue', oldValue, 'newValue', newValue)
	// 			this.deliveryTime = newValue ? JSON.parse(JSON.stringify(this.deliveryTimeList)) : [{startTime: '', endTime: ''}];
	// 		},
	// 		immediate: true
	// 	}
	// },

	mounted(){
		
	},

    methods: {
        openDialog(visible) {
            this[visible] = true
        },
        closeDialog(visible) {
            this[visible] = false
            // this.queryDeliverySetting()
        },
        fillZero(num) {
            return num >= 10 ? num : '0' + num
        },

        checkTime() {
            let maxTime = 0
            this.deliveryTime.forEach((item, index) => {
                item.startTime =
                    parseInt(maxTime) > parseInt(item.startTime)
                        ? this.fillZero(parseInt(maxTime) + 1) + ':00'
                        : item.startTime
                if (parseInt(item.startTime) >= 24) {
                    this.deliveryTime = this.deliveryTime.slice(0, index)
                    return false
                }
                item.endTime =
                    parseInt(item.startTime) >= parseInt(item.endTime)
                        ? this.fillZero(parseInt(item.startTime) + 1) + ':00'
                        : item.endTime
                maxTime = parseInt(item.endTime)
            })
        },

        deleteTime(index) {
            if (this.deliveryTime.length == index + 1 || index == 0) {
                this.deliveryTime.splice(index, 1)
                return
            }
            this.deliveryTime[index + 1].startTime = this.deliveryTime[
                index - 1
            ].endTime
            this.deliveryTime.splice(index, 1)
        },

        addTimeItem() {
            const l = this.deliveryTime.length
            const startTime = this.deliveryTime[l - 1].endTime
            this.deliveryTime.push({ startTime, endTime: '' })
        },

        saveDeliveryTime() {
            // if (this.deliveryTimeSaveFlag) return
            // 校验表单数据
            if (
                this.deliveryTime.some(
                    (item) => !item.startTime || !item.endTime
                )
            ) {
                this.$message({
                    type: 'error',
                    message: '填写不能为空',
                })
                return
			}
			this.deliveryTimeList = this.deliveryTime
			this.deliveryTimeVisible = false
            // this.deliveryTimeSaveFlag = true
            // axios({
            //     method: 'post',
            //     url: this.newApi.SAVE_DELIVERY_TIME_API,
            //     data: {
            //         deliverytimelist: JSON.stringify(this.deliveryTime),
            //         bizname: this.bizname,
            //         shopid: this.shopId,
            //     },
            // })
            //     .then((res) => {
            //         this.$message({
            //             type: 'success',
            //             message: '保存成功',
            //         })
            //         this.deliveryTimeVisible = false
            //     })
            //     .catch((e) => {
            //         const errorData = e.response && e.response.data
            //         this.$message({
            //             type: 'error',
            //             message: (errorData && errorData.content) || '未知错误',
            //         })
            //     })
            //     .then(() => {
            //         this.deliveryTimeSaveFlag = false
            //     })
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
    width: 80%;
}
</style>
