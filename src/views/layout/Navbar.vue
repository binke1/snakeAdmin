<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <div class="i18moneyStyle">
      <!--<moneyExchange></moneyExchange>-->
    </div>
    <!--<i18-language class="i18LanguageStyle"></i18-language>-->
    <message-prompt class="messagePromptStyle"></message-prompt>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="/static/images/travel.png">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span @click="logout" style="display:block;">signOut</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import moneyExchange from './moneyExchange'
import Levelbar from './Levelbar'
import i18Language from './i18Language'
import messagePrompt from './messagePrompt'
import Hamburger from '@/components/Hamburger'
import bus from "@/utils/eventBus"


export default {
  components: {
    Levelbar,
    Hamburger,
    i18Language,
    messagePrompt,
    moneyExchange
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      bus.$emit('changeWidthC',1)
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 18px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 60px;
          top: 0;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
  .navbar .i18LanguageStyle{
    display: inline-block;
    position: absolute;
    right: 130px;
    top: 16px;
    cursor: pointer;
  }
    .navbar .i18moneyStyle{
    display: inline-block;
    position: absolute;
    right: 230px;
    top: 16px;
    cursor: pointer;
  }
  .navbar .messagePromptStyle{
    display: inline-block;
    position: absolute;
    right: 230px;
    cursor: pointer;
  }
</style>

