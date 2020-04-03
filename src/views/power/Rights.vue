<template>
  <div class="rights_continer">
    <el-card>
      <el-table :data="rights">
        <el-table-column
          type="index"
          label="#"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="authName"
          label="权限"
        ></el-table-column>
        <el-table-column
          prop="path"
          label="路径"
        ></el-table-column>
        <el-table-column
          label="等级"
        >
            <template v-slot:default="{row}">
                <el-tag v-if="row.level == 0">一级</el-tag>
                <el-tag type="success" v-if="row.level == 1">二级</el-tag>
                <el-tag type="warning" v-if="row.level == 2">三级</el-tag>
            </template>
        
        
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { PowerModel } from "@/models/PowerModel";
export default {
  name: "Rights",
  data() {
    return {
      rights: []
    };
  },
  async created() {
    const rights = await PowerModel.getRights();
    this.rights = rights;
  }
};
</script>

<style lang="scss" scoped>
.rights_continer {
  margin-top: 20px;
}
</style>