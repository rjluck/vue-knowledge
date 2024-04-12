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
```css
.bg-image{
  height:400px;
  /* 小程序背景图地址不能写本地路径 */
  /* background-image:url(../../assets/bgImage.png) */
}
```

案例代码

index/index.wxml
```html

<!-- 轮播图区 -->
<view class="swiper">
<swiper 
    autoplay="true" 
    interval="2000" 
    indicator-dots="true" 
    indicator-color="#fff"
    indicator-active-color="#f3514f"
    circular
>
    <swiper-item>
        <image src="../../assets/index/1.png" mode=""/>
    </swiper-item>
    <swiper-item>
        <image src="../../assets/index/2.png" mode=""/>
    </swiper-item>
    <swiper-item>
        <image src="../../assets/index/3.png" mode=""/>
    </swiper-item>
</swiper>
</view>

<!-- 公司信息 -->
<view class="info">
    <text><text class="iconfont icon-haoping"></text>同城配送</text>
    <text><text class="iconfont icon-bukexuanzuo"></text>行业龙头</text>
    <text><text class="iconfont icon-wuliupeisong"></text>半小时送达</text>
    <text><text class="iconfont icon-navicon-psf"></text>100% 好评</text>
</view>


<!-- 商品导航 -->
<view class="good-nav">
    <view>
        <navigator url="/pages/list/list">
            <image src="../../assets/index/flower.png" mode=""/>
            <text>鲜花玫瑰</text>
        </navigator>
    </view>
    <view>
        <navigator url="/pages/list/list">
            <image src="../../assets/index/flower.png" mode=""/>
            <text>鲜花玫瑰</text>
        </navigator>
    </view>
    <view>
        <navigator url="/pages/list/list">
            <image src="../../assets/index/flower.png" mode=""/>
            <text>鲜花玫瑰</text>
        </navigator>
    </view>
    <view>
        <navigator url="/pages/list/list">
            <image src="../../assets/index/flower.png" mode=""/>
            <text>鲜花玫瑰</text>
        </navigator>
    </view>
    <view>
        <navigator url="/pages/list/list">
            <image src="../../assets/index/flower.png" mode=""/>
            <text>鲜花玫瑰</text>
        </navigator>
    </view>
</view>


<!-- 推荐商品 -->
<view class="good-hot">
    <scroll-view scroll-x class="scroll-x">
        <view>
            <view class="good-item">
                <image src="../../assets/index/cate1.png" mode=""/>
                <text>鲜花玫瑰</text>
                <text>66</text>
            </view>
        </view>
        <view>
            <view class="good-item">
                <image src="../../assets/index/cate2.png" mode=""/>
                <text>鲜花玫瑰</text>
                <text>77</text>
            </view>
        </view>
        <view>
            <view class="good-item">
                <image src="../../assets/index/cate3.png" mode=""/>
                <text>鲜花玫瑰</text>
                <text>88</text>
            </view>
        </view>
        <view>
            <view class="good-item">
                <image src="../../assets/index/cate4.png" mode=""/>
                <text>鲜花玫瑰</text>
                <text>99</text>
            </view>
        </view>
        <view>
            <view class="good-item">
                <image src="../../assets/index/cate5.png" mode=""/>
                <text>鲜花玫瑰</text>
                <text>100</text>
            </view>
        </view>
    </scroll-view>
</view>
```

index/index.scss
```scss
page{
    height:100vh;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    padding:16rpx;
    box-sizing: border-box;
    > view{
        &:nth-child(n+2){
            margin-top: 16rpx;
        }
    }
}

// 轮播图区域样式
.swiper{
    border-radius: 10rpx;
    overflow: hidden;
    swiper{
        height:360rpx;
        background-color: skyblue;
        swiper-item{

            image{
                width:100%;
                height:100%;
                border-radius: 10rpx;
            }
            // &:first-child{
            //     background-color: yellow;
            // }
            // &:last-child{
            //     background-color: lightgreen;
            // }
        }
    }
}

// 公司信息样式
.info{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 20rpx;
    border-radius: 10rpx;
    font-size: 24rpx;
    .iconfont{
        font-size: 24rpx;
    }
}

// 商品导航区域
.good-nav{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 20rpx 16rpx;
    border-radius: 10rpx;
    view{
      
        navigator{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        image{
            width:80rpx;
            height:80rpx;
        }
        text{
            font-size: 24rpx;
            margin-top: 12rpx;
        }
    }
}


// 推荐商品区域
.good-hot{
    background-color: #fff;
    padding: 16rpx;
    border-radius: 10rpx;
    font-size: 24rpx;
    .scroll-x{
        width: 100%;
        white-space: nowrap;

        view{
            display: inline-block;
            width:320rpx;
            height:440rpx;
            margin-right: 16rpx;
            &:last-child{
                margin-right:0;
            }
            .good-item{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text{
                    &:nth-of-type(1){
                        font-weight: bold;
                    }
                }
            }
            image{
                width:100%;
                height:320rpx;
            }
        }
    }
}

```


## 慕尚花坊项目

- [参考链接1](https://blog.csdn.net/h879656/article/details/136603569)
- [bilibili介绍](https://www.bilibili.com/video/BV1LF4m1E7kB/?p=95&spm_id_from=pageDriver&vd_source=46043ae66b9cbf88ed957e04e481ddc0)


### 项目概述

【慕尚花坊】是一款同城鲜花订购的小程序，专业提供各地鲜花速递、鲜花预定、网上订花、包月鲜花等服务。是快3小时送花上门。保证花材新鲜和鲜花质量，可先送花后付款，专业花艺师博精美包扎，品质保证，至诚服务。



### 项目演示

项目通盖电商项目常见功能模块，包含：
- 项目首页
- 商品分类
- 商品列表
- 商品详情
- 用户管理
- 收货地址
- 购物车
- 结算支付
- 订单管理
- ...

![image](/imgs/applet/wx/wx196.png)

### 项目技术栈


### 接口文档