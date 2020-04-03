<template>
  <div class="roles_continer">
    <el-card>
      <div class="add_role">
        <el-button type="primary">添加角色</el-button>
      </div>
      <div class="roles_table_list">
        <el-table :data="roles" >

          <!-- 权限下拉展示 -->
          <el-table-column type="expand">
            <template v-slot:default="{row}">
              <el-row
                v-for="(item1,index1) of row.children"
                :key="item1.id"
                class="expand_continer"
              >
                <el-col
                  :span="4"
                  class="expand_continer_style"
                >
                  <el-tag
                    closable
                    @close="deleteRole(row,item1.id)"
                  >{{item1.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-row
                    v-for="item2 of item1.children"
                    :key="item2.id"
                  >
                    <el-col
                      :span="12"
                      class="expand_continer_style"
                    >
                      <el-tag
                        type="warning"
                        closable
                        @close="deleteRole(row,item2.id)"
                      >{{item2.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col
                      :span="12"
                      class="expand_continer_style"
                    >
                      <el-tag
                        type="success"
                        v-for="item3 of item2.children"
                        :key="item3.id"
                        closable
                        @close="deleteRole(row,item3.id)"
                      >{{item3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <!-- 权限下拉展示 end -->

          <el-table-column
            type="index"
            label="#"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称"
          ></el-table-column>
          <el-table-column
            prop="roleDesc"
            label="角色描述"
          ></el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="{row}">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              >删除</el-button>
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-unlock"
              >分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { PowerModel } from "@/models/PowerModel";
import { MessageBox } from "element-ui";
export default {
  name: "Roles",
  data() {
    return {
      roles: []
    };
  },
  async created() {
    const roles = await PowerModel.getRoles();
    this.roles = roles;
  },
  methods: {
    // 删除权限  
    async deleteRole(row,rightId) {
      const confirm = await MessageBox({
        type: "warning",
        message: "您正在删除当前角色的权限",
        title: "删除提示",
        showCancelButton: true
      }).catch(err=> null)

      //    发起删除请求,替换新权限  
      if(confirm) {  
          const roles = await PowerModel.deleteRole(row,rightId)
          row.children = roles
        //   this.roles = roles
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.roles_continer {
  margin-top: 20px;
}
.expand_continer {
  border-bottom: 1px solid #efefef;
  &:last-child {
    border: none;
  }
}
.el-row {
  margin: 10px;
  display: flex;
  align-items: center;
}
.expand_continer_style {
  text-align: center;
}
.el-tag {
  margin: 5px;
}
</style>