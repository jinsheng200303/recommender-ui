<template>
    <el-container direction="vertical">
        <el-header>
            <el-input
                class="search-input"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="input">
            </el-input>
            <div class="el-header-right">
                <el-button type="primary" size="small" @click="addClass"><i class="el-icon-plus"></i>添加</el-button>
                <!-- <el-button type="primary" size="small" @click="showButton">编  辑</el-button> -->
            </div>
        </el-header>
        <el-main class="course-card-area">
            <ul
            class="infinite-list"
            style="overflow:auto">
                <li v-for="classes in classData" class="infinite-list-item" :key="classes.classId">
                    <classcard :records="classes" ref="classCard"></classcard>
                </li>
            </ul>
            <!-- <p class="infinite-footer">{{ footerTip }}</p> -->
        </el-main>
        <addClass ref="addClass" @call-father="resetAfterAdd"></addClass>
        <joinclass ref="joinclass"></joinclass>
    </el-container>
</template>

<script>
import classcard from './classcard.vue'
import addClass from './addclass.vue'
import joinclass from './joinclass.vue'
import { getClassByuserId } from '@/api/userApis.js'
export default {
    components:{
        classcard,
        addClass,
        joinclass,
    },
    data() {
        // "classData": [
		// 	{
		// 		"classId": 0,
		// 		"className": "",
		// 		"classPicture": "",
		// 		"createdTime": ""
		// 	}
		// ],
        return {
            input: '',
            loading: false,
            classData: [],
            pageInfo:{
                className: "",
                pageNum: 0,
                pageSize: 4,
            },
        }
    },
    computed: {
        footerTip(){
            if(this.loading){
                return "加载中...";
            }else if(this.noMore){
                return "没有更多了";
            }
        }
    },
    methods: {
        //滑动加载获取数据
        load () {
            // this.loading = true;
            this.getClass()
        },
        //获取新的课堂数据
        getClass() {
            // this.pageInfo.pageNum++;
            let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
            getClassByuserId(userId)
            .then((res) => {
                this.classData.push(...res.data);
                // if(res.data.records.length < this.pageInfo.pageSize){
                //     this.noMore = true
                // }
                // this.loading = false
          });
        },
        //删除按钮显示
        showButton(){
            this.$nextTick(()=>{
                for (let index = 0; index < this.classData.length; index++) {
                    this.$refs.classCard[index].buttonVisible();
                }
            })
        },
        //增加课堂
        addClass(){
            let roleId = JSON.parse(localStorage.getItem("userInfo")).roleId;
            if(roleId == 1){
                this.$nextTick(()=>{
                    this.$refs.joinclass.dialogVisible();
                })
            }else if(roleId == 2){
                this.$nextTick(()=>{
                    this.$refs.addClass.dialogVisible();
                })
            }
        },
        //重置课程卡片
        resetAfterAdd(){
            this.classData.splice(0,this.classData.length);
            this.pageInfo.className = "";
            this.pageInfo.pageNum = 0;
            this.pageInfo.pageSize = 4;
            this.getClass();
        }
    },
    mounted() {
        this.getClass();
    },
}
</script>

<style scoped>
    /* 搜索框按钮区域样式 */
    .el-header{
        display: flex;
        align-content: center;
        justify-content: space-between;
    }
    .search-input{
        width: 30%;
        max-width: 350px;
        min-width: 175px;
        margin: 10px 20px;
    }
    .el-header-right{
        display: flex;
        align-content: center;
        justify-content: space-between;
        margin: 10px 20px;
    }
    /* 课堂区域样式 */
    .course-card-area{
        padding: 0;
        height: calc(100vh - 120px);
        background-color: rgb(245,245,245);
    }
    .infinite-list{
        padding: 20px;
        box-sizing: border-box;
        height: calc(100vh - 120px);
        list-style: none;
    }
    .infinite-list-item{
        width: 25%;
        float: left;
        margin-bottom: 40px;
    }
    @media(max-width: 1300px){
        .infinite-list-item{
        width: 33.3%;
    }
    }
    .infinite-footer{
        float: left;
        width: 100%;
        text-align: center;
    }
</style>