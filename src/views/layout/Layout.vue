<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <sidebar class="sidebar-container"></sidebar>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
      <router-view name="layoutBottom"></router-view>
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.hideSidebar {
            .main-container {
                margin-left: 65px;
            }
        }
        .sidebar-wrapper {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 2000;
            overflow-y: auto;
          background-color: #fff;
          overflow-x: hidden;
          &::-webkit-scrollbar {
              display: none;/*隐藏滚轮*/
            }
          box-shadow: 1px 2px 10px rgba(0,0,0,.2);
        }
        .main-container {
          min-height: 100%;
          transition: all .28s ease-out;
          margin-left: 260px;
        }
    }
    .main-container .main-container{
      margin: 0;
    }

</style>
