<template>
    <div>
        <el-container direction="vertical">
            <div class="header">
                <div class="title"> {{ classInfo.className }} </div>
                <div class="info idInfo"> {{ classInfo.classId }} </div>
                <div class="info timeInfo"> {{ time.substring(0,10) }}  </div>
            </div>
            <el-container>
                <el-aside width="15%">
                    <el-menu
                        class="asideMenu"
                        :router="true"
                        @select="handleSelect"
                        :default-active="activeClassInfoPath">
                        <el-menu-item 
                            v-for="item in asideNavData"
                            :key="item.key"
                            :index="item.url">
                            <span slot="title">{{ item.name }}</span>
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
                //侧边导航栏数据
                asideNavData: [
                    {
                        key: 1,
                        url: '/classinfo/announcement',
                        name: '公 告',
                    },
                    {
                        key: 2,
                        url: '/classinfo/student',
                        name: '学 员',
                    },
                ],
                //上一个窗口传递参数接收
                // classInfo:{
                //     classId: 0,
                //     className: "",
                //     createdTime: "",
                //     classPicture: "",
                // },
                classInfo: {},
                time: "",
                activeClassInfoPath: '',
            }
        },
        mounted() {
            this.classInfo = JSON.parse(window.sessionStorage.getItem("classInfo"));
            this.time = this.classInfo.createdTime;
        },
        methods: {
            handleSelect(key, keyPath) {
                sessionStorage.setItem("classInfoPath",key);
            },
        },
        created() {
            this.activeClassInfoPath = sessionStorage.getItem("classInfoPath");
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