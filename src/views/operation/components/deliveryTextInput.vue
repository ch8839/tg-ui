<template>
<div>
    <div class="form-item">
		<div class="label">配送范围和配送费</div>
		<el-input :value="deliveryText" :readonly="true" class="form-item-input">
			<el-button slot="append" size="mini" @click="openDialog('deliveryRangeVisible')">编辑</el-button>
		</el-input>
	</div>
    
    <el-dialog class="dialog-fix range-dialog" :visible="deliveryRangeVisible" @close="closeDialog('deliveryRangeVisible')">
		<div class="" slot="title">可配送范围</div>
		<div>
			<div class="title">配送范围</div>
			<el-radio-group v-model="deliveryType" @change="changeDeliveryType">
				<el-radio class="radio-fix" :label="2">门店周围 <el-input-number size="mini" v-model="maxRange" :min="1" :max="20" :disabled="deliveryType == 1" :precision="0" :controls="false"></el-input-number> 公里以内</el-radio>
				<el-radio class="radio-fix" :label="1">全城可配送</el-radio>
				<!-- isCom!!  问题：现在没有isCosmeticsEcommerce怎么判断-->
				<!-- <el-radio class="radio-fix" :label="3" v-if="isCosmeticsEcommerce">全国配送</el-radio> -->
				<el-radio class="radio-fix" :label="3">全国配送</el-radio>
			</el-radio-group>
			<div v-if="deliveryType == 1">
				<div class="delivery-range-item" v-for="(item, index) in deliveryAllRange" :key="index">
					<el-input-number v-model="item.startRange" :disabled="true" :controls="false" :precision="0" :min="0"></el-input-number>
					~
					<el-input-number v-model="item.endRange" :controls="false" :precision="0"
						@change="changeAllRange(index)"
						:min="item.startRange + 1"
						:max="deliveryAllRange[index+1] ? deliveryAllRange[index+1].endRange-1 : Infinity"></el-input-number>
					<span class="delivery-range-si">公里</span>
					<el-input-number v-model="item.amount" :controls="false" :precision="0" :max="maxMoney(item.endRange)" :min="0"></el-input-number>
					<span class="delivery-money-si">元</span>
					<el-button type="text" v-if="index == deliveryAllRange.length - 1" @click="addRangeItem" :disabled="disableRangeAdd">添加</el-button>
					<el-button v-if="index != 0 && index == deliveryAllRange.length - 1" type="text" @click="deleteRange(index)">删除</el-button>
				</div>
				<div class="delivery-range-item">
					<el-input-number v-model="deliveryAllRange[deliveryAllRange.length-1].endRange" :disabled="true" :controls="false" :precision="0" :min="0"></el-input-number>
					<span class="delivery-range-si">公里以上</span>
					<el-input-number v-model="outRangeMoney" :controls="false" :precision="0" :min="0" :max="maxMoney(deliveryAllRange.slice(-1)[0].endRange + 1)"></el-input-number>
					<span class="delivery-money-si">元</span>
				</div>
			</div>
			<div v-if="deliveryType == 2">
				<div class="delivery-range-item" v-for="(item, index) in deliveryOnlyRange" :key="index">
					<el-input-number v-model="item.startRange" :disabled="true" :controls="false" :precision="0"></el-input-number>
					~
					<el-input-number v-model="item.endRange" :controls="false" :precision="0" :disabled="index == deliveryOnlyRange.length - 1"
						:max="deliveryOnlyRange[index+1] ? deliveryOnlyRange[index+1].endRange-1 : maxRange"
						:min="item.startRange + 1"
						@change="splitRange(index)"></el-input-number>
					<span class="delivery-range-si">公里</span>
					<el-input-number v-model="item.amount" :controls="false" :precision="0" :min="0" :max="maxMoney(item.endRange)"></el-input-number>
					<span class="delivery-money-si">元</span>
					<el-button type="text" v-if="index == deliveryOnlyRange.length - 1" @click="addRangeItem">添加</el-button>
					<el-button v-if="index != 0 && index == deliveryOnlyRange.length - 1" type="text" @click="deleteRange(index)">删除</el-button>
				</div>
			</div>
			<div v-if="deliveryType == 3">
				<div class="title">配送费</div>
				<delivery-cost-table
					:list="deliveryList"
					:showNationalExpressButton="showNationalExpressButton"
					@addDeliveryCostTableItem="addDeliveryCostTableItem"
				></delivery-cost-table>
				<div class="beautyTips" v-if="nationalDeliveryTipMsg">{{nationalDeliveryTipMsg}}</div>
			</div>
		</div>
		<p class="beautyTips" v-if="deliveryType != 3">配送距离以直线距离为准，可能与实际有误差</p>
		<div slot="footer">
			<el-button @click="closeDialog('deliveryRangeVisible')">取消</el-button>
			<el-button :disabled="!deliveryDialogConfirmBtn" class="button-fix" @click="saveDeliveryCity">确定</el-button>
		</div>
    </el-dialog>
