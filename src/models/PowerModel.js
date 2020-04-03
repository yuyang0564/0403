import {Http} from "../Http"
import {Ls} from "@/utils/ls"
class PowerModel {
    /**
     * 获取权限列表
     */
    static async getRights() {
       let rights =  Ls.get("rights")
       if(!rights) {
            rights = await Http.get("rights/list").catch(err=>{throw new Error(err)})
            Ls.set("rights",rights)
       }  
       return rights
    }

    /**
     * 获取角色列表
     */
    static async getRoles() {
        return await Http.get("roles").catch(err=>{throw new Error(err)})
    }

    /**
     * 删除权限 ， 返回更新后的权限 
     * @param {*} roleId    角色ID
     * @param {*} rightId   权限ID
     */
    static async deleteRole(row,rightId) {
        return await Http.delete(`roles/${row.id}/rights/${rightId}`).catch(err=>{throw new Error(err)})
    }
}

export {PowerModel}