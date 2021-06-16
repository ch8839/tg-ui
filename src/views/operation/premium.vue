<template>
<div class="flower-page">
    <PageContainer :breadcrumb="breadcrumb" :isMobile="false">
        <div class="delivery-configs">
            <!-- 化妆品电商暂时不支持门店选择 -->
            <div class="form-item" v-if="!isCosmeticsEcommerce">
                <singleShopSelector
                    :options="shopList"
                    :value="shopId"
                    :isOperateNational="false"
                    @change="searchDistributionConfig"
                />
            </div>
            <div class="form-item">
                <div class="label">开启配送服务</div>
                <el-switch :value="deliverySupport" :disabled="deliverySupportClickFlag" @change="deliverySupportChange"></el-switch>
                <span>{{deliverySupport ? '是' : '否'}}</span>
            </div>
            <div class="form-item" v-if="!isCosmeticsEcommerce">
                <div class="label">可配送/自提时间（宠物电商填写时间请与接单时间保持一致，否则无法生效）</div>
                <el-input :value="timeText" :readonly="true" class="form-item-input">
                    <el-button slot="append" size="mini" @click="openDialog('deliveryTimeVisible')">编辑</el-button>
                </el-input>
            </div>
            <div class="form-item">
                <div class="label">配送范围和配送费</div>
                <el-input :value="deliveryText" :readonly="true" class="form-item-input">
                    <el-button slot="append" size="mini" @click="openDialog('deliveryRangeVisible')">编辑</el-button>
                </el-input>
            </div>
            <div class="form-item" v-if="!isCosmeticsEcommerce">
                <div class="label">起送费</div>
                <el-input :value="minAmountText" :readonly="true" class="form-item-input">
                    <el-button slot="append" size="mini" @click="openDialog('delieryMinAmountVisible')">编辑</el-button>
                </el-input>
            </div>
            <div class="form-item" v-if="isCosmeticsEcommerce">
                <div class="label">包邮规则</div>
                <el-input :value="deliveryFreeConfig" :readonly="true" class="form-item-input">
                    <el-button slot="append" size="mini" @click="openDialog('deliveryRuleVisible')">编辑</el-button>
                </el-input>
            </div>
            <p style="color: #FF6326" v-if="isCosmeticsEcommerce && hasAnyPlatformDeliveryShop">平台配送不支持自助设置</p>
        </div>
        <el-dialog class="dialog-fix range-dialog" :visible="deliveryRangeVisible" @close="closeDialog('deliveryRangeVisible')">
            <div class="" slot="title">可配送范围</div>
            <div>
                <div class="title">配送范围</div>
                <el-radio-group v-model="deliveryType" @change="changeDeliveryType">
                    <el-radio class="radio-fix" :label="2">门店周围 <el-input-number size="mini" v-model="maxRange" :min="1" :max="20" :disabled="deliveryType == 1" :precision="0" :controls="false"></el-input-number> 公里以内</el-radio>
                    <el-radio class="radio-fix" :label="1">全城可配送</el-radio>
                    <el-radio class="radio-fix" :label="3" v-if="isCosmeticsEcommerce">全国配送</el-radio>
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
            <p class="beautyTips" v-if="isCosmeticsEcommerce && deliveryType != 3">配送距离以直线距离为准，可能与实际有误差</p>
            <div slot="footer">
                <el-button @click="closeDialog('deliveryRangeVisible')">取消</el-button>
                <el-button :disabled="!deliveryDialogConfirmBtn" class="button-fix" @click="saveDeliveryCity">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="dialog-fix time-dialog" :visible="deliveryTimeVisible" @close="closeDialog('deliveryTimeVisible')">
            <div slot="title">可配送/自提时间</div>
            <div>
                <div>
                    <div class="delivery-time-item" v-for="(item, index) in deliveryTime" :key="index">
                        <el-time-select format="HH:mm" v-model="item.startTime" @change="checkTime"
                            :picker-options="{
                                start: index > 0 ? deliveryTime[index-1].endTime : '00:00',
                                step: '01:00',
                                end: '23:00',
                            }"
                            value-format="HH:mm" ></el-time-select>
                        ~
                        <el-time-select format="HH:mm" v-model="item.endTime" value-format="HH:mm" @change="checkTime"
                            :picker-options="{
                                start: deliveryTime[index].startTime,
                                step: '01:00',
                                end: '24:00',
                                minTime: deliveryTime[index].startTime,
                            }"></el-time-select>
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
        <el-dialog class="dialog-fix delivery-rule" :visible="deliveryRuleVisible" @close="closeDialog('deliveryRuleVisible')">
            <div class="" slot="title">包邮规则</div>
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
    </PageContainer>
