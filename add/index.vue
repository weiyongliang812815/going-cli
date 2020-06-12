<template>
  <go-layout pattern="1C">
    <go-layout-panel
      headerText="大屏帐号管理"
      cellId="a"
      :bgColor="SysDefConfig.panelBgColor"
    >
      <Row class="tool_bg">
        <Col span="16">
          <!--编外单位工具栏-->
          <go-tool-bar
            class="padding-l-6 padding-t-5 padding-b-5"
            :btns="btns"
            type="customer"
            :class="SysDefConfig.toolbarLeft"
            @clickToolBtn="clickToolBtn"
          ></go-tool-bar>
        </Col>
        <Col class="clearfix " span="8">
          <div class="pull-right margin-l-10 padding-t-5 padding-b-5">
            <!--单条件查询-->
            <go-search-box
              :searchFieldAry="gridConfig"
              @searchFun="searchFun"
            ></go-search-box>
            <!--多条件查询-->
            <go-search-more
              :searchFieldAry="gridConfig"
              @searchFun="searchFun"
              class="margin-r-10 margin-l-10"
            ></go-search-more>
          </div>
        </Col>
      </Row>
      <!--单表列表-->
      <go-single-grid
        :hasToolBar="true"
        :hasPagin="true"
        :padding="SysDefConfig.gridPadding"
        ref="gridObj"
        :config="gridConfig"
      ></go-single-grid>
    </go-layout-panel>

    <!--编外单位添加实体-->
    <go-add-mod-win
      width="500"
      :title="winTitle"
      height="550"
      @close="closeWin"
      @addRecordToDb="addRecordToDb"
      :modLoadData="false"
      @modRecordToDb="modRecordToDb"
      loadRecordAction="ExtraUnitStore.loadRecord"
      :recordId="curSelRecord"
      :optionType="optionType"
      v-model="showWinFlag"
    >
      <add-form
        :domainData="domainData"
        :domainObj="domainObj"
        ref="formObj"
      ></add-form>
    </go-add-mod-win>
  </go-layout>
</template>

<script>
import { GoingUtils } from "goingutils";
import AddForm from "./components/AddForm";
import CrudBySvMixins from "@/components/vueCom/ctlMixins/CrudBySvMixins.js";
import { gridDomain, formDomain } from "./domain";
import serverApi from "./server";

export default {
  name: "index",
  mixins: [CrudBySvMixins],
  data: function() {
    return {
      pageTitle: "编外单位",
      formUrl: "addOutUnit",
      storeName: "ExtraUnitStore",
      domainData: GoingUtils.getJsonDomain(formDomain),
      domainObj: GoingUtils.getDomainObj(formDomain),
      gridConfig: {
        queryUrl: serverApi.queryGridUrl,
        colOrderNum: true,
        colSelBox: true,
        fieldAry: gridDomain
      }
    };
  },
  computed: {},
  methods: {
    //查询函数
    searchFun({ datas }) {
      this.$refs.gridObj.reloadData(datas);
    },
    beforeMod(recordId) {
      serverApi.loadRecord({
        params: { recordId },
        successFun: data => {
          this.domainData = $.extend(this.domainData, data);
        }
      });
      return true;
    },
    //删除记录
    delRecord({ ids }) {
      serverApi.delRecord(ids, () => {
        this.$refs["gridObj"].reloadData();
      });
    },
    //修改保存数据到数据库
    modRecordToDb({ winId, closeWinFun, btnType }) {
      //校验数据
      let flag = this.$refs["formObj"].validate();
      //校验数据成功
      if (flag) {
        //保存数据
        serverApi.modRecord({
          params: this.domainData,
          successFun: () => {
            //清空相应的值
            this.domainData = GoingUtils.getJsonDomain(formDomain);
            //重新加载数据
            this.$refs["gridObj"].reloadData();
            if (btnType === "confirm") {
              closeWinFun();
            }
          }
        });
      };
    },
    //保存数据到数据库
    addRecordToDb({ winId, closeWinFun, btnType }) {
      //校验数据
      let flag = this.$refs["formObj"].validate();
      //校验数据成功
      if (flag) {
        //保存数据
        serverApi.saveRecord({
          params: this.domainData,
          successFun: () => {
            //清空相应的值
            this.domainData = GoingUtils.getJsonDomain(formDomain);
            //重新加载数据
            this.$refs["gridObj"].reloadData();
            if (btnType === "confirm") {
              closeWinFun();
            }
          }
        });
      }
    },
    clickToolBtn(btnId) {
      if (this[btnId] != null) {
        this[btnId]();
      }
    }
  },
  mounted() {},
  components: {
    AddForm,
  }
};
</script>
