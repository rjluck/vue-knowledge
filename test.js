window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var box = document.querySelector('.box');
    var boxWidth = box.offsetWidth;
    //1.鼠标经过
    box.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除定时器变量
    })
    box.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();//手动调用点击事件
        }, 2000)
    })
    //2.动态生成小圆圈
    var ul = box.querySelector('ul');
    var ol = box.querySelector('.circle');

    console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号,通过自定义属性
        li.setAttribute('index', i)
        //把小li插入到ol里面
        ol.appendChild(li);
        //小圆圈的排他思想,我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current';
            //点击小圆圈，移动图片，当然移动的是ul
            //ul的移动距离：小圆圈的索引号 乘以 图片的宽度,注意是负值
            //当我们点击了某个小li,就拿到当前小li的索引号
            var index = this.getAttribute('index')
            //但我们点击了某个li,就要把这个li的索引号给num和circle
            num = index;//解决当小圆点点击第3个时，再点击右侧箭头，图片移动异常
            circle = index;//解决当小圆点点击第3个时，再点击右侧箭头，小圆点移动异常
            animate(ul, -index * boxWidth);
        })
    }
    //把ol里面的第一个小li设置类名为current
    ol.children[0].className = 'current';
    //3.克隆第一张图片(li) 放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //4.点击右侧按钮,图片滚动一张
    var num = 0;
    var circle = 0;//控制小圆圈的播放
    var flag = true;//节流阀
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀

            //如果走到了最后复制的一张图片，此时，我们的ul要快速复原 left 改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * boxWidth, function () {
                flag = true;//动画执行完毕,开启节流阀
            });

            //点击右侧按钮,小圆圈跟随一起变化,声明变量控制小圆圈的播放
            circle++;
            //如果circle == 4 说明走到最后我们克隆的这张图片了
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();//调用函数
        }

    })


    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;

            //如果走到了最后复制的一张图片，此时，我们的ul要快速复原 left 改为0
            if (num == 0) {
                num = ul.children.length - 1;
                console.log('num', num)
                ul.style.left = -(num) * boxWidth + 'px';
            }
            num--;
            animate(ul, -num * boxWidth, function () {
                flag = true;//动画执行完毕,开启节流阀
            });

            //点击右侧按钮,小圆圈跟随一起变化,声明变量控制小圆圈的播放
            circle--;
            //如果circle == 4 说明走到最后我们克隆的这张图片了
            if (circle < 0) {
                circle = ol.children.length - 1;
            }

            circleChange();//调用函数
        }
    })


    //先清除其余小圆圈的current类名,留下当前小圆圈的current类名
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current';
    }
    //5.自动播放轮播图
    var timer = setInterval(function () {
        arrow_r.click();//手动调用点击事件
    }, 2000)

})
