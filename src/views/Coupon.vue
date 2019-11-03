<template>
    <div class="wrap">
        <div class="title">
            <span>现金券列表</span>
        </div>
           <div class="search-wrap">
             <span>使用情况:</span>
              <el-select v-model="searchStatus" placeholder="请选择">
                <el-option  
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <el-table
            :data="dataList"
            border
            style="width: 100%">
            <el-table-column
				label="用户"
				prop="username"
				align='center'>
            </el-table-column>
			<el-table-column
				label="额度(分)"
				prop="money"
				align='center'>
            </el-table-column>
		    <el-table-column
				label="过期时间"
				prop="expireDate"
				align='center'>
            </el-table-column>
             <el-table-column
				label="描述"
				prop="comment"
				align='center'>
            </el-table-column>
            <el-table-column
            align='center'
            label="校园卡状态">
                <template slot-scope="scope">
                    <span>{{ scope.row.status | typeText(statusList) }}</span>
                </template>
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
import { couponList } from "@/utils/api";
export default {
    data() {
        return {
            total:0,
            currentPage: 1,
            pageSize: 20,
            dataList: [],
            searchStatus: -1,
            statusList: [
                {
                    value: -1,
                    label: '全部'
                },
                {
                    value: 0,
                    label: '未使用'
                },
                {
                    value: 1,
                    label: '已使用'
                },
                {
                    value: 2,
                    label: '已失效'
                }
            ]
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
            let params = {
                status:this.searchStatus
            }
            feedbackList(params).then((res) => {
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