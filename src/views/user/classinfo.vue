<template>
    <div>
        <el-container direction="vertical">
            <div class="header">
                <div class="title"> {{ className }} </div>
                <div class="info idInfo"> {{ classId }} </div>
                <div class="info timeInfo"> {{ createdTime.substring(0,10) }}  </div>
            </div>
            <el-container>
                <el-aside width="15%">
                    <el-menu
                        class="asideMenu"
                        :router="true"
                        default-active="/classinfo/student">
                        <el-menu-item index="/classinfo/announcement">
                            <span slot="title">公 告</span>
                        </el-menu-item>
                        <el-menu-item index="/classinfo/student">
                            <span slot="title">学 员</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container> 
        </el-container>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                //上一个窗口传递参数接收
                classId: 0,
                className: "",
                createdTime: "",
            }
        },
        mounted() {
            this.classId = this.$route.query.classId;
            this.className = this.$route.query.className;
            this.createdTime = this.$route.query.createdTime;
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }
</script>

<style scoped>
.header{
    width: 100vw;
    height: 16vh;
    position: relative;
    background-color: #D3DCE6;
}
.title{
    font-size: 35px;
    font-weight: 500;
    left: 20%;
    position: absolute;
    top: 10px;
}
.info{
    font-size: 20px;
    font-weight: 400;
}
.idInfo{
    left: 20%;
    bottom: 10px;
    float: left;
    position: absolute;
}
.timeInfo{
    right: 20%;
    bottom: 10px;
    float: right;
    position: absolute;
}
.el-aside{
    min-width: 125px;
    max-width: 250px;
}
.el-aside::-webkit-scrollbar{
    display: none;
}
.asideMenu{
    text-align: center;
    height: 84vh;
    background-color: rgb(250, 250, 250);
}

</style>