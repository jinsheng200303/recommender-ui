<template>
  <div class="recommend-text-card" @click="selectedCard">
    <div class="text-card-title">
      {{ formatResourceName }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["recommendData"],
  data() {
    return{
      textCardData: this.recommendData,
      maxTitleLength: 20,
    }
  },
  methods: {
    selectedCard(){
      this.$message.success("aaa")
    }
  },
  computed: {
    formatResourceName(){
      if (this.textCardData.resourceName.length > this.maxTitleLength) {
        return this.textCardData.resourceName.slice(0,this.maxTitleLength) + '...';
      }else {
        return this.textCardData.resourceName;
      }
    },
  }
}
</script>

<style scoped>
.recommend-text-card{
  width: 270px;
  height: 168px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
  overflow: hidden;
  box-sizing: border-box;
  padding: 15px;
  transition: 0.6s;
}
.recommend-text-card:hover{
  box-shadow: -1px 3px 15px 3px rgba(0, 0, 0, .3);
}
.text-card-title{

}
</style>