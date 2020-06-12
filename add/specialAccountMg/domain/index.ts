import PlatformServiceApis from "@/service/platformServiceApis";

//外单位人员信息
let gridDomain = [
    { id: "realName", maxLength: 20, label: "姓名", width: "*" },
    { id: "loginName", maxLength: 20, label: "登录名", width: "*" },
    { id: "remark", maxLength: 20, label: "说明", width: "*" },
    { id: "orderNum", maxLength: 20, label: "排序号" },
    { id: "recordState", maxLength: 20, label: "状态" }
];

let formDomain = [
    { id: "realName", required: true, maxLength: 20, label: "姓名", width: "*" },
    { id: "loginName", required: true, maxLength: 20, label: "登录名", width: "*" },

    {
        id: "loginPwd",
        required: true,
        maxLength: 20,
        label: "登录密码",
        width: "*",
        defVal: "111111"
    },
    {
        id: "pwdConfirm",
        required: true,
        maxLength: 20,
        label: "密码确认",
        width: "*",
        defVal: "111111"
    },
    {
        id: "primaryLanguage",
        editorType: "staticDrop",
        label: "默认语言",
        defVal: "中文简体",
        items: [
            { id: "ch", label: "中文简体" },
            { id: "english", label: "英文" },
            { id: "chines", label: "中文繁体" }
        ]
    },
    {
        id: "recordState",
        editorType: "switch",
        items: [
            { label: "启用", value: "use", active: true, state: "open" },
            { label: "停用", value: "stop", state: "close" }
        ],
        label: "账户状态"
    },
    {
        id: "roleNames",
        maxlength: "20",
        label: "个人角色",
        required: true,
        defVal:'编外人员',
        disabled:true,
        validation: false,
        config: {
            //标题
            title: "选择角色信息",
            //显示的tab页
            tabs: [
                { id: "role", active: true, accountSel: false },
            ]
        },
        validMsg: "个人角色不能为空"
    },
    {id:"roleIds",hidden:true,label:"主角色id"},
    { id: "userCode", maxLength: 20, label: "人员编号" },
    { id: "orderNum", required: true, maxLength: 20,defVal:1, label: "排序号" },
    {
        id: "seqType",
        editorType: "radioBox",
        label: "重复序号处理",
        defVal: "insert",
        items: [
            { label: "插入", value: "insert" },
            { label: "重复", value: "repeat" }
        ]
    },
    {
        id: "sex",
        maxLength: 20,
        label: "性别",
        width: "*",
        items: [
            { id: "", label: "" },
            { id: "男", label: "男" },
            { id: "女", label: "女" }
        ]
    },
    { id: "birthDate", maxLength: 20, label: "出生日期", width: "*" },
    { id: "remark", maxLength: 20, label: "说明", width: "*" }
];

export { gridDomain, formDomain };
