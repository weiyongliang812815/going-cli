<template>
  <Row class="padding-t-15" style="margin-left: 20px;">
    <go-form-body ref="formObj">
      <i-col span="24">
        <go-form-group-label style="margin:1px 0 4px 40px;"
          >系统信息</go-form-group-label
        >

        <!-- 姓名-->
        <go-input
          v-model="domainData.realName"
          width="md"
          :item="domainObj.realName"
        ></go-input>
        <!--        登录名-->
        <go-input
          v-model="domainData.loginName"
          width="md"
          :item="domainObj.loginName"
        ></go-input>

        <!--用户密码-->
        <PwdPlugin :domainData="domainData" :domainObj="domainObj"></PwdPlugin>

        <!--默认语言-->
        <go-drop
          v-model="domainData.primaryLanguage"
          :search="false"
          width="md"
          :item="domainObj.primaryLanguage"
        ></go-drop>

        <!--账户状态-->
        <go-switch
          v-model="domainData.recordState"
          :item="domainObj.recordState"
        ></go-switch>

        <!--说明-->
        <go-textarea
          v-model="domainData.remark"
          width="md"
          :item="domainObj.remark"
        ></go-textarea>
      </i-col>
    </go-form-body>
  </Row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { $M } from "../../../../utils/comUtils";
import PwdPlugin from "../../extraUser/components/PwdPlugin";

export default {
  name: "AddExtraUserForm",
  data: function() {
    return {
      pwdInfo: "密码长度6-50个字符,区分英文大小写"
    };
  },
  props: {
    domainData: {
      type: Object,
      default: ()=>{}
    },
    domainObj: {
      type: Object,
      default: ()=>{}
    },
    changeUserTypeFlag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //校验数据
    validate() {
      return this.$refs.formObj.validate();
    },
    //选择职务级别
    selJobLevel({ rowId, rowRecord }) {
      this.domainData["jobLevelId"] = rowId;
      this.domainData["jobLevel"] = rowRecord["name"];
    },
    //选择主岗位
    selMainStation({ rowId, rowRecord }) {
      this.domainData["mainStationId"] = rowId;
      this.domainData["mainStationName"] = rowRecord["name"];
    },
    //选择外单位信息
    setOutUnitAcl({ selIds, selNames }) {
      this.domainData.depId = selIds;
      this.domainData.departName = selNames;
    },
    //选择工作范围
    selWorkSpaceAcl({ selIds, selNames }) {
      this.domainData.workSpaceId = selIds;
      this.domainData.workSpace = selNames;
    },
    //选择个人主角色
    selMainRoleAcl({ selIds, selNames }) {
      this.domainData.roleIds = selIds;
      this.domainData.roleNames = selNames;
    }
  },
  mounted() {},
  components: {
    PwdPlugin
  }
};
</script>
