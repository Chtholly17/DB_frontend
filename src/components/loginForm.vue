<template>
  <div>
    <el-form ref="baseForm" :model="loginData.loginForm" :rules="loginRules">
      <el-form-item prop="userNumber">
        <el-input v-model="loginData.loginForm.userNumber"
                  placeholder="User name" class="preface_input"
                  prefix-icon="User"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginData.loginForm.password"
                  placeholder="Password" class="preface_input"
                  prefix-icon="Lock"
                  show-password></el-input>
      </el-form-item>
    </el-form>
    <el-button class=AccountDialogButton
               @click="commitLogin" round>Login</el-button>
  </div>
  <el-row>
    <el-col :span="9">
      <el-button class="AccountChangeDialogButton"
                 @click="showRegisterDialog"
                 link>Register</el-button>
    </el-col>
    <el-col :span="4">
    </el-col>
    <el-col :span="10">
      <el-button class="AccountChangeDialogButton"
                 @click="showRetrieveDialog"
                 link>Forgot Password</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {User, Lock} from "@element-plus/icons-vue";
import {defineComponent} from "vue";
import {baseForm, loginData, loginRules, commitLogin} from "../utils/Texts/loginText";
import {showRegisterDialog, showRetrieveDialog, LoginDialogVisible} from "../utils/DialogVisible";

export default defineComponent({
  name: "LoginForm",
  setup(){
    return {
      User,
      Lock,
      // loginForm,
      loginData,
      loginRules,
      baseForm,
      commitLogin,
      LoginDialogVisible,
      showRegisterDialog,
      showRetrieveDialog
    }
  }
})
</script>

<style src="@/assets/CSS/preface.scss" lang="scss" scoped>
//用这种方式引入不会报错，也不会污染全局样式
</style>
