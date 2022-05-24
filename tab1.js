var that;
class Tab {
  constructor(id) {
    that = this;
    this.main = document.querySelector('#' + id);
    this.add = this.main.querySelector('.tabadd');
    this.ul = this.main.querySelector('.fisrstnav ul');
    this.fsection = this.main.querySelector('.tabscon');
    // 绑定事件
    // 新增
    this.add.onclick = this.addTab;
    this.init();
  }
  //   tab栏切换
  toggleTab() {
    console.log(11);
    that.clearClass();
    // for (var i = 0; i < that.lis.length; i++) {
    //   that.lis[i].className = ''; //让所有的li去掉类名
    //   that.sections[i].className = ''; //让所有的section去掉类名
    // }
    // 让当前的li加类名
    this.className = 'liactive';
    // 让当前的section加类名
    var index = this.index; //加索引号
    that.sections[index].className = 'conactive';
  }
  //   增加
  addTab() {
    that.clearClass();
    var li = `<li class="liactive"><span>测试${Math.random()}</span><span class="iconfont icon-guanbi"></span></li>`;
    var section = `<section class="conactive">测试${Math.random()}</section>`;
    that.ul.insertAdjacentHTML('beforeend', li);
    that.fsection.insertAdjacentHTML('beforeend', section);
    that.init();
  }
  //   删除
  removeTab(e) {
    e.stopPropagation();
    this.parentNode.remove();
    var index = this.parentNode.index;
    that.sections[index].remove();
    that.init();
    // 当我们删除的小li不是选中的li,小li的选中状态不变。
    if (that.main.querySelector('.liactive')) {
      return;
    }
    // 当我们删除的小li是选中状态，要改变小li的选中状态。
    index--; //删完了怎么办，index=-1
    if (index == -1) {
      //删除的第一个li
      index = 0;
    }
    that.lis[index] && that.lis[index].click(); //删完了怎么办，index=-1。有li,that.lis[index] 并且让他调用点击事件。
  }

  //   编辑
  editTab() {
    // 双击禁止选中文字
    // 拿到当前span里的内容保存下来， 在当前span里添加input, 且把内容放在input里
    // 文本框里的文字处于选中状态

    // 多次双击报错解决1
    // if (this.querySelector('input')) {
    //   return; //已经有input的就return
    // }
    window.getSelection
      ? window.getSelection().removeAllRanges()
      : document.selection.empty();
    var strhtml = this.innerHTML;
    this.innerHTML = `<input type="text"></input>`;
    var input = this.children[0];
    input.value = strhtml;
    input.select();
    // 禁止冒泡，双击事件
    input.ondblclick = function (e) {
      e.stopPropagation();
    };
    // 失去焦点，，让input变成span框，并把值给到span。
    input.onblur = function () {
      this.parentNode.innerHTML = this.value;
    };
    // 回车的话也调用一下失去焦点事件。让input变成span框，并把值给到span。
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    };
  }

  // 封装
  clearClass() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''; //让所有的li去掉类名
      this.sections[i].className = ''; //让所有的section去掉类名
    }
  }

  updateNodes() {
    this.lis = this.main.querySelectorAll('.fisrstnav li');
    this.sections = this.main.querySelectorAll('.tabscon section');
    this.removes = this.main.querySelectorAll('.icon-guanbi');
    this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
  }
  init() {
    this.updateNodes();
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.removes[i].onclick = this.removeTab;
      this.spans[i].ondblclick = this.editTab;
    }
  }
}

var tab = new Tab('tab');
console.log(tab);
