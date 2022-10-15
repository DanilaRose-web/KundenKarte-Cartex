import Vue from "vue";
Vue.directive("card", {
  bind(el) {
    el.oninput = function(e) {
      if (!e.isTrusted) {
        return;
      }

      let x = this.value.replace(/\D/g, "").match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
      this.value = x[1] + (x[2] ? "-" + x[2] : "") + (x[3] ? "-" + x[3] : "") + (x[4] ? "-" + x[4] : "");
      el.dispatchEvent(new Event("input"));
    };
  }
});
Vue.directive("phone", {
  bind(el) {
    el.oninput = function(e) {
      if (!e.isTrusted) {
        return;
      }

      let x = this.value.replace(/\D/g, "").match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      this.value = this.value = ('+' ? '+' + x[1] : ' ') + (x[2] ? " " + (x[2]) : "") + (x[3] ? " " + x[3] : "") + (x[4] ? " " + x[4] : "") + (x[5] ? " " + x[5] : "");
      el.dispatchEvent(new Event("input"));
    };
  }
  // this.value = ('+' ? '+' + x[1] : ' ') + (x[2] ? " " + (x[2]) : "") + (x[3] ? " " + x[3] : "") + (x[4] ? " " + x[4] : "") + (x[5] ? " " + x[5] : "");
});
