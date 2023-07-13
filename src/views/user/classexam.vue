<template>
    <el-container direction="vertical">
        <el-header>
            <div class="search-area">
                <el-input
                    size="small" 
                    class="search-input"
                    placeholder="请输入内容"
                    suffix-icon="el-icon-search"
                    v-model="input">
                </el-input>
                <el-button type="primary" size="small" class="search-button" @click="nameSearch(input)">搜 索</el-button>
            </div>
            <div class="el-header-right">
                <el-button type="primary" size="small" @click="addExam" v-if="isTeacher"><i class="el-icon-plus"></i>添加</el-button>
            </div>
        </el-header>
        <ul 
        class="infinite-list" 
        v-infinite-scroll="load"
        style="overflow:auto">
            <li v-for="(exam,index) in classExamsData" class="infinite-list-item">
                <examcard @deleteRefresh="deleteRefresh" @cardRefresh="cardRefresh" :item="exam" :index="index"></examcard>
            </li>
            <p class="infinite-footer">{{ footerTip }}</p>
        </ul>
        <addExam ref="addExam" @addRefresh="addRefresh"></addExam>
    </el-container>
</template>

<script>
import examcard from './examcard.vue'
import { getExamsPage } from "@/api/examApis.js";
import addExam from './addexam.vue';
export default {
    components:{
        examcard,
        addExam,
    },
    data() {
        return {
            input: '',
            isLoading: false,
            noMore: false,
            classExamsData: [],
            examsQuery: {
                classId: 0,
                examTitle: "",
                pageNum: 0,
                pageSize: 2,
            },
            isTeacher: false,
        }
    },
    methods: {
        nameSearch(input){

        },
        addExam(){
            this.$nextTick(() => {
                this.$refs.addExam.dialogVisible();
            })
        },
        load(){
            if(!this.noMore){
                this.isLoading = true;
                this.getExamsData();
            }
        },
        deleteRefresh(examId){
            this.classExamsData.forEach((item,index) => {
                if(examId == item.examId){
                    this.$delete(this.classExamsData,index);
                    return;
                }
            })
        },
        cardRefresh(temInfo,index){
            this.classExamsData[index] = temInfo;
        },
        addRefresh(newExam){
            this.classExamsData.unshift(newExam);
        },
        getExamsData(){
            this.examsQuery.pageNum++;
            getExamsPage(this.examsQuery)
            .then((res) => {
                if(res.code == 200){
                    this.classExamsData.push(...res.data.records);
                    if(res.data.records.length < this.examsQuery.pageSize){
                        this.noMore = true;
                    }
                    this.isLoading = false;
                }else {
                    this.$message.error(res.msg);
                }
            })
        },
    },
    computed: {
        footerTip(){
            if(this.noMore){
                return "没有更多了";
            }else if(this.isLoading){
                return "加载中...";
            }
        },
    },
    created() {
        this.examsQuery.classId = JSON.parse(window.sessionStorage.getItem("classInfo")).classId;
        if(JSON.parse(localStorage.getItem("userInfo")).roleId == 2){
            console.log(JSON.parse(localStorage.getItem("userInfo")).roleId);
            this.isTeacher = true;
        }
    },
}
</script>

<style scoped>
.el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #b3e8e6;
}
.search-area{
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
}
.search-input{
    width: 70%;
    max-width: 350px;
    min-width: 150px;
}
.search-button{
    margin: 20px;
}
.el-header-right{
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin: 10px 20px;
}
.infinite-list{
    height: calc(100vh - 60px);
    list-style: none;
    padding: 30px;
    box-sizing: border-box;
}
.infinite-list-item{
    margin-bottom: 30px;
}
.infinite-footer{
    text-align: center;
}
</style>