</div>
</template>

<script>
import _ from 'lodash';
import PageContainer from '@/components/common/transactions/page';
import fetch from '@/utils/transactions/index';
import axios from 'axios';
import singleShopSelector from '../../components/common/single-shop-select';
import deliveryCostTable from '../../components/operation/table/delivery-cost-table';

import { triggerShopChange } from '@nibfe/dz-supplychain-merchant-utils/lib/trigger-shop-change';
import { getPlatformShopId, isNewPlatform } from '@nibfe/dz-supplychain-merchant-utils/lib/new-platform.js';

export default {
    components: {
        PageContainer,
        singleShopSelector,
        'delivery-cost-table': deliveryCostTable
    },
    data() {
        return {
            breadcrumb: [
				{path: '/', label: '首页'},
				{path: '', label: '配送设置'}
            ],
            deliveryTimeVisible: false,
            deliveryRangeVisible: false,
            deliveryType: 2,
            lastDeliveryType: 2,
            deliveryTime: [
                {startTime: '', endTime: ''},
            ],
            lastDeliveryTime: [
                {startTime: '', endTime: ''},
            ],
            maxRange: 3,
            deliveryAllRange: [
                {startRange: 0, endRange: 1, amount: 0}
            ],
            outRangeMoney: 0,
            lastOutRangeMoney: 0,
            deliveryOnlyRange: [
                {startRange: 0, endRange: 3, amount: 10},
            ],
            hasAnyPlatformDeliveryShop: false,
            deliveryTimeSaveFlag: false,
            deliveryRangeSaveFlag: false,
            // 2020.04.15 鲜花电商优化新增
            shopId: '',
            deliverySupport: false, // 是否开启配送
            deliverySupportClickFlag: false, // 请求后端配送保存接口的点击Flag
            // 2020.04.29 化妆品电商全国配送新增字段
            deliveryList: [], // 全国配送的表格列表
            deliveryProvinceFeeList: [], // 配送的省份列表和对应的配送费
            districtProvinceList: [], // 配送的省份城市列表
            allSelectedProvinceIdList: [], // 所有已选择的城市Code列表
            deliveryRuleVisible: false, // 包邮规则编辑弹窗
            postagePrice: '', // 包邮价格
            submitNationalDeliveryCityParams: '', // 提交的订单
            newApi: {
                SAVE_DELIVERY_TIME_API: '',
                SAVE_DELIVERY_FEE_API: '',
                QUERY_DELIVERY_INFO_API: '',
                SAVE_DELIVERY_SUPPORT_API: '',
                GET_PROVICE_INFO_API: '', // 获取省份信息
                SAVE_DELIVERY_RULE_API: '', // 保存配送规则
                GET_DELIVERY_COMPANY_API: '' // 查询快递公司
            }, // 新版API
            // 2020.08.26 宠物电商迁移
            delieryMinAmountVisible: false,
            minAmount: null,
        }
    },
    computed: {
        // 2020.08.26 宠物电商起送金额文案
        isMobile() {
            return this.$store.state.isMobile;
        },
        minAmountText() {
            return `订单金额超过${this.minAmount || 0}元起送`;
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
        disableRangeAdd() {
            const l = this.deliveryAllRange.length;
            return l >= 10 ? true : false;
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
        timeText() {
            let result = '';
            this.deliveryTime.forEach(item => {
                result += item.startTime ? `${item.startTime} ~ ${item.endTime} ` : '';
            });
            return result;
        },
        deliveryText() {
            if (!this.deliveryType) {
                return ''
            }
            this.deliveryAllRange = _.filter(this.deliveryAllRange, item => item.endRange !== 99999999)
            let result = this.deliveryType == 1 ? '全城可配送：' : '门店周围 ' + this.maxRange + ' 公里范围内：';
            let range = this.deliveryType == 1 ? this.deliveryAllRange : this.deliveryOnlyRange;
            let lastRange = null;
            if(this.deliveryType == 1) {
                lastRange = this.deliveryAllRange.slice(-1)[0];
            }

            range.forEach((item,index) => {
                result += `${item.startRange}-${item.endRange}公里运费${item.amount}元; `;
            });
            if(lastRange != null) {
                result += `${lastRange.endRange}公里以上${this.outRangeMoney}元;`
            }
            if (this.deliveryType == 3) {
                return _.reduce(this.deliveryList, this.getNationalDeliveryText, '全国配送：')
            }
            return result;
        },
        // 2020.05.07化妆品电商全国配送新增 包邮规则文案
        deliveryFreeConfig() {
            let result = this.postagePrice ? `订单金额满${this.postagePrice}元包邮` : '';
            return result;
            return !this.deliveryType ? '' : result;
        },
        bizname() {
            return this.$store.getters.bizname;
        },
        shopList() {
            return this.$store.state.shopList;
        },
        // 是否为化妆品电商
        isCosmeticsEcommerce() {
            return this.bizname == 'cosmeticsecommerce'
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
        // 链接上的shopid
        urlShopId() {
            return this.$store.state.query.shopid || ''
        }
    },
    async mounted() {
        const HOST = ~location.host.indexOf('51ping') ? '//e.51ping.com' : '//e.dianping.com';
        //20201019 统一请求
        this.newApi.SAVE_DELIVERY_TIME_API = `${HOST}/trade/rulemanage/delivery/savedeliverytime.api`;
        this.newApi.SAVE_DELIVERY_FEE_API = `${HOST}/trade/rulemanage/delivery/savedeliveryfee.api`;
        this.newApi.QUERY_DELIVERY_INFO_API = `${HOST}/trade/rulemanage/delivery/querydeliveryinfo.api`;
        this.newApi.SAVE_DELIVERY_SUPPORT_API = `${HOST}/trade/rulemanage/delivery/savedeliverysupport.api`;
        this.newApi.GET_PROVICE_INFO_API = `${HOST}/trade/rulemanage/delivery/provinceinfo.api`;
        this.newApi.SAVE_DELIVERY_RULE_API = `${HOST}/trade/rulemanage/delivery/savefreedeliveryrule.api`;
        this.newApi.GET_DELIVERY_COMPANY_API = `${HOST}/trade/rulemanage/delivery/express.api`;
        this.newApi.SAVE_MINAMOUNT_API = `${HOST}/trade/rulemanage/delivery/savedeliveryorderminamount.api`;
        console.log('this.urlShopId', this.urlShopId)
        console.log('this.shopList', this.shopList)
        const originShopId = this.urlShopId ? this.urlShopId : this.shopList && this.shopList[0] && this.shopList[0].shopId
        // 化妆品电商由于后端原因暂不支持门店切换
        this.shopId = this.isCosmeticsEcommerce ? '0' : _.isString(originShopId) ? originShopId : _.toString(originShopId)

        const newPlatform = !this.isMobile && await isNewPlatform();
        console.log('newPlatform', newPlatform)
        // 新版点评管家，外层门店值赋给内层门店
        if (newPlatform) {
            const platformshopId = await getPlatformShopId();
            const isAvailable = (platformshopId || platformshopId === 0) 
                && this.shopList
                && this.shopList.some(ele => ele.shopId === platformshopId);
            if (isAvailable) this.shopId = platformshopId;
        }

        this.queryDeliverySetting();
        this.queryPlatformDeliveryShop();
        this.getProvinceInfo().then(this.transferDeliveryProvinceFeeList)
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
        // 2020.04.29 化妆品电商更新 
        postagePrice(newVal, oldVal) {
            const integerRegular = /^(0|[1-9][0-9]*)$/; // 正整数正则（包含0）
            if (integerRegular.test(newVal) || newVal === '') {
                this.postagePrice = newVal
            } else {
                this.postagePrice = oldVal
            }
        },
        deliveryList(newVal) {
            this.getAllSelectedProvinceIdList()
            this.deliveryListListener()
        },
    },
    methods: {
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
        openDialog(visible) {
            this[visible] = true;
        },
        closeDialog(visible) {
            this[visible] = false;
            this.queryDeliverySetting();
        },
        // 判断该账号下是否有平台配送的门店
        queryPlatformDeliveryShop() {
            fetch(`//e.dianping.com/ktv/deliveryconfig/api/hasplatformdelivery.wbc?bizName=${this.bizname}`).then(data => {
                this.hasAnyPlatformDeliveryShop = data;
            });
        },
        queryDeliverySetting() {
            const params = {
                shopid: this.shopId,
                bizname: this.bizname,
            }
            axios({
                url: this.newApi.QUERY_DELIVERY_INFO_API,
                params
            }).then(response => {
                const data = response.data
                if(!data){
                    throw new Error('response data is null')
                }
                const hasDeliveryTimeList = data.deliveryCustomerConfig && data.deliveryCustomerConfig.deliveryTimeList && data.deliveryCustomerConfig.deliveryTimeList.length
                
                //配送时间列表 [{startTime: "13:00", endTime: "14:00"}, {startTime: "14:00", endTime: "16:00"}...]
                this.deliveryTime = hasDeliveryTimeList ? data.deliveryCustomerConfig.deliveryTimeList : [{startTime: '', endTime: ''}]; 
                
                // 2 配送方式  2:全城配送
                this.deliveryType = data.deliveryCustomerConfig && data.deliveryCustomerConfig.deliveryRangeType;

                //'800'
                this.postagePrice = data.deliveryCustomerConfig && data.deliveryCustomerConfig.deliveryFreeConfig || '';

                // 1
                const deliverySupport = data.deliveryCustomerConfig && data.deliveryCustomerConfig.deliverySupport;         
                this.deliverySupport = deliverySupport === 1 ? true : false
                const templateConfig = data.deliveryFeeTemplateConfig;
                // 2020.04.29 化妆品电商新增全国配送
                // []
                this.deliveryProvinceFeeList = templateConfig && templateConfig.deliveryProvinceFeeList
                if(templateConfig){
                    if (this.deliveryType === 1) {
                        const lastItem = _.last(templateConfig.deliveryRangeFeeList);
                        const hasDeliveryRangeFeeList = templateConfig.deliveryRangeFeeList && templateConfig.deliveryRangeFeeList.length
                        const range = hasDeliveryRangeFeeList ? templateConfig.deliveryRangeFeeList : this.deliveryAllRange;
                        this.deliveryAllRange = range;
                        this.outRangeMoney = lastItem.amount;
                    } else if (this.deliveryType === 2) {
                        // {startRange: 0, endRange: 3, amount: 10}  0-3公里运费10元; 
                        this.deliveryOnlyRange = templateConfig.deliveryRangeFeeList || this.deliveryOnlyRange;
                        this.maxRange = this.deliveryOnlyRange.slice(-1)[0].endRange; //最大配送距离
                    } else {
                        this.getProvinceInfo()
                            .then(this.transferDeliveryProvinceFeeList)
                    }
                }
                if (!data.deliveryCustomerConfig) {
                    this.deliveryTime = [{startTime: '', endTime: ''}];
                    this.deliveryAllRange = [{startRange: 0, endRange: 1, amount: 0}]
                }
                // 2020.08.26 宠物电商迁移
                this.minAmount = data.deliveryCustomerConfig.deliveryOrderMinAmount; //订单超过minAmount元起送
            }).catch((e)=>{
                window.Owl && window.Owl.addError(this.newApi.QUERY_DELIVERY_INFO_API, {
                    tags: {
                        errorMsg: e,
                        bizName: this.bizname,
                    },
                    category: 'ajaxError'
                })
            });
        },
        saveDeliveryRange() {
            if (this.deliveryRangeSaveFlag) return;
            const deliveryFeeList =
                (this.deliveryType === 1
                ? this.deliveryAllRange
                : this.deliveryType === 2
                ? this.deliveryOnlyRange
                : this.submitNationalDeliveryCityParams).concat();
            if (this.deliveryType === 1) deliveryFeeList.push({
                startRange: deliveryFeeList[deliveryFeeList.length - 1].endRange,
                endRange: 99999999,
                amount: this.outRangeMoney,
            });
            // 校验表单数据
            if(this.deliveryType !== 3 && deliveryFeeList.some(item=>!item.endRange || !item.amount && !(item.amount ==='0'|| item.amount ===0))){
                this.$message({
                    type: 'error',
                    message: '填写不能为空',
                });
                return;
            }
            this.deliveryRangeSaveFlag = true;
            if (this.deliveryType == 1 || this.deliveryType == 2) this.deliveryList = []
            axios({
                method: 'post',
                url: this.newApi.SAVE_DELIVERY_FEE_API,
                data: {
                    deliverytype: this.deliveryType,
                    deliveryrange: this.maxRange,
                    deliveryfeelist: JSON.stringify(deliveryFeeList),
                    bizname: this.bizname,
                    shopid: this.shopId
                }
            }).then((data) => {
                this.$message({
                    type: 'success',
                    message: '保存成功',
                });
                this.deliveryRangeVisible = false;
            }).catch(e => {
                const errorData = e.response && e.response.data
                this.$message({
                    type: 'error',
                    message: errorData && errorData.content || '未知错误',
                });
            }).then(() => {
                this.deliveryRangeSaveFlag = false;
            })
        },
        saveDeliveryTime() {
            if (this.deliveryTimeSaveFlag) return;
            // 校验表单数据
            if(this.deliveryTime.some(item=>!item.startTime || !item.endTime)){
                this.$message({
                    type: 'error',
                    message: '填写不能为空',
                });
                return;
            }
            this.deliveryTimeSaveFlag = true;
            axios({
                method: 'post',
                url: this.newApi.SAVE_DELIVERY_TIME_API,
                data: {
                    deliverytimelist: JSON.stringify(this.deliveryTime),
                    bizname: this.bizname,
                    shopid: this.shopId
                }
            }).then((res) => {
                this.$message({
                    type: 'success',
                    message: '保存成功',
                });
                this.deliveryTimeVisible = false;
            }).catch(e => {
                const errorData = e.response && e.response.data
                this.$message({
                    type: 'error',
                    message: errorData && errorData.content || '未知错误',
                });
            }).then(() => {
                this.deliveryTimeSaveFlag = false;
            })
        },
        addTimeItem() {
            const l = this.deliveryTime.length;
            const startTime = this.deliveryTime[l-1].endTime;
            this.deliveryTime.push({startTime, endTime: ''});
        },
        addRangeItem() {
            const range = this.deliveryType == 1 ? this.deliveryAllRange : this.deliveryOnlyRange;
            const lastRange = range.slice(-1)[0];
            if(lastRange.endRange - lastRange.startRange > 1) {
                range.splice(-1, 0, {
                        startRange: lastRange.startRange,
                        endRange: lastRange.startRange + 1,
                        amount: 0,
                    });
                range[range.length-1].startRange = lastRange.startRange + 1;
                return;
            }
        },
        deleteTime(index) {
            if((this.deliveryTime.length == index+1) || index == 0) {
                this.deliveryTime.splice(index, 1);
                return ;
            }
            this.deliveryTime[index+1].startTime = this.deliveryTime[index-1].endTime;
            this.deliveryTime.splice(index, 1);
        },
        deleteRange(index) {
            const range = this.deliveryType == 1 ? this.deliveryAllRange : this.deliveryOnlyRange;
            range.splice(index-1, 1);
            if(index-1 == 0) {
                range[0].startRange = 0;
                return;
            }
            range[index-1].startRange = range[index-2].endRange
            return ;
        },
        changeDeliveryType() {
            if(this.deliveryType == 2 && this.deliveryOnlyRange.length == 1) {
                this.deliveryOnlyRange[0].endRange = this.maxRange;
            }
        },
        splitRange(index) {
            this.deliveryOnlyRange[index+1].startRange = this.deliveryOnlyRange[index].endRange;
            this.deliveryOnlyRange[index].amount = 0;
        },
        maxMoney(range) {
            if(range > 10) {
                return 80;
            }
            if(range > 5 && range <= 10) {
                return 40;
            }
            if(range <= 5) {
                return 20;
            }
        },
        deliveryRangeText(item) {
            return `${item.startRange}-${item.endRange}公里运费${item.amount}元`;
        },
        checkTime() {
            let maxTime = 0;
            this.deliveryTime.forEach((item, index) => {
                item.startTime = parseInt(maxTime) > parseInt(item.startTime) ? this.fillZero(parseInt(maxTime)+1)+":00" : item.startTime;
                if(parseInt(item.startTime) >= 24) {
                    this.deliveryTime = this.deliveryTime.slice(0, index);
                    return false;
                }
                item.endTime = parseInt(item.startTime) >= parseInt(item.endTime) ? this.fillZero(parseInt(item.startTime)+1)+":00" : item.endTime;
                maxTime = parseInt(item.endTime);
            });
        },
        fillZero(num) {
            return num >= 10 ? num : '0'+num;
        },
        changeAllRange(index){
            if(index == this.deliveryAllRange.length - 1) {
                this.outRangeMoney = 0;
            } else {
                this.deliveryAllRange[index+1].startRange = this.deliveryAllRange[index].endRange;
            }
            this.deliveryAllRange[index].amount = 0;
        },
        async searchDistributionConfig(shopId) {
            // 内层门店改动后，同步切换外层门店
            const changedShop = !this.isMobile && await triggerShopChange(shopId);
            if (changedShop) return;

            this.shopId = _.isString(shopId) ? shopId : _.toString(shopId)
            this.queryDeliverySetting()
        },
        saveDeliverySupport() {
            this.deliverySupportClickFlag = true
            axios({
                method: 'post',
                url: this.newApi.SAVE_DELIVERY_SUPPORT_API,
                data: {
                    shopid: this.shopId,
                    deliverysupport: this.deliverySupport ? 1 : 2,
                    bizname: this.bizname
                }
            }).then(() => {
                this.deliverySupportClickFlag = false
                this.$message({
                    type: 'success',
                    message: '保存成功',
                });
            }).catch(e => {
                const errorData = e.response && e.response.data
                this.deliverySupportClickFlag = false
                this.deliverySupport = !this.deliverySupport // 如果接口挂了，不应该让用户保存
                this.$message({
                    type: 'error',
                    message: errorData && errorData.content || '未知错误',
                });
                window.Owl && window.Owl.addError('fetchError: trade/rulemanage/delivery/savedeliverysupport.api', {
                    tags: {
                        errorMsg: e,
                        bizName: this.bizname,
                    },
                    category: 'ajaxError'
                })
            })
        },
        deliverySupportChange(newVal) {
            this.deliverySupport = newVal
            this.saveDeliverySupport()
        },
        // 2020.04.29 化妆品电商新增逻辑 后端接口文档：https://km.sankuai.com/page/306917286
        getProvinceInfo() {
            const params = {
                shopid: this.shopId
            }
            return axios({
                url: this.newApi.GET_PROVICE_INFO_API,
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
                window.Owl && window.Owl.addError(this.newApi.GET_PROVICE_INFO_API, {
                    tags: {
                        errorMsg: e,
                        bizName: this.bizname,
                    },
                    category: 'ajaxError'
                })
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
        // 保存全国配送的配送城市
        saveDeliveryCity() {
            this.submitNationalDeliveryCityParams =
                _(this.deliveryList)
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
                    .value()
            this.saveDeliveryRange()
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
        addDeliveryCostTableItem() {
            const feeInfo = {
                baseNum: '',
                basePrice: '',
                overNum: '',
                overPrice: ''
            }
            // 当前配送费的城市列表和所有已选择的城市Code列表做差集，差集中的城市列表是表格这一行不能选的（disabled），其余的都是可选择与取消选择的
            const xorProvinceIdList = _.xor(this.allSelectedProvinceIdList, [])
            const temp = this.districtProvinceList.map(provinceItem => {
                const c = Object.assign({}, provinceItem)
                let currentChildren = []
                const children = c.children.slice(0)
                children.map((cityItem, cityIndex) => {
                    const abc = Object.assign({}, cityItem, {
                        value: JSON.stringify(cityItem.value),
                        disabled: _.includes(xorProvinceIdList, cityItem.labelId)
                    })
                    currentChildren.push(abc)
                })
                return {
                    label: c.label,
                    value: JSON.stringify(c.value),
                    children: currentChildren,
                    disabled: _(currentChildren).map('disabled').every(Boolean)
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
        filterAddedDeliveryList() {
            return _(this.deliveryList)
                .map(q => q.rowSelectedCityList && q.rowSelectedCityList.length && _(Object.keys(q.feeInfo) || []).map(key => q.feeInfo[key]).every(Boolean))
                .every(Boolean)
        }
    }
}
</script>

<style lang="less">
@import '../../theme/transactions/page/index.less';
@import '../../theme/transactions/page/order.less';

.delivery-configs {
    padding: 20px 40px;
    .el-input {
        width: 80%;
    }
}

.range-dialog {
    .el-dialog {
        width: 85%;
    }

    .el-input {
        width: 85px;
    }

    .el-input-number {
        width: 80px;
    }

    .delivery-range-item {
        margin: 10px 0;
        text-align: justify;

        .delivery-range-si {
            margin-right: 10px;
        }
    }

    .radio-fix {
        margin: 10px;
    }
}

.time-dialog {
    .delivery-time-item {
        margin: 10px 0;
    }
}

.delivery-rule {
    .sub-title {
        margin-bottom: 15px;
    }
    .input-postage-price {
        width: 100px;
        padding: 5px;
    }
}

.delivery-type, .range-detail {
    margin: 10px 0;
    font-size: 14px;
    color: #111111;
}

.el-select>.el-input {
    width: 300px;
}

.el-loading-mask {
    .el-loading-spinner {
        .el-icon-loading,
        .el-loading-text {
            color: #ff6633;
        }
    }
}

</style>
