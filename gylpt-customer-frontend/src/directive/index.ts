import Vue from "vue";
export default {
  install() {
    Vue.directive("focus", {
      inserted(el) {
        el.focus();
      },
    });
    // 高亮 指令
    Vue.directive("bg-highlight", {
      inserted(el) {
        // tslint:disable-next-line:only-arrow-functions
        el.onmouseenter = function (e) {
          el.classList.add("active-row");
        };
        el.onmouseleave = function () {
          el.classList.remove("active-row");
        };
      },
    });
  },
};
