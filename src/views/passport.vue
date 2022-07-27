<template>
  <div
    class="passport"
    :class="type === 'register' ? 'passport register' : 'passport'"
  >
    <div class="passport-bg"></div>
      <div class="passport-content">
            <div
              class="passport-content-text register-content-text"
            >
              注册
            </div>
            <el-form
              class="passport-content-form"
              :model="register"
              label-width="120px"
              label-position="top"
              :rules="registerRule"
              ref="registerForm"
              hide-required-asterisk
            >
              <el-form-item label="用户名" prop="username" :error="usernameError">
                <el-input v-model="register.username" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  autocomplete="off"
                  v-model="register.password"
                  placeholder="请输入密码"
                />
              </el-form-item>
              <div class="passport-content-right-form-submmit">
                <el-button type="primary" @click="onRegister">注册</el-button>
              </div>
            </el-form>
        </div>
  </div>
</template>

<script>


import { reactive } from 'vue'
import { getVerifyCode, sendRegister, createUser } from '../util/request';
import _ from 'lodash';
import { ElMessage } from 'element-plus'

import {
  mapGetters,
  mapMutations,
  mapState
} from 'vuex';

export default {
  data() {
    return {
      form: {},
      type: "login",
      customAction: false,
      register: {},
      login: {},
      disableSendingCode: false,
      codeTimeout: 60,
      registerRule: {
        username: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur'],
        }, {
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              if (this.emails.includes(value)) {
                reject('已经有这个邮箱了');  // reject with error message
              } else {
                resolve();
              }
            });
          },
        }],
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      },
      emails: [],
      codeError: '',
      usernameError: '',
      loginUserError: '',
      loginPasswordError: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      // const {id, data} = await createUser(); // 这里进行登陆
      this.emails = ['123@11.com', '123@1221.com'];// 此处存放获取到的email
    },
    async createPassport() {
      this.register = {};
      this.login = {};
      this.type = "register";
      this.customAction = true;
    },
    async onRegister() {
      this.usernameError = '';
      this.codeError = '';

      await this.$refs.registerForm.validate();

      // const {id, data} = await sendRegister(this.register); // 这里进行登陆

      // if (id === 0) {
        ElMessage({
          message: '注册成功，为您自动登录',
          type: 'success',
        })

        this.$router.push('/home');
      // }
    },
  },
};
</script>

<style lang="scss">
.passport {
  --el-color-primary: #696969;
  --el-button-hover-bg-color: #595959;
  --el-button-active-bg-color: #fff;

  &-content {
    // display: flex;
    z-index: 3;
    // width: 880px;
    // min-width: 880px;
    height: 520px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #6f746f;
    transition: all 0.5s 0.2s linear;
    width: 880px;
    margin: 0 auto;
    padding: 8vh 3vw;

  }
}

</style>