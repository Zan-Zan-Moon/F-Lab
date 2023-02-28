(function () {
  let a = 0;
  let intervalId = null;
  let inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
    }
    console.log(a);
  };

  intervalId = setInterval(inner, 1000);
})();

// 클로저를 활용한 변수은닉
