<template>
    <div class="wrap">
        <div class="title">
            <span>意见反馈列表</span>
        </div>
        <el-table
            :data="dataList"
            border
            style="width: 100%">
            <el-table-column
				label="类型"
				prop="dictName"
				align='center'>
            </el-table-column>
			<el-table-column
				label="联系方式"
				prop="contact"
				align='center'>
            </el-table-column>
		    <el-table-column
				label="问题描述"
				prop="comment"
				align='center'>
            </el-table-column>
            <el-table-column
            align='center'
            label="是否允许联系">
                <template slot-scope="scope">
                    <span>{{ scope.row.enable | typeText(enableList) }}</span>
                </template>
            </el-table-column>
            <el-table-column
				label="创建时间"
				prop="createDate"
				align='center'>
            </el-table-column>
            <el-table-column
                align='center'
                label="操作">
                 <template slot-scope="scope">
                        <el-button type="info" plain @click="showDialog(scope.row.id)" >查看</el-button>
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
                        <span>反馈类型：</span>
                        <span v-text="detail.dictName"></span>
                    </div>
                    <div>
                        <span>联系方式：</span>
                        <span v-text="detail.contact"></span>
                    </div>
                    <div>
                        <span>图片：</span>
                         <el-image 
                            style="width: 100px; height: 100px"
                            :src="item"
                            v-for="item in imgList"
                            :key="item"
                            >
                        </el-image>
                    </div>
                    <div>
                        <span>问题描述：</span>
                        <span v-text="detail.comment"></span>
                    </div>
                    <div>
                        <span>是否允许开发者在28小时内通过客服信息联系我：</span>
                          <span>{{ detail.enable | typeText(enableList) }}</span>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="hideDialog">取 消</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import { getFeedback,feedbackList} from "@/utils/api";
export default {
    data() {
        return {
            total:0,
            currentPage: 1,
            pageSize: 20,
            dataList: [],
            enableList: [
                {
                    value: 0,
                    label: '否'
                },
                {
                    value: 1,
                    label: '是'
                }
            ],
            dialogVisible:false,
            detail: {
                id: "",
                dictId: "",
                dictName: "",
                contact: "",
                imgs: "",
                comment: "",
                enable: ""
            }
        }
    },
    created() {
        this.list();
    },
    computed: {
        imgList() {
           return this.detail.imgs.split(",");
        }
    },
    methods: {
        search() {
             this.list();
        },
        list() { 
            let params = {
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
        get(id){
                getFeedback(id).then((res) => {
                if ( res.code == 200 && res.data ) {
                    this.detail = res.data;
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