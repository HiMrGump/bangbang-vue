<template>
    <div class="wrap">
        <div class="title">
            <span>首页轮播</span>
        </div>
        <el-table
            :data="imgs"
            border
            style="width: 100%">
            <el-table-column
            label="序号"
            align='center'
            width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.sort}}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="图片"
            align='center'
            width="180">
                <template slot-scope="scope">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="scope.row.img" 
                        :preview-src-list="getSrcList">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
            align='center'
            label="链接类型">
                <template slot-scope="scope">
                    <span>{{ scope.row.type | typeText(linkTypes) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                align='center'
                prop="url"
                label="跳转地址">
            </el-table-column>
            <el-table-column
                align='center'
                label="启用">
                    <template slot-scope="scope">
                        <el-switch
                            :disabled="true"
                            v-model="scope.row.enable_bool"
                            active-color="#FFD04B">
                        </el-switch>
                    </template>
            </el-table-column>
            <el-table-column
                align='center'
                label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="deleteImg(scope.row)">删除</el-button>
                    </template>
            </el-table-column>
        </el-table>
        <footer>
            <el-button icon="el-icon-plus" @click="showBannerDialog">添加轮播图</el-button>
        </footer>
        <el-dialog
            title="添加轮播图"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
                <div class="content-wrap">
                    <div>
                        <span>上传图片：</span>
                        <el-upload
                            :action="action"
                            list-type="picture-card"
                            name='f'
                            :on-success="uploadSuccess"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                    <div>
                        <span>跳转类型：</span>
                        <el-select v-model="temp.type" placeholder="请选择">
                            <el-option
                                v-for="item in linkTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>跳转链接：</span>
                        <el-input v-model="temp.url" placeholder="请输入外部跳转地址"/>
                    </div>
                    <div>
                        <span>设置排序：</span>
                        <el-input v-model="temp.sort" placeholder="请输入序号"/>
                    </div>
                    <div>
                        <span>是否启用：</span>
                        <el-switch
                            v-model="temp.enable_bool"
                            active-color="#FFD04B">
                        </el-switch>
                    </div>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="hideBannerDialog">取 消</el-button>
                    <el-button type="primary" @click="saveAdEvent">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import { adList, adSave, delAd } from "@/utils/api";
export default {
    data() {
        return {
            action: `${process.env.VUE_APP_URL}/public/upload`,
            dialogVisible: false,
            dialogImageUrl: '',
            imgs: [],
            linkTypes: [
                {
                    value: 0,
                    label: '外部链接'
                },
                {
                    value: 1,
                    label: '内部链接'
                }
            ],
            temp: {
                img: "",
                type: 0,
                sort: "",
                url: "",
                enable: 1,
                enable_bool: true,
                innerType: 0,
                innerId: -1
            }
        }
    },
    created() {
        this.getList();
    },
    mounted() {
        
    },
    computed: {
        getSrcList() {
            return this.imgs.map((item, index) => {
                return item.img;
            })
        }
    },
    methods: {
        handleClose() {

        },
        handleRemove() {

        },
        uploadSuccess(response, file, fileList) {
            if ( response.code == 200 && response.data ) {
                this.temp.img = response.data;
            }
        },
        uploadProgress(event, file, fileList) {
            // console.log(event, file, fileList);
        },
        delImg(index) {
            this.imgs.splice(index, 1);
        },
        getList() {
            adList().then((res) => {
                if ( res.code == 200 && res.data ) {
                    this.imgs = res.data;
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((res) => {
                console.log(res);
            })
        },
        saveAd(data) {
            adSave(data).then((res) => {
                if ( res.code == 200 ) {
                    this.$message.success('添加成功！');
                    this.hideBannerDialog();
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((res) => {
                console.log(res);
            })
        },
        saveAdEvent() {
            let { 
                img,
                type,
                sort,
                url,
                enable,
                enable_bool,
                innerType,
                innerId
                } = this.temp;
            enable = enable_bool? 1: 0;
            let params = {
                img,
                type,
                sort,
                url,
                enable,
                innerType,
                innerId
            }

            this.saveAd(params);
        },
        deleteImg(row) {
            let { id } = row;
            delAd(id).then((res) => {
                if ( res.code == 200 ) {
                    this.$message.success("删除成功");
                    setTimeout(() => {
                        this.getList();
                    }, 200)
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        showBannerDialog() {
            this.dialogVisible = true;
        },
        hideBannerDialog() {
            this.dialogVisible = false;
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
    .title{
        margin-bottom: 20px;
        color: #333;
        display: flex;
        align-items: center;

        .el-button{
            margin-left: 20px;
        }
    }
    .upload-wrap{
        display: flex;
    }
    /deep/.suolue{
        width: 100px;
        height: 100px;
    }
    footer{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    .content-wrap{
        
        & > div{
            display: flex;
            margin-bottom: 20px;
            .el-input{
                width: 500px;
            }
        }
    }
</style>