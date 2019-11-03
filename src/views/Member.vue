<template>
    <div class="wrap">
        <div class="title">
            <span>用户列表</span>
        </div>
        <div class="search-wrap">
            <span>用户名:</span>
            <el-input v-model="searchUsername" placeholder="请输入用户名"/>
            <span>呢称:</span>
            <el-input v-model="searchNick" placeholder="请输入呢称"/>
            <span>黑名单:</span>
           <el-select v-model="searchEnable" placeholder="请选择">
                <el-option  
                v-for="item in searchEnableList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
             <span>校园卡状态:</span>
              <el-select v-model="searchStatus" placeholder="请选择">
                <el-option  
                v-for="item in searchStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="search">搜索</el-button>
        </div>

        <el-table
            :data="userList"
            border
            style="width: 100%">
            <el-table-column
				label="微信openId"
				prop="accountName"
				align='center'
                width="300">
            </el-table-column>
			<el-table-column
				label="呢称"
				prop="nick"
				align='center'>
            </el-table-column>
		    <el-table-column
				label="用户名"
				prop="username"
				align='center'>
            </el-table-column>
			 <el-table-column
				label="身份证"
				prop="idCard"
				align='center'>
            </el-table-column>
			 <el-table-column
				label="手机号"
				prop="phone"
				align='center'>
            </el-table-column>
			<el-table-column
				label="微信号"
				prop="wechat"
				align='center'>
            </el-table-column>
            <el-table-column
				label="创建时间"
				prop="createDate"
				align='center'>
            </el-table-column>
            <el-table-column
            align='center'
            label="黑名单状态">
                <template slot-scope="scope">
                    <span>{{ scope.row.enable | typeText(enableList) }}</span>
                </template>
            </el-table-column>
			 <el-table-column
            align='center'
            label="校园卡状态">
                <template slot-scope="scope">
                    <span>{{ scope.row.status | typeText(statusList) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                align='center'
                label="操作">
                 <template slot-scope="scope">
                        <el-button type="info" plain @click="showDialog(scope.row.id)" >审核操作</el-button>
                        <el-button type="primary" plain @click="showOrderDialog(scope.row.id)" >设置优先接单</el-button>
                 </template>
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
         <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            width="30%"
            close-on-click-modal>
                <div class="content-wrap">
                    <div>
                        <span>微信openId：</span>
                        <span v-text="detail.accountName"></span>
                    </div>
                    <div>
                        <span>呢称：</span>
                        <span v-text="detail.nick"></span>
                    </div>
                    <div>
                        <span>用户名：</span>
                        <span v-text="detail.username"></span>
                    </div>
                    <div>
                        <span>头像：</span>
                         <el-image 
                            style="width: 100px; height: 100px"
                            :src="detail.userAvatar" >
                        </el-image>
                    </div>
                    <div>
                        <span>手机号：</span>
                        <span v-text="detail.phone"></span>
                    </div>
                     <div>
                        <span>校园卡：</span>
                         <el-image 
                            style="width: 100px; height: 100px"
                            :src="detail.schoolCard" >
                        </el-image>
                    </div>
                    <div>
                        <span>手机号：</span>
                        <span v-text="detail.phone"></span>
                    </div>
                    <div>
                        <span>总星级数：</span>
                        <span v-text="detail.totalStar"></span>
                    </div>
                    <div>
                        <span>订单总数：</span>
                        <span v-text="detail.orderCount"></span>
                    </div>
                    <div>
                        <span>黑名单状态：</span>
                         <el-select v-model="detail.enable" placeholder="请选择">
                            <el-option  
                            v-for="item in enableList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>校园卡状态：</span>
                         <el-select v-model="detail.status" placeholder="请选择">
                            <el-option  
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="hideDialog">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </span>
        </el-dialog>
          <el-dialog
            title="设置优先接单"
            :visible.sync="dialogOrderVisible"
            width="30%"
            close-on-click-modal>
                <div class="content-wrap">
                    <div>
                        <span>优先接单：</span>
                         <el-checkbox-group v-model="detail.modelIds">
                            <el-checkbox v-for="item in modelList" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="hideOrderDialog">取 消</el-button>
                    <el-button type="primary" @click="updateOrder">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import { userList,getUser,updateUser} from "@/utils/api";
export default {
    data() {
        return {
            total:0,
            currentPage: 1,
            pageSize: 20,
            userList: [],
            modelList:[
                {
                    id:"1",
                    name:"帮帮公益"
                },
                {
                    id:"2",
                    name:"帮帮快递"
                },
                {
                    id:"3",
                    name:"帮帮求助"
                },
                {
                    id:"4",
                    name:"帮帮闲置"
                }
            ],
            enableList: [
                {
                    value: 0,
                    label: '未注册'
                },
                {
                    value: 1,
                    label: '正常'
                },
				 {
                    value: 2,
                    label: '黑名单'
                }
            ],
            statusList: [
                {
                    value: 0,
                    label: '未审核'
                },
                {
                    value: 1,
                    label: '审核中'
                },
				{
                    value: 2,
                    label: '审核通过'
                },
				{
                    value: 3,
                    label: '审核拒绝'
                }
            ],
            searchNick: "",
            searchUsername: "",
            searchEnable:-1,
            searchStatus:-1,
            dialogVisible:false,
            dialogOrderVisible:false,
            detail: {
                id: "",
                accountName: "",
                nick: "",
                username: "",
                userAvatar: "",
                idCard: "",
                phone: "",
                userEmail: "",
                schoolCard:"",
                wechat:"",
                enable:0,
                status:0,
                totalStar:0,
                orderCount:0,
                modelIds:[]
            }
        }
    },
    created() {
        this.list();
    },
    computed:{
        searchEnableList:function(){
            let searchEnableList = this.enableList;
            searchEnableList.splice(0,0,{value:-1,label:"全部"});
            return searchEnableList;
        },
        searchStatusList:function(){
           let searchStatusList = this.statusList;
            searchStatusList.splice(0,0,{value:-1,label:"全部"});
            return searchStatusList;
        }
    },
    methods: {
        search() {
             this.list();
        },
        list() { 
            let params = {
                isAdmin:0,
                username:this.searchUsername,
                nick:this.searchNick,
                enable:this.searchEnable,
                status:this.searchStatus,
                currentPage:this.currentPage,
                pageSize:this.pageSize
            }
            userList(params).then((res) => {
                if ( res.code == 200 && res.data ) {
                    this.currentPage = res.data.currentPage;
                    this.total = res.data.total;
                    this.pageSize = res.data.pageSize;
                    this.userList = res.data.results;
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((res) => {
                console.log(res);
            })
        },
        get(id){
                getUser(id).then((res) => {
                if ( res.code == 200 && res.data ) {
                    let modelIds = res.data.modelIds;
                    res.data.modelIds = [];
                    this.detail = res.data;
                    if(modelIds){
                         this.detail.modelIds = modelIds.split(",");
                    }
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((res) => {
                console.log(res);
            })
        },
        update() { 
            let params = {
                id:this.detail.id,
                enable:this.detail.enable,
                status:this.detail.status,
                modelIds:this.detail.modelIds.join(","),
            }
           updateUser(params).then((res) => {
                if ( res.code == 200) {
                    this.$message.success(res.msg);
                    this.hideDialog();
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((res) => {
                console.log(res);
            })
        },
        updateOrder() { 
            let params = {
                id:this.detail.id,
                modelIds:this.detail.modelIds.join(","),
            }
           updateUser(params).then((res) => {
                if ( res.code == 200) {
                    this.$message.success(res.msg);
                    this.hideDialog();
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
        showDialog(id) {
            this.dialogVisible = true;
            this.get(id);
        },
        hideDialog() {
            this.dialogVisible = false;
        },
        showOrderDialog(id) {
            this.dialogOrderVisible = true;
            this.get(id);
        },
        hideOrderDialog() {
            this.dialogOrderVisible = false;
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

<style lang="less" scoped>
    .search-wrap{
        display: flex;
        align-items: center;

        .el-input{
            width: 300px;
        }
    }
</style>