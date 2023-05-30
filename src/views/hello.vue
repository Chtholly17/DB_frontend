<script lang="ts">
import LoginForm from "../components/LoginForm.vue";
import {LoginDialogVisible, RegisterDialogVisible, RetrieveDialogVisible, showLoginDialog} from "../utils/DialogVisible";
export default {
  name: 'Hello',
  computed: {
    LoginDialogVisible() {
      return LoginDialogVisible
    }
  },
  components: {LoginForm},
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // perform login action
        }
      })
    },
    signup() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          // perform signup action
        }
      })
    }
  }
}
</script>


<style src="@/assets/CSS/preface.scss" lang="scss" scoped>
</style>

<template>
  <div class="PrefaceDiv">
    <div class="preface-box">
      <login-form v-if="LoginDialogVisible"> </login-form>
    </div>
  </div>
</template>