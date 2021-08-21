window.addEventListener('load', function () {
  let mback = document.querySelector('.m-back');
  let gwrap = document.querySelector('.g-wrap3');
  let gwraptop = gwrap.offsetTop;
  let mbacktop = mback.offsetTop;
  let mbackfixtop = mbacktop - gwraptop;
  document.addEventListener('scroll', function () {
    if (window.pageYOffset >= gwraptop) {
      mback.style.position = 'fixed';
      mback.style.top = mbackfixtop + 'px';
    } else {
      mback.style.position = 'absolute';
      mback.style.top = '600px';
    }
  });
  mback.addEventListener('click', function () {
    animateY(window, 0);
  });
  function animateY (obj, target, callback) {
    // console.log(callback);
    // 当我们不断地点击按钮，这个元素的速度会越老越快因为开启了太多的定时器
    // 解决方案就是 让我们元素只有一个定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      // 步长值写在定时器的里面
      //把我们步长值改为整数 不要出现小数的问题
      var step = (target - window.pageYOffset) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (window.pageYOffset == target) {
        clearInterval(obj.timer);

        // 回调函数写在定时器里面
        if (callback) {
          callback();//调用函数
        }
      }
      // 把每次加一这个步长值变成缓动动画公式：（目标值-现在的位置）/10
      // 把步长值改为整数 应该往大了取整数

      // obj.style.left = obj.offsetLeft + step + 'px';
      window.scroll(0, window.pageYOffset + step);
    }, 15);
  }
});