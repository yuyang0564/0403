<template>
  <div class="login">
    <div class="input_continer">
      <!-- 注册框头像 -->
      <div class="avatar">
        <img
          src="@/assets/logo.png"
          alt=""
        >
      </div>
      <!-- 注册框 -->
      <div class="input">
        <el-form
          class="demo-form-inline"
          :model="loginFormRule"
          :rules="rules"
          ref="loginFromRef"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginFormRule.username"
              prefix-icon="el-icon-user-solid"
              placeholder="审批人"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFormRule.password"
              prefix-icon="el-icon-unlock"
              placeholder="审批人"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 注册框 end -->
      <div class="button_area">
        <el-button
          type="primary"
          @keyup.enter.native="login"
          @click="login"
        >主要按钮</el-button>
        <el-button
          type="primary"
          @click="resetForm"
        >重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginModel } from "@/models/LoginModel";
import { mapActions } from "vuex"
import { Message } from "element-ui"
export default {
  data() {
    return {
      input: "",
      loginFormRule: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: LoginModel.validataUserName, trigger: "blur" }],
        password: [{ validator: LoginModel.validataPassword, trigger: "blur" }]
      }
    };
  },
  created() {
      document.onkeyup = (e) => {
          if(e.keyCode == 13) {
              this.login()
          }
      }
  },
  methods: {
    ...mapActions(["setUser"]),
    resetForm() {
      this.$refs.loginFromRef.resetFields();
    },
    login() {
      this.$refs.loginFromRef.validate( async valid => {
        if (valid) {
         let user =  await LoginModel.loginRequest(this.loginFormRule);
         this.$store.dispatch("setUser",user)
         Message.success("登陆成功")
         this.$router.replace({name: "Home"})
        } 
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  background-color: #2b4b6b;
  height: 100%;
}
.input_continer {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 20px;
  box-sizing: border-box;
}
.avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  position: absolute;
  z-index: 9;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 11px solid #ddd;
    border-radius: 50%;
  }
}
.input {
  margin-top: 100px;
}
.button_area {
  display: flex;
  justify-content: flex-end;
}
</style>