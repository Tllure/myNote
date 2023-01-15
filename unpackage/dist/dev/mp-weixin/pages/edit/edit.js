"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      id: "",
      content: "",
      ops: [],
      avatar: [],
      now: Date.now()
    };
  },
  onLoad(e) {
    console.log(e);
    this.id = e.id;
    this.show(e);
  },
  methods: {
    chooseAndUploadFile() {
      const that = this;
      common_vendor.yn.chooseAndUploadFile({
        type: "image",
        success(res) {
          console.log(res);
          if (res.tempFiles.length > 0) {
            for (let item in res.tempFiles) {
              console.log(item);
              let src = res.tempFiles[item].url;
              console.log(src);
              that.editorCtx.insertImage({
                src,
                width: "50%",
                height: "50%"
              });
              that.avatar = [src];
              that.insertImg();
            }
          }
        }
      });
    },
    getContent() {
      let that = this;
      this.editorCtx.getContents({
        success: function(res) {
          console.log(res);
          common_vendor.yn.callFunction({
            name: "updateContent",
            data: {
              _id: that.id,
              delta: res.delta,
              now: that.now,
              content: that.content
            },
            success: (e) => {
              console.log(e);
            }
          });
        }
      });
    },
    show(e) {
      common_vendor.yn.callFunction({
        name: "getContent",
        data: {
          _id: e.id
        },
        success: (res) => {
          console.log(res);
          this.content = res.result.data[0].content;
          this.editorCtx.setContents({
            "delta": res.result.data[0].delta,
            success: (e2) => {
              console.log(e2);
            }
          });
        }
      });
    },
    insertImg() {
      common_vendor.yn.callFunction({
        name: "addAvatar",
        data: {
          _id: this.id,
          avatar: this.avatar
        },
        success: (e) => {
          console.log(e.result);
        }
      });
    },
    backTo() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    onEditorReady() {
      common_vendor.index.createSelectorQuery().select("#editor").context((res) => {
        this.editorCtx = res.context;
      }).exec();
    },
    handleSuccess(res) {
      console.log(res);
      if (res.tempFilePaths.length > 0) {
        for (let item in res.tempFilePaths) {
          console.log(item);
          let src = res.tempFilePaths[item];
          this.editorCtx.insertImage({
            src,
            width: "50%",
            height: "50%"
          }), this.avatar = res.tempFilePaths;
          this.insertImg();
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  _easycom_uni_dateformat2();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  _easycom_uni_dateformat();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.backTo && $options.backTo(...args)),
    b: common_vendor.o((...args) => $options.getContent && $options.getContent(...args)),
    c: $data.content,
    d: common_vendor.o(($event) => $data.content = $event.detail.value),
    e: common_vendor.p({
      date: $data.now - 3e4,
      threshold: [6e4, 36e5]
    }),
    f: common_vendor.p({
      date: $data.now - 3e4,
      threshold: [0, 0],
      format: "hh:mm"
    }),
    g: common_vendor.o((...args) => $options.onEditorReady && $options.onEditorReady(...args)),
    h: common_vendor.o((...args) => $options.chooseAndUploadFile && $options.chooseAndUploadFile(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/HBuilderProjects/myNote/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
