<template>
    <el-card  :body-style="{ padding: '0px' }" @click.native="newPage(records)">
        <img src="https://www.mattbenton.io/img/logos/vue-9-logo-png-transparent-min.png" class="image">
        <div class="class-card-info" >
            <el-descriptions :title="records.className" :column="1" size="medium">
                <el-descriptions-item label="课程id">{{ records.classId }}</el-descriptions-item>
                <!-- <el-descriptions-item label="备注">
                    <el-tag size="small">Java</el-tag>
                </el-descriptions-item> -->
            </el-descriptions>
        </div>
        <el-button type="danger" class="button" size="mini" v-if="isShow" @click="deleteById(records.classId)">删 除</el-button>
    </el-card>
</template>

<script>
import {deleteClass} from '@/api/classes.js'
export default {
    props: ["records"],
    data() {
        return {
            isShow: false,
        };
    },
    methods: {
        buttonVisible(){
            this.isShow = !this.isShow;
        },
        deleteById(id){

        },
        newPage(records){
            let routeData = this.$router.resolve({
                path: '/classinfo',
                query: {
                    classId: records.classId,
                    className: records.className,
                    createdTime: records.createdTime,
                }
            })
            window.open(routeData.href, '_blank');
        }
    },
}
</script>

<style scoped>
.image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
}

.el-card {
    margin: auto;
    width: 300px;
}

.el-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 5px 15px -2px rgba(0, 0, 0, .3);
}

.class-card-info {
    padding: 14px;
}

.button {
    float: right;
    margin-right: 14px;
    margin-bottom: 14px;
}</style>
