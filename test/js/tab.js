
var that;
class Tab {
    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.tabscon = this.main.querySelector('.tabscon');
        this.init();
    }

    //
    //0.初始化 让相关的元素绑定事件
    init() {
        this.updateNode();
        //addTab添加绑定
        this.add.onclick = this.addTab;
        //li循环绑定
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            // this.lis[i].onclick = function () {
            //     // console.log(this.index);
            // }
            this.lis[i].onclick = this.toggleTab;
            this.dels[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    //1.切换
    toggleTab() {
        console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive'
    }

    //2.添加
    addTab() {
        var random = Math.random();
        that.clearClass();//清除所有样式
        var li = ` <li class="liactive"><span>新选项卡</span><span class="del">x</span></li>`
        var section = `<section class="conactive">测试${random}</section>`
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabscon.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    //3.删除
    removeTab(e) {
        e.stopPropagation();//阻止冒泡,防止触发li的切换点击事件
        var index = this.parentNode.index;
        console.log('index : ', index);
        //根据索引号删除对应的li和section
        that.lis[index].remove();//remove方法可以直接删除指定元素
        that.sections[index].remove();
        that.init();
        //当我们删除的不是选中状态的li的时候,原来的选中状态li保持不变
        if (document.querySelector(".liactive")) return;
        //当我们删除了选中状态的这个li的时候,让它的前一个li处于选中状态
        index--;
        //click()  手动调用我们的点击事件,不需要鼠标触发
        that.lis[index] && that.lis[index].click();
    }

    //4.修改
    editTab() {
        //双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        //
        this.innerHTML = `<input type="text" value=${this.innerHTML} />`
        //文本框文字处于选中状态
        var input = this.children[0];
        input.select();
        //当我们离开文本框就把文本框里面的值给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        //按下回车也可以把文本框里面的值给span
        input.onkeyup = function (e) {
            if (e.keyCode == 13) {
                //手动调用表单失去焦点事件,不需要鼠标离开操作
                this.blur();//不用加on
            }
        }
    }

    //5.清除样式
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    //6.获取所有小li section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.dels = this.main.querySelectorAll('.del');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    }
}

new Tab("#tab");
