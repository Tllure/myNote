"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      win3: true,
      default: true,
      image: "",
      list: [],
      note: []
    };
  },
  onLoad() {
    this.getData();
    this.getNote();
  },
  onShow() {
    this.getData();
    this.getNote();
  },
  methods: {
    toEdit(id) {
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit?id=" + id
      });
    },
    goto() {
      common_vendor.index.navigateTo({
        url: "/pages/new/new"
      });
    },
    longpressTo(id) {
      console.log(id);
    },
    getNote() {
      common_vendor.yn.callFunction({
        name: "getNote",
        success: (e) => {
          console.log(e.result);
          this.note = e.result.data;
        }
      });
    },
    getData() {
      common_vendor.yn.callFunction({
        name: "getUser",
        success: (e) => {
          console.log(e.result);
          this.list = e.result.data;
          this.image = e.result.data[0].image;
        }
      });
    },
    addImg() {
      common_vendor.yn.callFunction({
        name: "addImg",
        data: {
          image: this.image
        },
        success: (e) => {
          console.log(e.result);
        }
      });
    },
    updateImg() {
      common_vendor.yn.callFunction({
        name: "updateUser",
        data: {
          image: this.image
        },
        success: (e) => {
          console.log(e.result);
        }
      });
    },
    handleSuccess(res) {
      console.log(res.tempFilePaths);
      this.image = res.tempFilePaths[0];
      this.updateImg();
      this.$refs.popup.close();
    },
    dialogToggle(type) {
      this.msgType = type;
      this.$refs.alertDialog.open();
    },
    dialogToggle2(type) {
      this.msgType = type;
      this.$refs.alertDialog2.open();
    },
    dialogConfirm() {
      console.log("\u70B9\u51FB\u786E\u8BA4");
      this.$refs.popup.open("bottom");
    },
    dialogConfirm2() {
      console.log("\u70B9\u51FB\u786E\u8BA4");
      this.default = !this.default;
      this.$refs.popup.close();
    },
    dialogClose() {
      console.log("\u70B9\u51FB\u5173\u95ED");
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_file_picker2 + _easycom_uni_icons2 + _easycom_uni_search_bar2 + _easycom_uni_dateformat2 + _easycom_uni_fab2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_file_picker + _easycom_uni_icons + _easycom_uni_search_bar + _easycom_uni_dateformat + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.default
  }, $data.default ? {
    b: $data.image
  } : {}, {
    c: common_vendor.o($options.dialogConfirm),
    d: common_vendor.o($options.dialogClose),
    e: common_vendor.p({
      type: _ctx.msgType,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u5B9A",
      title: "\u901A\u77E5",
      content: "\u662F\u5426\u66F4\u6362\u80CC\u666F\u5C01\u9762"
    }),
    f: common_vendor.sr("alertDialog", "7325f334-0"),
    g: common_vendor.p({
      type: "dialog"
    }),
    h: common_vendor.o($options.handleSuccess),
    i: common_vendor.p({
      fileMediatype: "image",
      limit: "1"
    }),
    j: common_vendor.sr("popup", "7325f334-2"),
    k: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    l: common_vendor.t($data.note.length),
    m: common_vendor.o(($event) => $options.dialogToggle("info")),
    n: common_vendor.o(($event) => $options.dialogToggle2("info")),
    o: common_vendor.o($options.dialogConfirm2),
    p: common_vendor.o($options.dialogClose),
    q: common_vendor.p({
      type: _ctx.msgType,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u5B9A",
      title: "\u901A\u77E5",
      content: "\u662F\u5426\u66F4\u6362\u4E3A\u9ED8\u8BA4\u80CC\u666F"
    }),
    r: common_vendor.sr("alertDialog2", "7325f334-4"),
    s: common_vendor.p({
      type: "dialog"
    }),
    t: common_vendor.p({
      size: "18",
      type: "search"
    }),
    v: common_vendor.p({
      bgColor: "#fff",
      radius: "100",
      placeholder: "\u641C\u7D22\u7B14\u8BB0",
      clearButton: "none",
      cancelButton: "none"
    }),
    w: common_vendor.f($data.note, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.content),
        b: "7325f334-8-" + i0,
        c: common_vendor.p({
          date: item.now - 3e4,
          threshold: [6e4, 36e5],
          format: "MM\u6708dd\u65E5"
        }),
        d: item.avatar
      }, item.avatar ? {
        e: item.avatar[0]
      } : {}, {
        f: index,
        g: common_vendor.o(($event) => $options.toEdit(item._id), index),
        h: common_vendor.o(($event) => $options.longpressTo(item._id), index)
      });
    }),
    x: common_vendor.sr("fab", "7325f334-9"),
    y: common_vendor.o($options.goto),
    z: common_vendor.p({
      horizontal: "right",
      vertical: "bottom"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/HBuilderProjects/myNote/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
