function animate(obj, target, callback) {
    console.log(obj)
    console.log(target)
    //callback = function(){}
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        //步长值写到定时器的里面 (目标值 - 现在的位置)/10

        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step)

        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //回调函数写到定时器结束里面
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
        //每次
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30);
}