<template>
    <el-main direction="vertical">
        <mainnav></mainnav>
        <el-main class="class-card-area">
            <classcard v-for="o in 9" :key="o"></classcard>
        </el-main>
    </el-main>
</template>

<script>
import classcard from './classcard.vue';
import mainnav from './mainnav.vue';
export default {
    components:{
        classcard,
        mainnav,
    }
}
</script>

<style scoped>
.class-card-area{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background: rgb(250, 250, 250);
    width: 100%;
    height: calc(100vh - 120px);
}
</style>