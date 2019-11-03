<template>
    <div class="wrap">
        <div class="title">
            <span>交易流水列表</span>
        </div>
           <div class="search-wrap">
             <span>业务类型:</span>
              <el-select v-model="searchBizType" placeholder="请选择">
                <el-option  
                    v-for="item in bizTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <span>收入/支出类型:</span>
            <el-select v-model="searchTradeType" placeholder="请选择">
                <el-option  
                    v-for="item in tradeTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
             <span>时间范围:</span>
              <el-date-picker
                v-model="searchDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
                </el-date-picker>
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <el-table
            :data="dataList"
            border
            style="width: 100%">
            <el-table-column
				label="用户"
				prop="userId"
				align='center'>
            </el-table-column>
			<el-table-column
				label="交易金额(分)"
				prop="money"
				align='center'>
            </el-table-column>
		    <el-table-column
				label="业务类型"
				prop="bizType"
				align='center'>
                 <template slot-scope="scope">
                    <span>{{ scope.row.bizType | typeText(bizTypeList) }}</span>
                </template>
            </el-table-column>
             <el-table-column
				label="交易渠道"
				prop="payType"
				align='center'>
                 <template slot-scope="scope">
                    <span>{{ scope.row.payType | typeText(payTypeList) }}</span>
                </template>
            </el-table-column>
             <el-table-column
				label="收入/支出类型"
				prop="tradeType"
				align='center'>
                 <template slot-scope="scope">
                    <span>{{ scope.row.tradeType | typeText(tradeTypeList) }}</span>
                </template>
            </el-table-column>
             <el-table-column
				label="描述"
				prop="comment"
				align='center'>
            </el-table-column>
             <el-table-column
				label="第三方流水号"
				prop="transactionId"
				align='center'>
            </el-table-column>
            <el-table-column
				label="创建时间"
				prop="createDate"
				align='center'>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handlePageChange"
            @size-change="handlePageChange"
            :current-page="currentPage"
            :page-sizes="[20,30,50,100]"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { transactionList } from "@/utils/api";
export default {
    data() {
        return {
            total:0,
            currentPage: 1,
            pageSize: 20,
            dataList: [],
            searchBizType: -1,
            searchPayType: -1,
            searchTradeType: -1,
            searchDate:"",
            bizTypeList: [
                {
                    value: -1,
                    label: '全部'
                },
                {
                    value: 0,
                    label: '支付'
                },
                {
                    value: 1,
                    label: '退款'
                },
                {
                    value: 2,
                    label: '打款'
                }
            ],
             tradeTypeList: [
                {
                    value: -1,
                    label: '全部'
                },
                {
                    value: 0,
                    label: '收入'
                },
                {
                    value: 1,
                    label: '支出'
                }
            ],
             payTypeList: [
                {
                    value: 0,
                    label: '微信小程序'
                },
                {
                    value: 1,
                    label: '微信支付'
                },
                 {
                    value: 2,
                    label: '支付宝'
                },
                {
                    value: 3,
                    label: 's银联'
                }

            ],
             pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    created() {
        this.list();
    },
    methods: {
        search() {
             this.list();
        },
        list() { 
            console.info(this.searchDate);
            let params = {
                bizType:this.searchBizType,
                tradeType:this.searchTradeType
            }
            if(this.searchDate){
                params.startDate = this.searchDate[0];
                 params.endDate = this.searchDate[1]
            }
            transactionList(params).then((res) => {
                if ( res.code == 200 && res.data ) {
                    this.currentPage = res.data.currentPage;
                    this.total = res.data.total;
                    this.pageSize = res.data.pageSize;
                    this.dataList = res.data.results;
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((res) => {
                console.log(res);
            })
        },
        handlePageChange(val){  
            this.currentPage = val;
            this.list();
        },
        hideDialog() {
            this.dialogVisible = false;
        },
        handleClose() {

        },
        handleRemove() {

        }
    },
    filters: {
        typeText(type, linkTypes) {
            let currentData = linkTypes.find((item, index) => {
                return item.value == type;
            })
            if ( currentData ) {
                return currentData.label;
            }
            return ""
        }
    }
}
</script>