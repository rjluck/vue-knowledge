# 案例

[[toc]]


## 本地生活P36

首页

![image](/imgs/applet/wx/wx91.png)


列表页
![image](/imgs/applet/wx/wx117.png)

## 接口地址

获取轮播图数列表的接口
- 【GET】https://www.escook.cn/slides

获取九宫格数列表的接口
- 【GET】https://www.escook.cn/categories

获取随机颜色的数组
- 【GET】https://www.escook.cn/api/color

列表页面接口
- 以分页的形式，加载指定分类下商铺列表的数据
- 接口地址
  - 【GET】https://www.escook.cn/categories/:cate_id/shops
  - url地址中的`:cate_id`是动态参数，表示分类的id
- 请求参数
  - `_page`表示请求第几页的数据
  - `_limit`表示每页请求几条数据




## 上拉触底案例

实现步骤：
![image](/imgs/applet/wx/wx107.png)


**对上拉触底进行节流处理**
- 在`data`中定义`isLoading`节流阀
- 在getColors()方法中修改`isLoading`节流阀的值
- 在`onReachBottom`中判断节流阀的值，从而对数据请求进行节流控制。


**如何判断是否还有下一页数据**

如果下面的公式成立，则证明没有下一页数据了：
`页码值*每页显示多少条数据>=总数据条数`及`page*pageSize>=total`


## uniapp黑马优购 项目介绍

文档地址：https://www.escook.cn/docs-uni-shop


## 使用小程序常用组件实现项目首页的效果

【轮播图】

在进行网页开发，实现轮播图的时候，我们通常先使用HTML/CSS实现轮播图的结构样式，然后使用`JS`控制轮播图的效果，或者直接使用插件实现轮播图的功能，而在小程序中实现轮播图则相对简单很多。

在小程序中，提供了`swiper`和`swiper-item`组件实现了轮播图：
- `swiper`:滑块视图容器，其中只能放置`swiper-item`组件
- `swiper-item`:只可放置在`swiper`组件中，宽高自动设置为`100%`,代表`swiper`



【图片】

在小程序中，如果需要渲染图片，需要使用`image`组件，常用的属性有4个：
- `src`属性：图片资源地址
- `mode`:图片裁剪、缩放的模式
- `show-menu-by-longpress`:长按图片显示菜单
- `lazy-load`:图片懒加载

> 注意事项：
> - `image`默认具有宽度和高度，宽度320px,高度是240px
> - `image`组件不给`src`属性设置图片地址，也占据宽和高



【文本】

在小程序中，如果需要渲染文本，需要使用`text`组件，常用的属性有2个：
- `user-select`:文本是否可选，用于长按选择文本
- `space`:显示连续空格

> 注意事项：
> - 除了文本节点以外的其他节点都无法长按选中
> - `text`组件内只支持text嵌套




【跳转】

在小程序中，如果需要进行跳转，需要使用`navigation`组件，常用的属性有2个：
- `url`:当前小程序内的跳转链接
- `open-type`:跳转方式
  - `navigate`:保留当前页面，跳转到应用内的某个页面。但是不能跳到`tabBar`页面。
  - `redirect`:关闭当前页面，跳转到应用内的某个页面。但是不能跳到`tabBar`页面。
  - `switchTab`:跳转到`tabBar`页面，并关闭其他所有非`tabBar`页面。
  - `reLaunch`:关闭所有页面，打开到应用内的某个页面(`tabBar`页面和非`tabBar`页面都可)。
  - `navigateBack`:关闭当前页面，返回上一页面或多级页面。

> 注意事项：
> - 在进行页面跳转时，需要在路径前面添加`/`，否则跳转不成功。
> - 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值使用`=`相连，不同参数用`&`分隔。例如：`/list?id=123&name=hua`,在`onLoad(options)`生命周期函数中获取传递的参数。
> - `open-type="switchTab"`时，不支持传参。



【内容滚动】
在小程序中，如果需要实现内容滚动，需要使用`scroll-view`组件。，常用的属性有2个：
- `scroll-x`:允许横向滚动
- `scroll-y`:允许纵向滚动

`scroll-view`：可滚动视图区域，适用于需要滚动展示内容的场景，用于在小程序中实现类似于网页中的滚动条效果，用户可以通过手指滑动或者点击滚动条来滚动内容。



【字体图标】

在项目中使用到的小图标，一般由公司设计师进行设计，设计好以后上传到阿里巴巴矢量图标库，然后方便程序员来使用。

小程序中的字体图标使用方式与`Web`开发中的使用方式是一样的。
- 打开 [iconfont](https://www.iconfont.cn/)选好图标加入到项目
- 打开在线链接将链接的css内容复制到项目中引入即可
- 或，下载至本地，将iconfont.css文件内容复制到项目中引入即可
  
![image](/imgs/applet/wx/wx13_2.png)

> 注意事项：
> - 使用字体图标坑会报错：【渲染层网络错误】Failed to load font......,该错误可忽略。
> - 但在控制台出现错误，会影响开发调试，解决方案是：将字体图标转换成`base64`的格式。

![image](/imgs/applet/wx/wx13_1.png)



【背景图片】

当编写小程序的样式文件时，我们可以使用`background-image`属性来设置元素的背景图像。


> 注意事项：
> - 小程序的`background-image`不支持本地路径！需要使用网络图片，或者`base64`,或者使用`<image/>`组件

