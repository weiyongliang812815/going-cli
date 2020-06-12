//平台api查询的前缀
let PlatformPrefix = SysConfigUtils.go_eplat_adress + "/api";
// @ts-ignore
import {Dataset,QueryCommand} from 'goingutils/index.js';
import projectName from "@/utils/projectName";
import SysConfigUtils from "@/utils/sysConfigUtils";

export default {
    queryGridUrl:PlatformPrefix + `${projectName.frame}/bigScreenUser/read_all`,
    //加载实体信息
    loadRecord({ params = {}, successFun}: any) {
        let { recordId } = params;
        let queryCommand = new QueryCommand({url:PlatformPrefix + `${projectName.frame}/bigScreenUser/read/${recordId}`});
        //执行查询操作
        queryCommand.executeQuery({params, successFun});
    },
    //保存信息
    saveRecord({ params = {}, successFun}: any) {
        params["status"]=1;
        params["type"]=0;
        params["depId"]="0";
        params["departName"]="0";
        params["changedPwd"]=false;
        let queryCommand = new QueryCommand({url:PlatformPrefix + `${projectName.frame}/bigScreenUser/create`});
        queryCommand.executeQuery({params, successFun});
    },
    //删除信息
    delRecord(ids:any,successFun:any) {
        let queryCommand = new QueryCommand({url:PlatformPrefix + `${projectName.frame}/bigScreenUser/delete`});
        //执行查询操作
        queryCommand.executeQuery({params:{ ids: ids },successFun});
    },
    //修改信息
    modRecord({ params = {}, successFun}: any) {
        let queryCommand = new QueryCommand({url:PlatformPrefix + `${projectName.frame}/bigScreenUser/update`});
        queryCommand.executeQuery({params, successFun});
    }
};
