"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      profile: "",
      form: [
        {
          title: "\u6211\u7684\u7B14\u8BB0",
          image: "/static/\u65E5\u8BB0.png"
        },
        {
          title: "\u4FEE\u6539\u8D44\u6599",
          image: "/static/\u4FEE\u6539.png"
        },
        {
          title: "\u6211\u7684\u6536\u85CF",
          image: "/static/\u6536\u85CF.png"
        },
        {
          title: "\u5173\u4E8E",
          image: "/static/\u5173\u4E8E.png"
        },
        {
          title: "\u8BBE\u7F6E",
          image: "/static/\u8BBE\u7F6E.png"
        }
      ]
    };
  },
  onLoad() {
    this.show();
  },
  onShow() {
    this.show();
  },
  methods: {
    show() {
      common_vendor.yn.callFunction({
        name: "getUser",
        success: (e) => {
          console.log(e);
          this.profile = e.result.data[0].profile;
        }
      });
    },
    change() {
      common_vendor.yn.chooseAndUploadFile({
        type: "image",
        success: (e) => {
          console.log(e.tempFiles[0].url);
          common_vendor.yn.callFunction({
            name: "updateUser",
            data: {
              profile: e.tempFiles[0].url
            },
            success: (e2) => {
              console.log(e2);
              this.show();
            }
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  _easycom_uni_list_item2();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
if (!Math) {
  _easycom_uni_list_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.profile,
    b: common_vendor.o((...args) => $options.change && $options.change(...args)),
    c: common_vendor.f($data.form, (item, index, i0) => {
      return {
        a: index,
        b: "a55bc240-0-" + i0,
        c: common_vendor.p({
          link: "switchTab",
          to: "/pages/index/index",
          title: item.title,
          showArrow: true,
          thumb: item.image,
          ["thumb-size"]: "base"
        })
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/HBuilderProjects/myNote/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
