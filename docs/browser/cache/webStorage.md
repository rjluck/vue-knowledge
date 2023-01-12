# webStorage

[[toc]]


## localStorage

window对象上有localStorage

```js
// 设置
let obj = {name:'xxx',age:18}
localStorage.setItem('msg','hello')

localStorage.setItem('person',JSON.stringify(obj))// 对象转成json字符串


// 读取
localStorage.getItem('msg')
let result = localStorage.getItem('person');
console.log(JSON.parse(result))// json字符串转成json对象

// 删除
localStorage.removeItem('msg')

// 清空
localStorage.clear()
```

## sessionStorage


语法完全同localStorage


# 总结
- 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）。
- 浏览器端通过Window.sessionStorage和Window.localStorage属性来实现本地存储机制。
- 相关API
  - xxxStorage.setItem('key','value')该方法接收一个键，一个值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
  - xxxStorage.getItem('key')该方法接收一个键名作为参数，返回键名对应的值。
  - xxxStorage.removeItem('key')该方法接收一个键名作为参数，并把该键名从存储中删除。
  - xxxStorage.clear()该方法会清空存储中的所有数据。
- 备注
  - sessionStorage存储的内容会随着浏览器窗口关闭而消失。
  - localStorage存储的内容，需要手动清除才会消失。
  - xxx.Storage.getItem(xxx)如果key对应的value获取不到，那么getItem的返回值是null。
  - JSON.parse(null)的结果依然是null