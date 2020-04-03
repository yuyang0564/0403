<template>
  <div class="dialog_continer">

    <el-dialog
      :title="propTitle"
      :visible="propVisible"
      :width="`${propWidth}%`"
      @close="dialogClose"
    >
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-form
          :model="user"
          :rules="addUserRule"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="user.username"
              :disabled="!propIsAdd"
            ></el-input>
          </el-form-item>

          <!-- 添加用户时，显示密码 -->
          <template v-if="propIsAdd">
            <el-form-item
              label="密码"
              prop="password"
            >
              <el-input
                v-model="user.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              label="重复密码"
              prop="password2"
            >
              <el-input
                v-model="user.password2"
                show-password
              ></el-input>
            </el-form-item>
          </template>
          <!-- 添加用户时，显示密码 -->

          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="user.email"
              type="email"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机"
            prop="mobile"
          >
            <el-input
              v-model="user.mobile"
              type="tel"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { UsersModel } from "@/models/UsersModel";
export default {
  name: "VDialog",
  data() {
    return {
      user: {
        username: "",
        password: "",
        password2: "",
        email: "",
        mobile: ""
      },
      addUserRule: {
        username: [
          { required: true, trigger: "blue" },
          { validator: UsersModel.validatorUsername, trigger: "blur" }
        ],
        password: [
          { required: true, trigger: "blue" },
          { validator: UsersModel.validatorPassword, trigger: "blur" }
        ],
        password2: [
          { required: true, trigger: "blue" },
          { validator: UsersModel.validatorPassword2, trigger: "blur" }
        ],
        email: [
          { required: true, trigger: "blue" },
          { validator: UsersModel.validatorEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, trigger: "blue" },
          { validator: UsersModel.validatorMobile, trigger: "blur" }
        ]
      }
    };
  },
  props: {
    propUser: null,
    propTitle: String,
    propVisible: Boolean,
    propWidth: Number,
    propIsAdd: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    dialogClose() {
      this.$emit("update:propVisible", false);
    }
  },
  watch: {
    propUser(newValue) {
      this.user.username = newValue.username;
      this.user.email = newValue.email;
      this.user.mobile = newValue.mobile;
    }
  }
};
</script>

<style>
</style>