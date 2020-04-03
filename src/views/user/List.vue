<template>
  <div class="user_list">
    <el-card>
        <!-- 顶部：搜索与添加用户 -->
      <div class="search_user">
        <div class="search">
          <el-input
            v-model="search"
            placeholder=""
            prefix-icon="el-icon-search"
          />
          <el-button type="primary">搜索</el-button>
        </div>
        <div class="add_user">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </div>
      </div>
      <!-- 顶部：搜索与添加用户 end -->

      <!-- 用户列表 -->
      <div class="table_list">
        <el-table
          :data="users"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="#"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
   
          >
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色"
          
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话"
         
          >
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
        
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
          
          >
          </el-table-column>
          <el-table-column
            label="状态"
          
          >
            <template v-slot:default="{row}">
              <el-switch
                v-model="row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeUserState(row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="操作"
          >
            <template v-slot:default="{row}">
              <div class="btns">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  @click="updateUser(row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 用户列表 end -->
    </el-card>

    <v-dialog
        :prop-title="title"
        :prop-visible.sync="dialogVisible"
        :prop-width="40"
        :prop-is-add="isAdd"
        :prop-user="user"
    ></v-dialog>
   
  </div>
</template>

<script>
import VDialog from "@/components/VDialog"
import { UsersModel } from "@/models/UsersModel";
export default {
  data() {
    return {
      isAdd: true,
      title: "",  
      dialogVisible: false,  
      search: "",
      users: [],
      user: null,
      queryParams: {
        pagenum: 1,
        pagesize: 20
      }
    };
  },
  async created() {
    const users = await UsersModel.getUsers({ params: this.queryParams });
    if(users) this.users = users;
  },
  methods: {
    // 改变用户的状态
    changeUserState(e) {
      UsersModel.setUserState(e);
    },
    // 触发添加用户按钮
    addUser() {
        this.dialogVisible = true
        this.title = "添加用户"
        this.isAdd = true
    },
    // 触发更新用户的按钮
    updateUser(user) {
        this.dialogVisible = true
        this.title = "更新用户"
        this.isAdd = false
        this.user = user
    }

  },
  components: {
      VDialog
  }
};
</script>

<style scoped lang="scss">
.user_list {
  margin-top: 20px;
  .search_user {
    display: flex;
    justify-content: space-between;
    .search {
      width: 400px;
      display: flex;
    }
    .el-button {
      margin-left: 20px;
    }
  }
  .table_list {
    margin-top: 20px;
  }
}
</style>