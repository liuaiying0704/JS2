window.onload = function () {
  // 手机号的正则表达式
  var rgtel = /^1[3|4|5|6|7|8|9]\d{9}$/; //1(345689)_9个  11个
  var tel = document.querySelector('#tel');
  function reg(rgId, rg) {
    rgId.onblur = function () {
      if (rg.test(this.value.trim())) {
        this.nextElementSibling.className = 'success';
        this.nextElementSibling.innerHTML = `<i class="success_icon"></i>恭喜您输入正确`;
      } else {
        this.nextElementSibling.className = 'error';
        this.nextElementSibling.innerHTML = `<i class="error_icon"></i>抱歉您输入的不正确`;
      }
    };
  }
  //  手机号调用
  reg(tel, rgtel);

  //qq号码
  var rgqq = /^[1-9]\d{4,}$/; //1
  var qq = document.querySelector('#qq');
  reg(qq, rgqq);
  //  昵称
  var rgnc = /^[\u4e00-\u9fa5]{2,8}$/; //汉字
  var nc = document.querySelector('#nc');
  reg(nc, rgnc);
  // 短信验证
  var rgmsg = /^\d{6}$/; //数字6位
  var msg = document.querySelector('#msg');
  reg(msg, rgmsg);
  //  登陆密码
  var rgpwd = /^\w{6,16}$/; //
  var pwd = document.querySelector('#pwd');
  reg(pwd, rgpwd);
  //   确认密码
  var surepwd = document.querySelector('#surepwd');
  surepwd.onblur = function () {
    if (this.value.trim() == pwd.value.trim()) {
      this.nextElementSibling.className = 'success';
      this.nextElementSibling.innerHTML = `<i class="success_icon"></i>密码正确`;
    } else {
      this.nextElementSibling.className = 'error';
      this.nextElementSibling.innerHTML = `<i class="error_icon"></i>两次输入的密码不一致`;
    }
  };
};
