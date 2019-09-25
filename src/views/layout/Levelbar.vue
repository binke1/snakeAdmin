<template>
  <div>
    <el-breadcrumb class="app-levelbar" separator="/">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{showTitle(item)}}</span>
        <router-link v-else :to="item.redirect||item.path">{{showTitle(item)}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import setI18n from './setI18n'
export default {
  mixins:[setI18n],
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null,
      isShow: false
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    }
  },
  watch: {
    $route(newVal,oldVal) {
      if (newVal.query.active){
        this.isShow = true
      } else {
        this.isShow = false
      }
      this.getBreadcrumb()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-levelbar.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
