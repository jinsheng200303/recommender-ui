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
                <el-button type="primary" size="small" @click="addtest"><i class="el-icon-plus"></i>添加</el-button>
            </div>
        </el-header>
        <ul 
        class="infinite-list" 
        v-infinite-scroll="load"
        style="overflow:auto">
            <li v-for="exam in classExamsData" class="infinite-list-item">
                <examcard @deleteRefresh="deleteRefresh" :examInfo="exam"></examcard>
            </li>
            <p class="infinite-footer">{{ footerTip }}</p>
        </ul>
    </el-container>
</template>

<script>
import examcard from './examcard.vue'
import { getExamsPage } from "@/api/examApis.js";
export default {
    components:{
        examcard,
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
                pageSize: 1,
            }
        }
    },
    methods: {
        nameSearch(input){

        },
        addtest(){

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
    },
}
</script>

<style scoped>
.el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #cedff3;
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
    height: calc(84vh - 60px);
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