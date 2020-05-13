# 本地存储

[[toc]]


随着互联网的快速发展,基于网页的应用越来越普遍,同时也变的越来越复杂，为了满足各种各样的需求,会经常在本地存储大量的数据，HTML5规范提出了相关解决方案。

典型案例：http://www.todolist.cn/

**本地存储特性**

- 数据存储在用户浏览器中
- 设置、读取方便、甚至页面刷新不丢失数据
- 容量较大,`sessionStorage`约5M,`localStorage`约20M
- 只能存储字符串,可以将对象`JSON.stringify()`编码后存储

## window.sessioStorage

- 生命周期为关闭浏览器窗口
- 在同一个窗口(页面)下数据可以共享
- 以键值对的形式存储使用

### 1.存储数据

`sessionStorage.setItem(key,value)`


### 2.获取数据

`sessionStorage.getItem(key)`


### 3.删除数据

`sessionStorage.removeItem(key)`


### 4.删除所有数据

`sessionStorage.clear()`

eg:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=video, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="text">
    <button class="set">存储数据</button>
    <button class="get">获取数据</button>
    <button class="remove">删除数据</button>
    <button class="del">清空所有数据</button>
    <script>
        var ipt = document.querySelector('input');
        var set = document.querySelector('.set');
        var get = document.querySelector('.get');
        var remove = document.querySelector('.remove');
        var del = document.querySelector('.del');
        set.addEventListener('click', function () {
            //点击之后。存储表单的值
            var val = ipt.value;
            sessionStorage.setItem('uname', val);
            sessionStorage.setItem('pwd', val);
        })

        get.addEventListener('click', function () {
            //点击之后。获取表单的值
            var val = sessionStorage.getItem('uname');
            console.log('val', val)
        })

        remove.addEventListener('click', function () {
            //点击之后。删除获取表单的值
            sessionStorage.removeItem('uname');
        })

        del.addEventListener('click', function () {
            //点击之后。删除所有数据
            sessionStorage.clear();
        })
    </script>
</body>
</html>
```



## window.localStorage

- 生命周期永久有效,除非手动删除，否则关闭页面也会删除
- 可以多窗口(页面)共享(同一浏览器可以共享)
- 以键值对的形式存储使用

### 1.存储数据

`localStorage.setItem(key,value)`


### 2.获取数据

`localStorage.getItem(key)`

### 3.删除数据

`localStorage.removeItem(key)`


### 4.删除所有数据

`localStorage.clear()`

























