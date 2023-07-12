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
                            <i class="el-icon-s-custom"></i>
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
                    {
                        key: 4,
                        url: '/classinfo/classpaper',
                        name: '试 卷',
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
                this.isCollapse = false;
            },
            noShowAside(){
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
    background-color: rgb(205, 200, 182);

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
    background-color: rgba(255, 255, 255, 0.5);  
    backdrop-filter: blur(40px); 
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0;
}
.asideMenu:hover{
    animation: radiusTransform 0.3s ease normal forwards;
}
.asideMenu:not(:hover){
    animation: oppRadiusTransform 0.3s ease normal forwards;
}
@keyframes radiusTransform {
    from{
        border-radius: 0;
    }
    10%{
        border-radius: 0 4px 4px 0;
    }
    20%{
        border-radius: 0 10px 10px 0;
    }
    50%{
        border-radius: 0 20px 20px 0;
    }
    to{
        border-radius: 0 30px 30px 0;
    }
}
@keyframes oppRadiusTransform{
    from{
        border-radius: 0 30px 30px 0;
    }
    50%{
        border-radius: 0 20px 20px 0;
    }
    80%{
        border-radius: 0 10px 10px 0;
    }
    90%{
        border-radius: 0 4px 4px 0;
    }
    to{
        border-radius: 0;
    }
}
.asideMenu:not(.el-menu--collapse) {
    width: 100%;
}
.el-menu-item {
    border-radius: 35px;
    overflow: hidden;
    margin-bottom: 60px;
}
.el-menu-item:hover {
    transition: 0.6s;
    background: rgb(211, 208, 208);
}
.el-main{
    padding: 0;
    padding-left: 64px;
    box-sizing: border-box;
}
</style>