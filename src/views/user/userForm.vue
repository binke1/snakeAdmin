<template>

  <div class="user-container">
    <h3>添加新用户</h3>

    <div style="margin-top: 18px;">
      <el-card class="box-card">
        <el-form ref="userForm" :model="userForm" label-width="180">

          <el-form-item label="用户名" class="put-input">
            <el-input v-model="userForm.userName" @change="userAstrict"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="newPassword" class="put-input">
            <el-input name="newPassword" type="password" @keyup.enter.native="handlePassword"
                      v-model="userForm.newPassword"
                      autoComplete="on"
                      placeholder="Password">
            </el-input>
          </el-form-item>

          <el-form-item label="姓氏" class="put-input">
            <el-input v-model="userForm.firstName"></el-input>
          </el-form-item>

          <el-form-item label="名字" class="put-input">
            <el-input v-model="userForm.lastName"></el-input>
          </el-form-item>

          <el-form-item label="电话" class="put-input">
            <el-input v-model="userForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="电话2" class="put-input">
            <el-input v-model="userForm.mobile"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" class="put-input">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>

          <!--<div v-if="userForm.uuid != null">-->
            <!--<el-form-item :label="$t('userForm.Action')">-->
              <!--<el-radio-group v-model="userForm.status">-->
                <!--<el-radio :label="1">{{$t('clientList.Enable')}}</el-radio>-->
                <!--<el-radio :label="0">{{$t('clientList.Restricted')}}</el-radio>-->
              <!--</el-radio-group>-->
            <!--</el-form-item>-->
          <!--</div>-->

          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <!--<el-form label-width="180">-->
        <!--<div v-if="userForm.uuid != null">-->
          <!--<el-card class="box-card">-->
            <!--<h3>{{$t('userForm.EditPermission')}}</h3>-->
            <!--<el-form-item>-->
              <!--<el-select v-model="userRoleList" multiple placeholder="Select Role" style="width: 200px;">-->
                <!--<el-option-->
                  <!--v-for="role in roleOptions"-->
                  <!--:key="role.value"-->
                  <!--:label="role.label"-->
                  <!--:value="role.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->

            <!--<el-button type="primary" @click="saveUserRole">{{$t('constCode.save')}}</el-button>-->
          <!--</el-card>-->
        <!--</div>-->
      <!--</el-form>-->

      <!--<el-form label-width="180">-->
        <!--<div v-if="userForm.uuid != null">-->
          <!--<el-card class="box-card">-->
            <!--<h3>{{$t('userForm.AssignCompany')}}</h3>-->
            <!--<el-form-item>-->
              <!--&lt;!&ndash;multiple&ndash;&gt;-->
              <!--<el-select filterable v-model="userCompanyList" placeholder="Select company" style="width: 400px;" @change="hasCompany">-->
                <!--<el-option-->
                  <!--v-for="company in companyOptions"-->
                  <!--:key="company.value"-->
                  <!--:label="company.label"-->
                  <!--:value="company.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->

            <!--<el-button type="primary" @click="saveUserCompany">{{$t('constCode.save')}}</el-button>-->
            <!--<el-button type="primary" v-show="userCompanyList!='' && isSend == 1" @click="sendRegisteredInfo">发送注册信息</el-button>-->
          <!--</el-card>-->
        <!--</div>-->
      <!--</el-form>-->
    </div>

  </div>

</template>

