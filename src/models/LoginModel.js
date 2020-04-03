import {Http} from "../Http"
/**
 * Login 模块
 */
class LoginModel{
    /**
     * 登陆用户名验证
     * @param {*} rule 
     * @param {*} value 输入的值
     * @param {*} callback 
     */
    static validataUserName(rule,value,callback) {
       if(!value) return callback(new Error("用户名不能为空"))
       if(value.length < 4 || value.length > 20) return callback(new Error("字符不在有效的长度范围"))
       let reg = /^([a-zA-Z0-9]|[\u4E00-\u9FA5]){4,20}$/
       if(!reg.test(value)) return  callback(new Error("用户名不能含有特殊字符"))
       callback()
    }
    /**
     * 登陆密码验证
     * @param {*} rule 
     * @param {*} value 
     * @param {*} callback 
     */
    static validataPassword(rule,value,callback) {
        if(!value) return callback(new Error("密码未输入"))
        if(value.length < 4 || value.length > 20) return callback(new Error("密码不符合有效的长度范围"))
        let reg = /\s+/
        if(reg.test(value)) return callback(new Error("不能含有空格"))
        callback()
     }

    /**
     * 发送登陆请求 
     * @param {*} data 
     */ 
    static async loginRequest(data) {
        let {username,password} = data
        let userInfo = await Http.post('/login',{username,password}).catch(err=>{throw new Error(err)})
        if(userInfo) {
            window.sessionStorage.setItem("token",userInfo.token)
            return userInfo
        }
        
    } 
}


export {LoginModel}