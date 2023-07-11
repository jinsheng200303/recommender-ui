<template>
    <div>
        <el-container>
            <div
            class="asideArea"
            @mouseover="showAside"
            @mouseleave="noShowAside">
                <el-aside>
                    <el-menu
                        :collapse="isCollapse"    
                        class="asideMenu"
                        :router="true"
                        @select="handleSelect"
                        :default-active="activeClassInfoPath">
                        <el-menu-item 
                            v-for="item in asideNavData"
                            :key="item.key"
                            :index="item.url">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{ item.name }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
            </div>
            <el-main>
                <router-view></router-view>
            </el-main>
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
                    {
                        key: 3,
                        url: '/classinfo/classexam',
                        name: '考 试',
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
                activeClassInfoPath: '',
                isCollapse: true,
            }
        },
        mounted() {
            this.classInfo = JSON.parse(window.sessionStorage.getItem("classInfo"));
        },
        methods: {
            handleSelect(key, keyPath) {
                sessionStorage.setItem("classInfoPath",key);
            },
            showAside(){
                console.log("show")
                this.isCollapse = false;
            },
            noShowAside(){
                console.log("noShow")
                this.isCollapse = true;
            },
        },
        created() {
            if(sessionStorage.getItem("classInfoPath") == undefined
            || sessionStorage.getItem("classInfoPath") == null){
                this.activeClassInfoPath = '/classinfo/student';
            }else {
                this.activeClassInfoPath = sessionStorage.getItem("classInfoPath");
            }
        },
    }
</script>

<style scoped>
.el-container{
    position: relative;
}
.asideArea{
    position: absolute;
    z-index: 200;
    height: 100vh;
}
.el-aside{
    width: 200px !important;
    height: 100%;
}
.el-aside::-webkit-scrollbar{
    display: none;
}
.asideMenu{
    text-align: center;
    height: 100%;
    background-color: rgb(255,255,255,0.4);  
    backdrop-filter: blur(40px); 
}
.asideMenu:not(.el-menu--collapse) {
    width: 100%;
}
.el-main{
    padding: 0;
    padding-left: 64px;
}
</style>