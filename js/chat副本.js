$(function () {
  // 接口文档
  // https://www.showdoc.com.cn/ajaxapi?page_id=3753323218792173
  // 1、发送
  $('#btnSend').on('click', function () {
    let message = $('#ipt').val().trim();
    let str = `<li class="right_word">
    <img src="img/person02.png" /> <span>${message}</span>
  </li>`;
    if (message) {
      $('#talk_list').append(str);
      $('#ipt').val('');
      getReplay(message); //发送消息，获取get请求
      resetui(); //让最新消息在界面中
    } else {
      return;
    }
  });
  // 2、发起请求
  const getReplay = (msg) => {
    $.get(
      'http://www.liulongbin.top:3006/api/robot',
      { spoken: msg },
      (res) => {
        const { data } = res;
        // console.log(data.info.text);
        let reply = data.info.text;
        let str = `<li class="left_word">
        <img src="img/person01.png" /> <span>${reply}</span>
      </li>`;
        $('#talk_list').append(str);
        getVoice(reply);
        resetui(); //让最新消息在界面中
      }
    );
  };

  //3、语音
  const getVoice = (msg) => {
    $.get(
      'http://www.liulongbin.top:3006/api/synthesize',
      {
        text: msg,
      },
      function (res) {
        const { voiceUrl } = res;
        $('#voice').attr('src', voiceUrl);
      }
    );
  };
  // 4、enter键，发送消息
  $('#ipt').on('keyup', function (e) {
    if (e.keyCode === 13) {
      $('#btnSend').click();
    }
  });
});
