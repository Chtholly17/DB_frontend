import { defineStore } from "pinia";

import { loginApi, logoutApi } from "@/api/auth";
import { getUserInfo } from "@/api/user";
import router, { resetRouter } from "@/router";
import { store } from "@/store";

import { LoginData } from "@/api/auth/types";
import { UserInfo } from "@/api/user/types";

import { useStorage } from "@vueuse/core";
import axios from "axios";
import path from "@/api/path";
import {useGlobal} from "@/store/residentStore";

export const useUserStore = defineStore("user", () => {
  // state
  const userId = ref();
  const id = ref("");
  const gender = ref("");
  const age = ref(0);
  const residence = ref(0);
  const name = ref("");
  const number = ref("");
  const token = useStorage("accessToken", "");
  const nickname = ref("");
  const avatar = ref("");
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限

  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: FormData) {
    return new Promise<void>((resolve, reject) => {
		axios.post(path.baseUrl + path.login, loginData).then(res => {
			console.log(res)
			// const query: LocationQuery = route.query;
			if(res.data.code == 1) {
				// const redirect = (query.redirect as LocationQueryValue) ?? "/";
				console.log(router.currentRoute);
				let data = new FormData();
				data.append("number", loginData.get("number") as string);
				number.value = loginData.get("number") as string;
				axios.post(path.baseUrl + path.getResidentByNumber, data).then((res) => {
					console.log(res.data.data)
					id.value = res.data.data.id;
					name.value = res.data.data.name;
					gender.value = res.data.data.gender;
					age.value = res.data.data.age;
					residence.value = res.data.data.residence;
					console.log(res)
					resolve();
				}).catch(err => {
					console.log(err)
					reject(err);
				})
			} else {
				ElMessage.error(res.data.msg);
			}
		}).catch(err => {
			console.log(err)
			reject(err);
		})
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          if (!data.roles || data.roles.length <= 0) {
            reject("getUserInfo: roles must be a non-null array!");
          }
          userId.value = data.userId;
          nickname.value = data.nickname;
          avatar.value = data.avatar;
          roles.value = data.roles;
          perms.value = data.perms;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      // return to login page
		router.replace("/login");
    });
  }

  // 重置
  function resetToken() {
    token.value = "";
    nickname.value = "";
    avatar.value = "";
    roles.value = [];
    perms.value = [];
  }
  return {
  	name,
  	id,
  	gender,
  	age,
  	residence,
  	number,
    token,
    nickname,
    avatar,
    roles,
    perms,
    login,
    getInfo,
    logout,
    resetToken,
    /**
     * 当前登录用户ID
     */
    userId,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
