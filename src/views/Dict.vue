<template>
    <div class="wrap">
        <div class="title">
            <span>字典列表</span>
        </div>
        <el-table
            :data="dictList"
            border
            style="width: 100%">
            <el-table-column
				label="字典名称"
				prop="name"
				align='center'>
            </el-table-column>
			<el-table-column
				label="字典类型"
				prop="type"
				align='center'>
            </el-table-column>
		    <el-table-column
				label="字典码"
				prop="code"
				align='center'>
            </el-table-column>
			 <el-table-column
				label="字典值"
				prop="value"
				align='center'>
            </el-table-column>
            <el-table-column
				label="排序"
				prop="sortIndex"
				align='center'>
            </el-table-column>
			 <el-table-column
				label="描述"
				prop="descript"
				align='center'>
            </el-table-column>
             <el-table-column
               align='center'
               label="字典类型">
                <template slot-scope="scope">
                    <span>{{ scope.row.accessDelete | typeText(accessDeleteList) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                align='center'
                label="操作">
                 <template slot-scope="scope">
                        <el-button type="info" plain @click="del(scope.row.id)" v-show="scope.row.accessDelete == 0" >删除</el-button>
                        <el-button type="primary" plain @click="showDialog(scope.row.id)" >修改</el-button>
                 </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handlePageChange"
            @size-change="handlePageChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[20,30,50,100]"
            :total="total">
        </el-pagination>
         <footer>
            <el-button icon="el-icon-plus" @click="showDialog(null)">添加字典</el-button>
         </footer>
          <el-dialog
            title="添加字典"
            :visible.sync="dialogVisible"
            width="50%"
             close-on-click-modal>
             <el-form :model="detail" :rules="rules" ref="detail" label-width="100px">
                <div class="content-wrap">
                    <el-form-item  label="字典名称" prop="name">
                        <el-input v-model="detail.name" :disabled="isUpdate" placeholder="请输入字典名称"/>
                    </el-form-item>
                    <el-form-item  label="字典类型" prop="type">
                        <el-input v-model="detail.type" :disabled="isUpdate" placeholder="请输入字典类型"/>
                    </el-form-item>
                     <el-form-item  label="字典码" prop="code">
                        <el-input v-model="detail.code" :disabled="isUpdate" placeholder="请输入字典类型"/>
                    </el-form-item>
                    <el-form-item  label="字典值" prop="value">
                        <el-input v-model="detail.value"  placeholder="请输入字典类型"/>
                    </el-form-item>
                   <el-form-item  label="描述" prop="descript">
                        <el-input v-model="detail.descript"  placeholder="请输入描述"/>
                    </el-form-item>
                    <el-form-item  label="排序" prop="sortIndex">
                        <el-input v-model="detail.sortIndex"  placeholder="请输入排序" style="width: 20%;"/>
                    </el-form-item>
                </div>
             </el-form>
             <span slot="footer" class="dialog-footer">
                <el-button @click="hideDialog">取 消</el-button>
                 <el-button type="primary" @click="save">确 定</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
import { dictList,saveDict,updateDict,deleteDict,getDict} from "@/utils/api";
export default {
    data() {
        return {
            total:0,
            currentPage: 1,
            pageSize: 20,
            dictList: [],
            accessDeleteList: [
                {
                    value: 0,
                    label: '普通参数'
                },
                {
                    value: 1,
                    label: '系统参数'
                }
            ],
            isUpdate:false,
            dialogVisible:false,
            detail: {
                id: "",
                name: "",
                type: "",
                code: "",
                value: "",
                descript: "",
                sortIndex: 0,
                accessDelete:0
           },
           initDetail: {
                id: "",
                name: "",
                type: "",
                code: "",
                value: "",
                descript: "",
                sortIndex: 0,
                accessDelete:0
           },
           rules: {
              name: [
                 { required: true, message: '字典名称必填', trigger: 'blur' }
              ],
               type: [
                 { required: true, message: '字典类型必填', trigger: 'blur' }
              ],
               code: [
                 { required: true, message: '字典码必填', trigger: 'blur' }
              ],
              value: [
                 { required: true, message: '字典值必填', trigger: 'blur' }
              ],
              sortIndex: [
                 { required: true, message: '排序必填', trigger: 'blur' },
                 { pattern: /^\d+$/,message: '排序必须为正整数'}
              ]
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
            let params = {
                currentPage:this.currentPage,
                pageSize:this.pageSize
            }
            dictList(params).then((res) => {
                if ( res.code == 200 && res.data ) {
                    this.currentPage = res.data.currentPage;
                    this.total = res.data.total;
                    this.pageSize = res.data.pageSize;
                    this.dictList = res.data.results;
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((res) => {
                console.log(res);
            })
        },
        save() { 
            this.$refs['detail'].validate((valid) => {
                if (valid) {
                     if(this.detail.id == ""){
                          saveDict(this.detail).then((res) => {
                                if ( res.code == 200) {
                                    this.$message.success(res.msg);
                                    this.hideDialog();
                                    this.list();
                                }else{
                                    this.$message.error(res.msg)
                                }
                            }).catch((res) => {
                                console.log(res);
                            }) 
                     }else{
                             updateDict(this.detail).then((res) => {
                                if ( res.code == 200) {
                                    this.$message.success(res.msg);
                                    this.hideDialog();
                                    this.list();
                                }else{
                                    this.$message.error(res.msg)
                                }
                            }).catch((res) => {
                                console.log(res);
                            }) 
                     }
                } else {
                    return false;
                }
            });
        },
        get(id) { 
             getDict(id).then((res) => {
                if ( res.code == 200 && res.data ) {
                    this.detail = res.data;
                     this.isUpdate = true;
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((res) => {
                console.log(res);
            })
        },
        del(id) { 
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    deleteDict(id).then((res) => {
                        if ( res.code == 200) {
                            this.$message.success(res.msg);
                            this.list();
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch((res) => {
                        console.log(res);
                    })
                }).catch(() => {    
            });
        },
        handlePageChange(val){  
            this.currentPage = val;
            this.list();
        },
        showDialog(id) {
            this.dialogVisible = true;
            this.isUpdate = false;
            this.detail = this.initDetail;
            if(id){
                this.isUpdate = true;
                this.get(id);  
            }
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