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
