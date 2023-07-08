<template>
    <el-container direction="vertical">
        <userinfoedit ref="userinfoedit" @submitInfo="refresh"></userinfoedit>
        <img src="../../assets/image1.jpg" alt="" class="image">
        <div class="userInfo">
            <div class="info-header">
                <el-button type="primary" size="small" @click="handleEdit">编 辑</el-button>
            </div>
            <ul class="info-list">
                <li class="info-list-item">
                    <span class="list-item-label">用户名:</span>
                    <span class="list-item-content">{{ userInfo.userName }}</span>
                </li>
                <li class="info-list-item">
                    <span class="list-item-label">邮箱:</span>
                    <span class="list-item-content">{{ userInfo.email }}</span>
                </li>
                <li class="info-list-item">
                    <span class="list-item-label">用户角色:</span>
                    <span class="list-item-content">
                        <el-tag size="small">{{ getUserRole }}</el-tag>
                    </span>
                </li>
                <li class="info-list-item">
                    <span class="list-item-label">性别:</span>
                    <span class="list-item-content">{{ getUserGender }}</span>
                </li>
                <li class="info-list-item">
                    <span class="list-item-label">出生日期:</span>
                    <span class="list-item-content">{{ getUserBirth }}</span>
                </li>
                <li class="info-list-item">
                    <span class="list-item-label">简介:</span>
                    <span class="list-item-content">
                        {{ getUserSynopsis }}
                    </span>
                </li>
            </ul>
        </div>
        <div>
            <el-button type="danger" @click="signOut">退出登录</el-button>
        </div>
    </el-container>
</template>

<script>
import { getUserInfoById } from '@/api/userApis.js'
import userinfoedit from './userinfoedit.vue';
export default {
    components: {
        userinfoedit,
    },
    data() {
        return {
            userInfo: {
                // "userId": 1,
                // "userName": "张三",
                // "name": null,
                // "email": "111222333@qq.com",
                // "gender": "M",
                // "birth": null,
                // "politics": "10",
                // "profession": null,
                // "school": null,
                // "age": null,
                // "avatar": null,
                // "synopsis": null
            },
            roleId: 0,
        }
    },
    mounted() {
        this.getInfo();
    },
    computed: {
        getUserRole(){
            if(this.roleId == 1){
                return "学 生";
            }else if(this.roleId == 2){
                return "教 师"
            }
        },
        getUserGender(){
            if(this.userInfo.gender == "M"){
                return "男";
            }else if(this.userInfo.gender == "F"){
                return "女";
            }else if(this.userInfo.gender == "U"){
                return "未知";
            }else{
                return "未知";
            }
        },
        getUserSynopsis(){
            if(this.userInfo.synopsis){
                return this.userInfo.synopsis;
            }else {
                return "暂无";
            }
        },
        getUserBirth(){
            console.log(this.userInfo.birth)
            if(this.userInfo.birth){
                return this.userInfo.birth.substring(0,10);
            }else {
                return "暂无";
            }
        },
    },
    methods: {
        handleEdit(){
            this.$nextTick(()=>{
                this.$refs.userinfoedit.dialogVisible();
            })
            this.$nextTick(()=>{
                this.$refs.userinfoedit.updateForm(JSON.parse(JSON.stringify(this.userInfo)));
            })
        },
        getInfo(){
            let userId = JSON.parse(window.localStorage.getItem("userInfo")).userId;
            this.roleId = JSON.parse(window.localStorage.getItem("userInfo")).roleId;
            getUserInfoById(userId)
            .then((res) => {
                console.log(JSON.stringify(res.data))
                this.userInfo = res.data
            })
        },
        //修改后调用方法
        refresh(userInfoForm){
            this.userInfo = userInfoForm;
        },
        signOut(){
            this.$confirm("确定退出?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                window.localStorage.clear();
                sessionStorage.clear();
                this.$router.push('/login');
            })
        },
    },
}
</script>

<style scoped>
.el-container{
    display: flex;
    align-items: center;
    padding: 20px ;
    min-height: calc(100vh - 60px);
    background-color: rgb(245, 245, 245);
}
.image {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    box-shadow: 0 5px 15px -2px rgba(0, 0, 0, .3);
}
.userInfo{
    padding: 30px;
    width: 50%;
    max-width: 600px;
}
.info-header{
    display: flex;
    justify-content: end;
    padding: 10px;
}
.info-list{
    list-style: none;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 1px 1px 20px -2px rgba(0, 0, 0, .2);
}
.info-list-item{
    margin-bottom: 30px;
    display: flex;
}
.info-list-item:last-child{
    margin-bottom: 0;
}
.list-item-label{
    min-width: 80px;
    margin-right: 30px;
    display: flex;
    justify-content: end;
    font-size: 1.2rem;
    line-height: 30px;
}
.list-item-content{
    font-size: 1rem;
    font-weight: 300;
    line-height: 30px;
}
</style>