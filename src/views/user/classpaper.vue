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
                <el-button type="primary" size="small" @click="addPaper"><i class="el-icon-plus"></i>添加</el-button>
            </div>
        </el-header>
        <ul 
        class="infinite-list"
        v-infinite-scroll="load"
        style="overflow:auto">
            <li v-for="(item,index) in classPaperData" class="infinite-list-item">
                <papercard :item="item" :index="index" @deleteRefresh="deleteRefresh" @editPaper="editPaper"></papercard>
            </li>
            <p class="infinite-footer">{{ footerTip }}</p>
        </ul>
        <newpapercard ref="newpapercard" @newPaperCardRefresh="newPaperCardRefresh"></newpapercard>
    </el-container>
</template>

<script>
import { getPapersPage } from '@/api/paperApis.js'
import papercard from './papercard.vue'
import newpapercard from './newpapercard.vue'
export default {
    components:{
        papercard,
        newpapercard,
    },
    data() {
        return {
            input: '',
            isLoading: false,
            noMore: false,
            classPaperData: [],
            papersQuery: {
                classId: 0,
                examTitle: "",
                pageNum: 0,
                pageSize: 2,
            }
        }
    },
    methods: {
        nameSearch(input){

        },
        addPaper(){
            this.$refs.newpapercard.dialogVisible();
        },
        load(){
            if(!this.noMore){
                this.isLoading = true;
                this.getPaperData();
            }
        },
        deleteRefresh(index){
            this.$delete(this.classPaperData,index);
        },
        // cardRefresh(temInfo,index){
        //     this.classPaperData[index] = temInfo;
        // },
        editPaper(paperId){
            let classInfo = JSON.parse(sessionStorage.getItem("classInfo"));
            let routeData = this.$router.resolve({
                path: '/addpaper',
                query: {
                    paperId: paperId,
                    bankId: classInfo.categoryId,
                }
            })
            window.open(routeData.href, '_blank');
        },
        newPaperCardRefresh(newPaper){
            // this.classPaperData.push(newPaper);
            this.classPaperData.length = 0;
            this.papersQuery.pageNum = 0;
            this.noMore = false;
        },
        getPaperData(){
            this.papersQuery.pageNum++;
            getPapersPage(this.papersQuery)
            .then((res) => {
                if(res.code == 200){
                    this.classPaperData.push(...res.data.records);
                    if(res.data.records.length < this.papersQuery.pageSize){
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
        this.papersQuery.classId = JSON.parse(window.sessionStorage.getItem("classInfo")).classId;
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