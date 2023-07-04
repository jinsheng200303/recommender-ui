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
                <el-button type="primary" size="small" @click="addClass">添  加</el-button>
                <!-- <el-button type="primary" size="small" @click="showButton">编  辑</el-button> -->
            </div>
        </el-header>
        <el-main class="course-card-area">
            <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
                <li v-for="classes in classData" class="list-item" :key="classes.classId">
                    <classcard :records="classes" ref="classCard"></classcard>
                </li>
            </ul>
            <p class="infinite-footer" v-if="loading">加载中...</p>
            <p class="infinite-footer" v-if="noMore&&!loading">没有更多了</p>
        </el-main>
        <addClass ref="addClass" @call-father="resetAfterAdd"></addClass>
    </el-container>
</template>

<script>
import classcard from './classcard.vue'
import addClass from './addclass.vue'
import { classPage } from '@/api/classApis.js'
export default {
    components:{
        classcard,
        addClass,
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
                pageNum: 1,
                pageSize: 4,
            },
            newDataLength: 4,
        }
    },
    computed: {
        noMore () {
            return this.newDataLength < this.pageInfo.pageSize
        },
        disabled () {
          return this.loading || this.noMore
        },
    },
    methods: {
        //滑动加载获取数据
        load () {
          this.loading = true;
          setTimeout(() => {
            this.getClass()
            this.loading = false
          }, 1000);
        },
        //获取新的课堂数据
        getClass() {
            classPage(this.pageInfo)
            .then((res) => {
                this.pageInfo.pageNum++;
                this.classData.push(...res.data.records);
                this.newDataLength = res.data.records.length;
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
            this.$nextTick(()=>{
                this.$refs.addClass.dialogVisible();
            })
        },
        //重置课程卡片
        resetAfterAdd(){
            this.classData.splice(0,this.classData.length);
            this.pageInfo.className = "";
            this.pageInfo.pageNum = 1;
            this.pageInfo.pageSize = 4;
            this.getClass();
        }
    },
    mounted() {
        this.getClass();
        console.log()
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
        height: calc(100vh - 120px);
        background: rgb(250, 250, 250);
    }
    .list{
        height: calc(100vh - 120px);
        list-style: none;
    }
    .list-item{
        width: 25%;
        float: left;
        margin-bottom: 40px;
    }
    .infinite-footer{
        float: left;
        width: 100%;
        text-align: center;
    }
</style>