</div>
</template>

<script>
import deliveryCostTable from '../../../components/operation/table/delivery-cost-table'
import axios from 'axios';

export default {
    name: 'deliveryTextInput',
    props: {
        _deliveryType: {
            type: [String, Number],
		},
		_deliveryProvinceFeeList: {
			type: Array
		},
		_deliveryRangeFeeList: {
			type: Array
		},
		shopId: {
			type: String
		}
	},
	components: {deliveryCostTable},
    data: function () {
        return {
			deliveryRangeVisible: false, 
			deliveryList: [], // 全国配送的表格列表
            // deliveryProvinceFeeList: [], // 配送的省份列表和对应的配送费
            districtProvinceList: [], // 配送的省份城市列表
			allSelectedProvinceIdList: [], // 所有已选择的城市Code列表
			deliveryAllRange: [{startRange: 0, endRange: 1, amount: 0}],
			deliveryOnlyRange: [
                {startRange: 0, endRange: 3, amount: 10},
			],
			maxRange: 3,
			outRangeMoney: 0, //超出多少xx公里outRangeMoney元
		}
    },
    computed: {
        deliveryType: {
            get() {
                return this._deliveryType || 2;
			},
			set(newValue){
				this.$emit('change', { _deliveryType : newValue} )
			}
			
		},
		deliveryProvinceFeeList: {
            get() {
                return this._deliveryProvinceFeeList || [];
			},
			set(newValue){
				this.$emit('change', { _deliveryProvinceFeeList : newValue} )
			}
			
		},
		deliveryRangeFeeList: {
            get() {
                return this._deliveryRangeFeeList || [];
			},
			set(newValue){
				this.$emit('change', { _deliveryRangeFeeList : newValue} )
			}
			
        },
        deliveryText() {
            if (!this.deliveryType) {
                return ''
            }
            this.deliveryAllRange = _.filter(
                this.deliveryAllRange,
                (item) => item.endRange !== 99999999
            )
            let result =
                this.deliveryType == 1 ? '全城可配送：' : '门店周围 ' + this.maxRange + ' 公里范围内：'
            let range =
                this.deliveryType == 1 ? this.deliveryAllRange : this.deliveryOnlyRange
            let lastRange = null
            if (this.deliveryType == 1) {
                lastRange = this.deliveryAllRange.slice(-1)[0]
            }

            range.forEach((item, index) => {
                result += `${item.startRange}-${item.endRange}公里运费${item.amount}元; `
            })
            if (lastRange != null) {
                result += `${lastRange.endRange}公里以上${this.outRangeMoney}元;`
            }
            if (this.deliveryType == 3) {
                return _.reduce(
                    this.deliveryList,
                    this.getNationalDeliveryText,
                    '全国配送：'
                )
            }
            return result
		},

		disableRangeAdd() {
            const l = this.deliveryAllRange.length;
            return l >= 10 ? true : false;
        },
		
		// 判断全国配送下添加按钮是否置灰
        showNationalExpressButton() {
            if (this.deliveryType !=3) return true
            else return this.filterAddedDeliveryList()
		},

		 // 判断配送范围的弹框确定按钮是否置灰
        deliveryDialogConfirmBtn() {
            if (this.deliveryType !=3) return true
            else return !!_.size(this.deliveryList) && this.filterAddedDeliveryList()
        },
		
	},

	watch: {
        maxRange(nVal, oVal) {
            if(nVal < this.deliveryOnlyRange.slice(-1)[0].endRange) {
                this.deliveryOnlyRange = [
                    {startRange: 0, endRange: nVal, amount: 0},
                ];
                return;
            }
            this.deliveryOnlyRange.slice(-1)[0].endRange = nVal;
        },
    
        deliveryList(newVal) {
            this.getAllSelectedProvinceIdList()
            this.deliveryListListener()
		},

		// 请求到新数据后，父组件通知子组件，当打开dialog时触发拿到数据并重新渲染
		deliveryRangeVisible(newValue, oldValue){
			console.log('>>newValue', newValue)
			if(newValue){
				this.renderData()
			}
		}
		

    },
	
	mounted(){
		// renderData()
		this.getProvinceInfo().then(this.transferDeliveryProvinceFeeList)
	},

    methods: {
		renderData(){
			if (this.deliveryType === 1) {
				const lastItem = _.last(this.deliveryRangeFeeList);
				const hasDeliveryRangeFeeList = this.deliveryRangeFeeList && this.deliveryRangeFeeList.length
				const range = hasDeliveryRangeFeeList ? this.deliveryRangeFeeList : this.deliveryAllRange;
				this.deliveryAllRange = range;
				this.outRangeMoney = lastItem.amount;
			} else if (this.deliveryType === 2) {
				// {startRange: 0, endRange: 3, amount: 10}  0-3公里运费10元; 
				this.deliveryOnlyRange = this.deliveryRangeFeeList || this.deliveryOnlyRange;
				this.maxRange = this.deliveryOnlyRange.slice(-1)[0].endRange; //最大配送距离
			} else {
				this.getProvinceInfo()
					.then(this.transferDeliveryProvinceFeeList)
			}
		},
        openDialog(visible) {
            this[visible] = true
        },
        closeDialog(visible) {
            this[visible] = false
            // this.queryDeliverySetting()
		},
		

		// 全国配送提示文案
        nationalDeliveryTipMsg() {
            if (!_.size(this.deliveryList)) return;
            const allProvinceCount = _.reduce(
                _.head(this.deliveryList).rowCityList,
                (total, current) => total + current.children.length,
                0);
            const selectedProvinceCount = this.allSelectedProvinceIdList && this.allSelectedProvinceIdList.length
            const remainProvinceCount = allProvinceCount - selectedProvinceCount
            return remainProvinceCount ? `还有${remainProvinceCount}个省市的计费方式待设置；如未设置则默认不支持配送` : ''
		},
		
        changeDeliveryType() {
            if (this.deliveryType == 2 && this.deliveryOnlyRange.length == 1) {
                this.deliveryOnlyRange[0].endRange = this.maxRange
            }
        },
        changeAllRange(index) {
            if (index == this.deliveryAllRange.length - 1) {
                this.outRangeMoney = 0
            } else {
                this.deliveryAllRange[
                    index + 1
                ].startRange = this.deliveryAllRange[index].endRange
            }
            this.deliveryAllRange[index].amount = 0
        },

        splitRange(index) {
            this.deliveryOnlyRange[index + 1].startRange = this.deliveryOnlyRange[index].endRange
            this.deliveryOnlyRange[index].amount = 0
        },

        maxMoney(range) {
            if (range > 10) {
                return 80
            }
            if (range > 5 && range <= 10) {
                return 40
            }
            if (range <= 5) {
                return 20
            }
        },

        addRangeItem() {
            const range =
                this.deliveryType == 1
                    ? this.deliveryAllRange
                    : this.deliveryOnlyRange
            const lastRange = range.slice(-1)[0]
            if (lastRange.endRange - lastRange.startRange > 1) {
                range.splice(-1, 0, {
                    startRange: lastRange.startRange,
                    endRange: lastRange.startRange + 1,
                    amount: 0,
                })
                range[range.length - 1].startRange = lastRange.startRange + 1
                return
            }
        },

        deleteRange(index) {
            const range =
                this.deliveryType == 1
                    ? this.deliveryAllRange
                    : this.deliveryOnlyRange
            range.splice(index - 1, 1)
            if (index - 1 == 0) {
                range[0].startRange = 0
                return
            }
            range[index - 1].startRange = range[index - 2].endRange
            return
        },

        addDeliveryCostTableItem() {
            const feeInfo = {
                baseNum: '',
                basePrice: '',
                overNum: '',
                overPrice: '',
            }
            // 当前配送费的城市列表和所有已选择的城市Code列表做差集，差集中的城市列表是表格这一行不能选的（disabled），其余的都是可选择与取消选择的
            const xorProvinceIdList = _.xor(this.allSelectedProvinceIdList, [])
            const temp = this.districtProvinceList.map((provinceItem) => {
                const c = Object.assign({}, provinceItem)
                let currentChildren = []
                const children = c.children.slice(0)
                children.map((cityItem, cityIndex) => {
                    const abc = Object.assign({}, cityItem, {
                        value: JSON.stringify(cityItem.value),
                        disabled: _.includes(
                            xorProvinceIdList,
                            cityItem.labelId
                        ),
                    })
                    currentChildren.push(abc)
                })
                return {
                    label: c.label,
                    value: JSON.stringify(c.value),
                    children: currentChildren,
                    disabled: _(currentChildren).map('disabled').every(Boolean),
                }
            })
            const newItem = {
                feeInfo,
                feeInfoId: '',
                rowCityList: temp, // 每一行可选的城市列表
                rowSelectedCityList: [], // 当前行已选的城市
            }
            this.deliveryList.push(newItem)
        },

        // 保存全国配送的配送城市
        saveDeliveryCity() {
            this.submitNationalDeliveryCityParams = _(this.deliveryList)
                .map((n) => {
                    let newArr = []
                    _.map(n.rowSelectedCityList, (item) => {
                        const city = n.rowCityList[item[0]].children[item[1]]
                        const newObj = {
                            name: city.label,
                            code: city.labelId,
                            feeInfo: n.feeInfo,
                        }
                        newArr.push(newObj)
                    })
                    return newArr
                })
                .flatten()
                .value()
			this.saveDeliveryRange()
			this.deliveryRangeVisible = false
        },

        saveDeliveryRange() {
        
            const deliveryFeeList = (this.deliveryType === 1
                ? this.deliveryAllRange
                : this.deliveryType === 2
                ? this.deliveryOnlyRange
                : this.submitNationalDeliveryCityParams
            ).concat()
            if (this.deliveryType === 1)
                deliveryFeeList.push({
                    startRange:
                        deliveryFeeList[deliveryFeeList.length - 1].endRange,
                    endRange: 99999999,
                    amount: this.outRangeMoney,
                })
            // 校验表单数据
            if (
                this.deliveryType !== 3 &&
                deliveryFeeList.some(
                    (item) =>
                        !item.endRange ||
                        (!item.amount &&
                            !(item.amount === '0' || item.amount === 0))
                )
            ) {
                this.$message({
                    type: 'error',
                    message: '填写不能为空',
                })
                return
            }
    
            if (this.deliveryType == 1 || this.deliveryType == 2)
                this.deliveryList = []
            // axios({
            //     method: 'post',
            //     url: this.newApi.SAVE_DELIVERY_FEE_API,
            //     data: {
            //         deliverytype: this.deliveryType,
            //         deliveryrange: this.maxRange,
            //         deliveryfeelist: JSON.stringify(deliveryFeeList),
            //         bizname: this.bizname,
            //         shopid: this.shopId,
            //     },
            // })
            //     .then((data) => {
            //         this.$message({
            //             type: 'success',
            //             message: '保存成功',
            //         })
            //         this.deliveryRangeVisible = false
            //     })
            //     .catch((e) => {
            //         const errorData = e.response && e.response.data
            //         this.$message({
            //             type: 'error',
            //             message: (errorData && errorData.content) || '未知错误',
            //         })
            //     })
		},
		
		 // 获取当前已选择的城市Code列表
        getAllSelectedProvinceIdList() {
            this.allSelectedProvinceIdList = _(this.deliveryList)
                .map((n) => {
                    let newArr = []
                    _.map(n.rowSelectedCityList, item => {
                        const city = n.rowCityList[item[0]].children[item[1]]
                        const newObj = {
                        name: city.label,
                        code: city.labelId,
                        feeInfo: n.feeInfo
                        }
                        newArr.push(newObj)
                    })
                    return newArr
                })
                .flatten()
                .map('code')
                .value()
		},
		
		deliveryListListener() {
            this.deliveryList.map(deliveryItem => {
                let newArr = []
                _.map(deliveryItem.rowSelectedCityList, item => {
                    newArr.push(deliveryItem.rowCityList[item[0]].children[item[1]].labelId)
                })
                const xorRowProvinceIdList = _.xor(this.allSelectedProvinceIdList, newArr)
                deliveryItem.rowCityList.map(item => {
                    item.children.map(cityItem => cityItem.disabled = _.includes(xorRowProvinceIdList, cityItem.labelId))
                    item.disabled = _(item.children).map('disabled').every(Boolean)
                })
            })
		},
		
		getNationalDeliveryText(total, current) {
            const { feeInfo, rowSelectedCityList, rowCityList } = current;
            const cityText = _(rowSelectedCityList)
                .map(j => rowCityList[j[0]].children[j[1]].label)
                .value()
                .join('、')
            const expressPriceText =
                `默认${feeInfo.baseNum}件内运费${feeInfo.basePrice}元，每增加${feeInfo.overNum}件，运费增加${feeInfo.overPrice}元；`
            return total + `${cityText}，${expressPriceText}`
		},

		// 2020.04.29 化妆品电商新增逻辑 后端接口文档：https://km.sankuai.com/page/306917286
        getProvinceInfo() {
            const params = {
                shopid: this.shopId
			}
			// const HOST = ~location.host.indexOf('51ping') ? '//e.51ping.com' : '//e.dianping.com';
			const HOST = '//e.51ping.com'
			let GET_PROVICE_INFO_API = `${HOST}/trade/rulemanage/delivery/provinceinfo.api`;
            return axios({
                url: GET_PROVICE_INFO_API,
                params
            }).then(res => {
                this.originDistrictList = res && res.data && res.data.allDistrict
                this.transferProvinceCityList();
                return Promise.resolve()
            }).catch(e => {
                const errorData = e.response && e.response.data
                this.$message({
                    type: 'error',
                    message: errorData && errorData.content || '未知错误',
                });
                // window.Owl && window.Owl.addError(this.newApi.GET_PROVICE_INFO_API, {
                //     tags: {
                //         errorMsg: e,
                //         bizName: this.bizname,
                //     },
                //     category: 'ajaxError'
                // })
            })
        },
		
		// 转换后端返回的全国配送城市列表以及对应的配送费
        transferDeliveryProvinceFeeList() {
            let templateFeeInfoIdList = []
            let deliveryProvinceFeeList = []
            this.deliveryProvinceFeeList.map(item => {
                const feeInfoId = item.feeInfoId
                const feeInfo = item.feeInfo
                const provinceItem = {
                    provinceName: item.provinceName,
                    provinceCode: item.provinceCode
                }
                const feeInfoItem = {
                    feeInfo: feeInfo,
                    feeInfoId: feeInfoId,
                    provinceList: [provinceItem],
                }
                const currentFeeInfoItem = _.find(deliveryProvinceFeeList, { feeInfoId })
                const isFeeInfoIdInclude = _.includes(templateFeeInfoIdList, feeInfoId) // 当前的配送费id是否在配送费id列表中
                if (!isFeeInfoIdInclude) {
                    templateFeeInfoIdList.push(feeInfoId)
                    deliveryProvinceFeeList.push(feeInfoItem)
                } else {
                    currentFeeInfoItem.provinceList.push(provinceItem)
                }
            })
            this.deliveryProvinceFeeList = deliveryProvinceFeeList
            // 所有已选择的城市Code列表
            this.initialGetAllSelectedProvinceIdList()
            deliveryProvinceFeeList = deliveryProvinceFeeList.map((item, index) => {
                const provinceIdList = item.provinceList.map(city => (city.provinceCode))
                // 当前配送费的城市列表和所有已选择的城市Code列表做差集，差集中的城市列表是表格这一行不能选的（disabled），其余的都是可选择与取消选择的
                const xorProvinceIdList = _.xor(this.allSelectedProvinceIdList, provinceIdList)
                let currentRowSelectedCityList = []
                const temp = this.districtProvinceList.map(provinceItem => {
                    const c = Object.assign({}, provinceItem)
                    let currentChildren = []
                    const children = c.children.slice(0)
                    children.map(cityItem => {
                        const abc = Object.assign({}, cityItem, {
                            value: JSON.stringify(cityItem.value),
                            disabled: _.includes(xorProvinceIdList, cityItem.labelId)
                        })
                        if (_.includes(provinceIdList, cityItem.labelId)) currentRowSelectedCityList.push([JSON.stringify(c.value), JSON.stringify(cityItem.value)])
                        currentChildren.push(abc)
                    })
                    return {
                        label: c.label,
                        value: JSON.stringify(c.value),
                        children: currentChildren,
                        disabled: _(currentChildren).map('disabled').every(Boolean)
                    }
                })
                const templateItem = {
                    feeInfo: item.feeInfo,
                    feeInfoId: item.feeInfoId,
                    rowCityList: temp, // 每一行可选的城市列表
                    rowSelectedCityList: currentRowSelectedCityList, // 当前行已选的城市
                }
                this.$set(this.deliveryList, index, templateItem)
                return templateItem
            })
            this.deliveryList = deliveryProvinceFeeList
        },
        // 转换后端返回的城市和省份列表
        transferProvinceCityList() {
            this.districtProvinceList = this.originDistrictList.map((item, index) => ({
                value: index,
                label: item.districtName,
                children: item.provinceList.map((cityItem, cityIndex) => ({
                    value: cityIndex,
                    label: cityItem.name,
                    labelId: cityItem.code
                }))
            }))
		},
		
		// 每次请求后端接口后，通过后端数据转换成已选择的城市Code列表
        initialGetAllSelectedProvinceIdList() {
            // 所有已选择的城市Code列表
            this.allSelectedProvinceIdList =
                _(this.deliveryProvinceFeeList)
                    .map('provinceList')
                    .flattenDeep()
                    .map('provinceCode')
                    .value()
		},
		
		filterAddedDeliveryList() {
            return _(this.deliveryList)
                .map(q => q.rowSelectedCityList && q.rowSelectedCityList.length && _(Object.keys(q.feeInfo) || []).map(key => q.feeInfo[key]).every(Boolean))
                .every(Boolean)
        }
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
