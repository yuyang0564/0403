import {Http} from '../Http'
import {Ls} from "../utils/ls"
import dayjs from "dayjs"
class UsersModel  {
    static _pwd = ""
    /**
     * 获取用户列表（缓存/HTTP）
     */
    static async getUsers(params) {
        let userList = Ls.get("users")
        if(!userList) {
            let {users} = await Http.get("users",params).catch(err=>{throw new Error(err)})
            users.forEach(user => {
                user.create_time = dayjs.unix(user.create_time).format("YYYY-MM-DD")
            });
            userList = users
        }
        return userList
    }

    /**
     * 改变用户的状态
     * @param {Object} user 
     */
    static async setUserState(user) {
       return await Http.put(`users/${user.id}/state/${user.mg_state}`).catch(err=>{throw new Error(err)})
    }

    /**
     * 验证用户名
     * @param {*} rule 
     * @param {*} value 
     * @param {*} callback 
     */
    static validatorUsername(...args) {
       const [,value,callback] = args
       let reg = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/
       if(!value) return callback(new Error("用户名未填写")) 
       if(value.length < 3 || value.length > 20) return callback(new Error("不符合字符限制")) 
       if(!reg.test(value)) return callback(new Error("不能含有非法字符"))
       return callback() 
    }

    /**
     * 验证密码
     * @param {*} param0 
     */
    static validatorPassword(...args) {
        const [,value,callback] = args
       let reg = /\s+/
       if(!value) return callback(new Error("密码未填写")) 
       if(value.length < 3 || value.length > 20) return callback(new Error("不符合字符限制")) 
       if(reg.test(value)) return callback(new Error("不能含有空格"))
       UsersModel._pwd = value
       callback() 
    }

    /**
     * 2次验证密码
     * @param {s} param0 
     */
    static validatorPassword2(...args) {
        const [,value,callback] = args
        if(!value) return callback(new Error("需再次输入密码"))
        if(value !== UsersModel._pwd) return callback(new Error("2次输入密码不一致"))
        callback()
    }

    /**
     * 验证邮箱
     * @param {*} param0 
     */
    static validatorEmail(...args) {
        const [,value,callback] = args
        callback()
    }

    /**
     * 验证手机
     * @param {*} param0 
     */
    static validatorMobile(...args) {
        const [,value,callback] = args
        callback()
    }
}

export {UsersModel}