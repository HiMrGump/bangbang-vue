<template>
    <div class="layout">
        <el-container>
        <el-header>
            <div class="title">棒棒后台管理系統</div>
            <div class="user-logo">
                <el-dropdown>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                 <el-col :span="24" class="menus-wrap">
                    <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item v-for="(item, index) in menus" :key="index" :index="index + 1 + ''" @click="selectMenu(item)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{item.meta.title}}</span>
                    </el-menu-item>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-container>
            <el-main><router-view /></el-main>
            <el-footer>棒棒所有</el-footer>
            </el-container>
        </el-container>
        </el-container>
    </div>
</template>

<script>

import router from "../router/index";

export default {
    data() {
        return {
            router: router.options.routes,
            menus: router.options.routes[0].children,
        }
    },
    created() {
        console.log(router);
    },
    methods: {
        selectMenu(item) {
            console.log(item);
            this.$router.push(item.path);
        }
    }
}
</script>

<style lang="less">
.layout{
    height: 100%;
}
.title{
    text-align: left;
    font-size: 26px;
    color: #ffffff;
}
.el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
    background-color: #333333;
}
.el-header{
   display: flex;
   align-items: center;

    .title{
        flex: 1;
    }
   .user-logo{
        .el-dropdown{
            display: flex;
            align-items: center;
        }
   }
}
.el-footer{
    height: 30px !important;
    line-height: 30px;
    color: #fff;
    text-align: center;
    background-color: #333333;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
}
.el-main {
    // background-color: #E9EEF3;
    background-color: #ffffff;
    color: #333;
    text-align: left;
}
.el-container{
    height: 100%;
}
.menus-wrap,.el-menu{
    height: 100%;
}
.el-menu-item{
 text-align: left;
}
</style>