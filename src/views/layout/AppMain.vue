<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
    <!--<div v-if="$store.getters.loading" v-loading="$store.getters.loading"  element-loading-text="加载中，请稍后~" element-loading-background="rgba(0, 0, 0, 0.6)" id="loading"></div>-->
    <div></div>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
    mounted(){
      var appMain = document.getElementsByClassName("app-main")[0]
      appMain.style.height= document.documentElement.clientHeight- 60 + 'px'
        window.addEventListener("resize", ()=>{
          var appMain = document.getElementsByClassName("app-main")[0]
          appMain.style.height= document.documentElement.clientHeight- 60 + 'px'
        })
    },

  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main{
    position: relative;
    overflow-y: auto;
    /*position: fixed;*/
    /*width: 86%;*/
    height: auto;
    /*top: 49px;*/
    /*left: 260px;*/
    #loading{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 1999;
      color: #18a77a !important;
    }
  }
</style>
