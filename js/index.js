window.addEventListener('load', function () {
  //  1.获取元素
  let j_zuo = document.querySelector('.j_zuo');
  let j_you = document.querySelector('.j_you');
  let box = document.querySelector('.box');
  let boxwidth = box.offsetWidth;
  // 2.鼠标离开box 就隐藏左右按钮
  box.addEventListener('mouseenter', function () {
    j_zuo.style.display = 'block';
    j_you.style.display = 'block';
    clearInterval(timer);
    timer = null;

  })
  // 3.鼠标经过box 就显示左右按钮
  box.addEventListener('mouseleave', function () {
    j_zuo.style.display = 'none';
    j_you.style.display = 'none';
    timer = setInterval(function () {
      // 手动调用点击事件
      j_you.click();
    }, 2000);
  })
  // 4.动态生成小圆圈  有几张图片生成几个小圆圈
  var u1 = box.querySelector('.u1');
  let dots = box.querySelector('.dots');
  for (let i = 0; i < u1.children.length; i++) {
    let a = document.createElement('a')
    dots.appendChild(a);
    a.className = 'pg';
    // 记录当前小圆圈的索引号
    a.setAttribute('index', i);
    // 创建a的同时直接就绑定事件
    // 直接生成小圆圈的同时绑定事件采用排他思想
    a.addEventListener('click', function () {
      for (let i = 0; i < dots.children.length; i++) {
        dots.children[i].className = 'pg';
      }
      this.className = 'z-slt1 pg';
      //点击小圆圈移动图片  移动的是ul
      // ul的移动距离 小圆圈的索引号乘以图片的宽度 注意是负值
      // 点击了某个a 就拿到当前a的索引号
      let index = this.getAttribute('index');
      //  当我们点击了某个a就要把这个a的索引号给num
      num = index;
      //  当我们点击了某个a就要把这个a的索引号给circle
      circle = index;
      animate(u1, -index * boxwidth);
    })
  }
  // 5.将第一个a设置为红色
  dots.children[0].className = 'z-slt1 pg';
  // 6.克隆第一张图片 放到ul最后面
  let first = u1.children[0].cloneNode(true);
  u1.appendChild(first);
  // num控制上面图片的播放
  let num = 0;
  // circle控制小圆圈的播放
  let circle = 0;
  // 7.点击右侧按钮
  j_you.addEventListener('click', function () {
    // 如果走到了最后一张 需要快速复原
    if (num == u1.children.length - 1) {
      u1.style.left = 0;
      num = 0;
    }
    num++;
    animate(u1, -num * boxwidth);
    circle++;
    // 如果circle走到最后一张 即等于u1.children.length - 1时 需要快速复原到第一张
    if (circle == u1.children.length - 1) {
      circle = 0;
    }
    // 排他思想 让上面图片滚动的同时让下面的小圆点同步
    circleChange();

  });
  // 8.左侧按钮
  j_zuo.addEventListener('click', function () {
    // 如果走到了最后一张 需要快速复原
    if (num == 0) {
      num = u1.children.length - 1;
      u1.style.left = -num * boxwidth + 'px';
    }
    num--;
    animate(u1, -num * boxwidth);
    circle--;
    // 如果circle<0说明第一张图片 则小圆圈要改为第四个小圆圈
    if (circle < 0) {
      circle = u1.children.length - 1;
    }
    circleChange();

  });
  function circleChange () {
    for (let i = 0; i < dots.children.length; i++) {
      dots.children[i].className = 'pg';
    }
    // console.log(dots.children[circle]);
    dots.children[circle].className = 'z-slt1 pg';

  }
  // 10.自动播放轮播图
  let timer = this.setInterval(function () {
    // 手动调用点击事件
    j_you.click();
  }, 2000)
  let pre = document.querySelector('.pre');
  let nxt = document.querySelector('.nxt');
  let roll = document.querySelector('.roll');
  let ul1 = document.querySelector('.ul1');
  let ul2 = document.querySelector('.ul2');
  let ul3 = document.querySelector('.ul3');
  let ul4 = document.querySelector('.ul4');
  pre.addEventListener('click', function () {
    if (ul1.style.left == 0 + 'px') {
      animate(ul1, -645);
      animate(ul2, 0);
      animate(ul3, 645);
      animate(ul4, 1290);
    } if (ul2.style.left == 0 + 'px') {
      animate(ul1, -1290);
      animate(ul2, -645);
      animate(ul3, 0);
      animate(ul4, 645);
    }
    if (ul3.style.left == 0 + 'px') {
      animate(ul1, -1935);
      animate(ul2, -1290);
      animate(ul3, -645);
      animate(ul4, 0);
    } else if (ul4.style.left == 0 + 'px') {
      animate(ul1, 0);
      animate(ul2, 645);
      animate(ul3, 1290);
      animate(ul4, 1935);
    }
  });
  nxt.addEventListener('click', function () {
    if (ul1.style.left == 0 + 'px') {
      animate(ul1, 645);
      animate(ul2, 0);
      animate(ul3, -645);
      animate(ul4, -1290);
    } if (ul2.style.left == 0 + 'px') {
      animate(ul1, 1290);
      animate(ul2, 645);
      animate(ul3, 0);
      animate(ul4, -645);
    }
    if (ul3.style.left == 0 + 'px') {
      animate(ul1, 1935);
      animate(ul2, 1290);
      animate(ul3, 645);
      animate(ul4, 0);
    } else if (ul4.style.left == 0 + 'px') {
      animate(ul1, 0);
      animate(ul2, -645);
      animate(ul3, -1290);
      animate(ul4, -1935);
    }
  });
  //现在开始制作tab栏切换
  var wrap2 = document.querySelector('.wrap2');
  var a = wrap2.querySelectorAll('a');
  var items = document.querySelectorAll('.item-hd');
  for (var i = 0; i < a.length; i++) {
    // 开始给上面的模块设置索引号
    a[i].setAttribute('index', i);
    a[i].onclick = function () {
      // 1.上面点击模块采取排他思想
      for (var i = 0; i < a.length; i++) {
        a[i].className = 'z-slt';
      }
      this.className = '';
      // 2.下面的显示模块要写进点击事件里面
      var index = this.getAttribute('index');//获取index当前点击的自定属性
      for (var i = 0; i < items.length; i++) {
        //这里用到了排他思想
        // 给所有的元素添加属性
        items[i].style.display = 'none';
      }
      // 将点击的那个属性添加显示
      items[index].style.display = 'block';
    }
  }
  let mtable = document.querySelector('.m-table');
  let udur = mtable.querySelectorAll('.u-dur');
  let sfc = mtable.querySelectorAll('.s-fc3');
  let hshow = mtable.querySelectorAll('.hshow');
  // for (let i = 0; i < udur.length; i++) {
  //   sfc[i].addEventListener('mouseenter', function () {
  //     for (let j = 0; j < hshow.length; j++) {
  //       hshow[i].style.display = 'none';
  //     }
  //     hshow[i].style.display = 'block';
  //     if (hshow[i].style.display = 'block') {
  //       udur[i].style.display = 'none';
  //     } else {
  //       udur[i].style.display = 'block';
  //     }
  //   })
  // }
  // for (let i = 0; i < udur.length; i++) {
  //   sfc[i].addEventListener('mouseleave', function () {
  //     for (let j = 0; j < hshow.length; j++) {
  //       hshow[i].style.display = 'block';
  //     }
  //     hshow[i].style.display = 'none';
  //     if (hshow[i].style.display = 'none') {
  //       udur[i].style.display = 'block';
  //     } else {
  //       udur[i].style.display = 'none';
  //     }
  //   })
  // }
  let zcl = document.querySelector('.zcil');
  let denglu = document.querySelector('.denglu');
  let login = document.querySelector('.login');
  console.log(zcl, denglu, login);
  zcl.addEventListener('click', function () {
    login.style.display = 'none';
  });
  denglu.addEventListener('click', function () {
    login.style.display = 'block';
  });
  // 现在开始制作 返回顶部小图标的

});