<script>
  import {Message} from "element-ui";
  import {
    getUserByUuid,
    createUser,
    editUser,
    updateUserRoleList,
    updateCompanyList,
    sendCompanyAccountAndPasswordMailByUserUuid
  } from '@/api/user'
  import {getRoleById, getEnableRoleList} from '@/api/role'
  // import {getAllCompaniesList} from '@/api/company'
  import bus from '@/utils/eventBus'

  export default {
    data() {
      return {
        userForm: {
          id:null,
          uuid: null,
          userName: '',
          firstName: '',
          lastName: '',
          phone:'',
          mobile:'',
          email: '',
          status: 1,
          roleIdList:[]
        },
        roleOptions:[],
        companyOptions:[],
        userRoleList:[],
        userCompanyList:1,
        isSend:0// 是否发送信息
      }
    },
    mounted() {
      var uuid = this.$route.params.uuid
      this.userForm.uuid = uuid
      this.userForm.userName = this.$route.params.userName
      this.userForm.firstName = this.$route.params.firstName
      this.userForm.lastName = this.$route.params.lastName
      this.userForm.phone = this.$route.params.phone
      this.userForm.mobile = this.$route.params.mobile
      this.userForm.email = this.$route.params.email
      this.userForm.status = this.$route.params.status
      this.getRoleList()
      // this.getAllCompaniesList()
      this.getUserByUuid(uuid)
    },
    methods: {
      onSubmit() {
        if (this.userForm.uuid == null || this.userForm.uuid == 'undefined') {
          createUser(this.userForm).then(response => {
            if (response.data.result.uuid != 'undefined') {
              this.$message({
                showClose: true,
                message: 'User updated successfully!',
                type: 'success'
              })
            } else {
              let error = response.data.result
              Message({
                message: 'Failed to update user: ' + error.message,
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
        } else {
          editUser(this.userForm).then(response => {
            if (response.data.result.uuid != 'undefined') {
              this.$message('User updated successfully!')
            } else {
              let error = response.data.result
              Message({
                message: 'Failed to update user: ' + error.message,
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
        }

      },
      userAstrict(value){
        var reg = /[\u4E00-\u9FA5]/i
        if (reg.test(value)) {
          this.$message({
            message: "禁止使用中文作为用户名，请输入英文或者数字",
            type: "error"
          })
          this.userForm.userName = ""
        } else {
          this.userForm.userName = value
        }
      },
      saveUserRole(){
        this.userForm.roleIdList = this.userRoleList
        this.updateUserRoleList(this.userForm)
      },
      saveUserCompany(){
        let companyArrList = []
        companyArrList.push(this.userCompanyList)
        let companyList = []
        companyArrList.forEach(companyId =>{
          let obj = {}
          obj.id = companyId
          companyList.push(obj)
        })
        this.userForm.companyList = companyList

        this.updateUserCompanyList(this.userForm)
      },
      handlePassword() {
        this.$refs.userForm.validate(valid => {
          if (valid) {

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getUserByUuid(uuid){
        let _this = this
        getUserByUuid(uuid).then(response =>{
          if(response.data.result){
            _this.userForm.id = response.data.result.id
            if(response.data.result.roleIdList != null && response.data.result.roleIdList != 'undefined'){
              response.data.result.roleIdList.forEach(roleId =>{
                let obj = {}
                _this.userRoleList.push(roleId)
              })
            }
            console.log(response)
            if(response.data.result.companyList != null && response.data.result.companyList != 'undefined'){
              _this.isSend = 1
              response.data.result.companyList.forEach(company =>{
                // let obj = {}
                _this.userCompanyList = company.id
              })
              console.log(_this.userCompanyList)
            }
          }

        })
      },
      getRoleList(){
        let _this = this
        getEnableRoleList().then(response =>{
          response.data.result.forEach(role =>{
            let obj = {}
            obj.label = role.name
            obj.value = role.id
            _this.roleOptions.push(obj)
          })
        })
      },
      // getAllCompaniesList(){
      //   let _this = this
      //   getAllCompaniesList().then(response =>{
      //     response.data.result.forEach(company =>{
      //       let obj = {}
      //       obj.label = company.name
      //       obj.value = company.id
      //       _this.companyOptions.push(obj)
      //     })
      //   })
      // },
      updateUserRoleList(user){
        let _this = this
        updateUserRoleList(user).then(response =>{
          if (response.data.result.uuid != 'undefined') {
            this.$message('User Role updated successfully!')
          } else {
            let error = response.data.result
            Message({
              message: 'Failed to update user role: ' + error.message,
              type: 'error',
              duration: 5 * 1000
            })
          }
        })
      },
      updateUserCompanyList(user){
        let _this = this
        updateCompanyList(user).then(response =>{
          console.log(response)
          if (response.data.result.uuid != 'undefined') {
            this.$message('User Company updated successfully!')
            this.isSend = 1
            console.log(this.isSend)
          } else {
            let error = response.data.result
            Message({
              message: 'Failed to update user company: ' + error.message,
              type: 'error',
              duration: 5 * 1000
            })
          }
        })
      },
      hasCompany(){
        // console.log(this.)
        this.isSend = 0
      },
      sendRegisteredInfo(){
        console.log(this.userForm.uuid)
        this.sendCompanyAccountAndPasswordMailByUserUuid(this.userForm.uuid)
      },
      sendCompanyAccountAndPasswordMailByUserUuid(userUuid){
        sendCompanyAccountAndPasswordMailByUserUuid(userUuid).then(response => {
          console.log(response)
          this.$message({
            message:'发送成功！',
            type:'success'
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
  }

  .put-input {
    max-width: 318px;
    width: auto;
  }
</style>
