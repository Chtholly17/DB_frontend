<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginData"
      :rules="loginRules"
      class="login-form"
    >
      <div class="flex text-white items-center py-4">
        <span class="text-2xl flex-1 text-center">{{ $t("login.title") }}</span>
        <lang-select class="text-white! cursor-pointer" />
      </div>

      <el-form-item prop="username">
        <div class="p-2 text-white">
          <svg-icon icon-class="user" />
        </div>
        <el-input
          ref="username"
          v-model="number"
          class="flex-1"
          size="large"
          :placeholder="$t('login.username')"
          name="username"
        />
      </el-form-item>

      <el-tooltip
        :disabled="isCapslock === false"
        content="Caps lock is On"
        placement="right"
      >
        <el-form-item prop="password">
          <span class="p-2 text-white">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="password"
            class="flex-1"
            :placeholder="$t('login.password')"
            :type="passwordVisible === false ? 'password' : 'input'"
            size="large"
            name="password"
            @keyup="checkCapslock"
            @keyup.enter="handleLogin"
          />
          <span class="mr-2" @click="passwordVisible = !passwordVisible">
            <svg-icon
              :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"
              class="text-white cursor-pointer"
            />
          </span>
        </el-form-item>
      </el-tooltip>


      <el-button
        size="default"
        :loading="loading"
        type="primary"
        class="w-full"
        @click.prevent="handleLogin"
        >{{ $t("login.login") }}
      </el-button>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import LangSelect from "@/components/LangSelect/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

// 状态管理依赖
import { useUserStore } from "@/store/modules/user";

// API依赖
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import { getCaptchaApi } from "@/api/auth";
import { LoginData } from "@/api/auth/types";
import axios from "axios";
import path from "@/api/path";
import {useGlobal} from "@/store/residentStore";
import { da } from "element-plus/es/locale";

const userStore = useUserStore();
/**
 * 按钮loading
 */
const loading = ref(false);
/**
 * 是否大写锁定
 */
const isCapslock = ref(false);
/**
 * 密码是否可见
 */
const passwordVisible = ref(false);
/**
 * 验证码图片Base64字符串
 */
// const captchaBase64 = ref();

/**
 * 登录表单引用
 */
const loginFormRef = ref(ElForm);

const loginData = ref<LoginData>({
	number: "18090416684",
  password: "1277411655",
});

const number = ref("18090416684");
const password = ref("1277411655");

const loginRules = {
  username: [{ required: true, trigger: "blur" }],
  password: [{ required: true, trigger: "blur", validator: passwordValidator }],
  // verifyCode: [{ required: true, trigger: "blur" }],
};

/**
 * 密码校验器
 */
function passwordValidator(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error("The password can not be less than 6 digits"));
  } else {
    callback();
  }
}

/**
 * 检查输入大小写状态
 */
function checkCapslock(e: any) {
  const { key } = e;
  isCapslock.value = key && key.length === 1 && key >= "A" && key <= "Z";
}



/**
 * 登录
 */
function handleLogin() {
		console.log(number.value)
		console.log(password.value)
		loading.value = true;
		let data = new FormData();
    data.append("number", number.value);
    data.append("password", password.value);
		userStore.login(data).then(() => {
			router.push({path: '/dashboard'});
		}).catch(() => {
		}).finally(() => {
			loading.value = false;
		});
	loading.value = false;
	  // axios.post(path.baseUrl + path.login, data).then(res => {
		// 		console.log(res)
		// 		// const query: LocationQuery = route.query;
		// 		if(res.data.code == 1) {
		// 		// const redirect = (query.redirect as LocationQueryValue) ?? "/";
		// 			console.log(router.currentRoute);
		// 			let data = new FormData();
		// 			data.append("number", number.value);
		//
		// 			axios.post(path.baseUrl + path.getResidentByNumber, data).then((res) => {
		// 				console.log(res.data.data)
		// 	  		router.push({path: '/dashboard'});
		// 				const {setId} = useGlobal()
		// 				setId(res.data.data.id)
		// 				console.log(res)
		// 			});
		// 	} else {
		// 		console.log(res.data.msg)
		// 		// output an error message
		// 	}
		// }).catch(err => {
		// 	console.log(err)
		// }).finally(() => {
		// 	loading.value = false;
		// })
}

onMounted(() => {
  // getCaptcha();
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;

  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .captcha {
      position: absolute;
      top: 0;
      right: 0;

      img {
        width: 120px;
        height: 48px;
        cursor: pointer;
      }
    }
  }
}

.el-form-item {
  background: rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 5px;
}

.el-input {
  background: transparent;

  // 子组件 scoped 无效，使用 :deep
  :deep(.el-input__wrapper) {
    padding: 0;
    background: transparent;
    box-shadow: none;

    .el-input__inner {
      color: #fff;
      background: transparent;
      border: 0;
      border-radius: 0;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: #fff !important;
      }

      // 设置输入框自动填充的延迟属性
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition: color 99999s ease-out, background-color 99999s ease-out;
        transition-delay: 99999s;
      }
    }
  }
}
</style>
