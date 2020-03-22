// let sidebar = {

//     // 打开Thought主页链接时生成下面这个菜单
//     '/Thought': [
//         // ['/Thought/', '随笔首页'],
//         {
//             title: '游记',
//             children: [
//                 ['/Thought/Travels/beiPing', '北平游记'],
//             ]
//         },
//         {
//             title: '年终回顾',
//             children: [
//                 ['/Thought/YearReview/2018', '2018年'],
//                 ['/Thought/YearReview/2019', '2019年']
//             ]
//         },
//     ],
//     '/': [
//         "/", //指的是根目录的md文件 也就是 README.md 里面的内容
//         "apiword",
//         "api",
//         "error"
//     ],
// };

let sidebar = {
    '/about/': [
        {
            title: 'JavaScript', // 侧边栏名称
            collapsable: true, // 可折叠
            children: [
                // ''空字符串代表主页，显示README.md中的内容
                '',
                '/about/first'
                //['first', '111111111111111111'],//使用数组为侧边栏起别名，前边是md名称，后边是链接显示的文字

            ]
        },
        {
            title: 'css', // 侧边栏名称
            collapsable: true, // 可折叠
            children: [
                '/about/first', // 你的md文件地址
                '/about/two'
            ]
        },
    ],
    '/typeScript/': [
        {
            title: 'TypeScript简介', // 侧边栏名称
            collapsable: true, // 可折叠
            children: [
                // ''空字符串代表主页，显示README.md中的内容
                ['/typeScript/introduction/', 'TypeScript简介']//使用数组为侧边栏起别名，前边是md名称，后边是链接显示的文字
            ]
        },
        {
            title: 'TypeScript基础', // 侧边栏名称
            collapsable: true, // 可折叠
            children: [
                '/typeScript/base/dataType', // 你的md文件地址
                '/typeScript/base/typeInference',
                '/typeScript/base/unionType',
            ]
        }
    ]
}

module.exports = {
    title: '个人主页',
    description: '姜帅杰的博客',
    head: [
        ['link', { rel: 'icon', href: '/img/logo.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    themeConfig: {
        //sidebarDepth: 4,//这是嵌套标题链接，自动显示当前激活（导航）页面标题的链接，即显示深度（h1-h6的深度）
        lastUpdated: 'Last Updated',// 文档更新时间：每个文件git最后提交的时间
        displayAllHeaders: true,// 侧边栏只会显示由当前活动页面的标题（headers）组成的链接，你可以将 themeConfig.displayAllHeaders 设置为 true 来显示所有页面的标题链接：
        // 顶部导航栏
        nav: [
            { text: '主页', link: '/' },
            {
                text: '博文',
                items: [
                    { text: 'About', link: '/about/' },
                    { text: 'TypeScript', link: '/typeScript/' },
                    { text: 'Web', link: '/web/' }
                ]
            },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://www.github.com/codeteenager' },
        ],
        // 侧边栏菜单( 一个模块对应一个菜单形式 ) ,为以下路由添加侧边栏
        // sidebar: ['/', '/about/', '/study/'],
        // 添加侧边栏,该语法表示使用当前页面标题自动生成侧边栏
        // sidebar: 'auto',
        sidebar: sidebar,

    },
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'path/to/some/dir'
            }
        }
    }
}