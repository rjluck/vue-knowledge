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

let sidebar = [

]

module.exports = {
    title: '个人主页',
    description: '姜帅杰的博客',
    head: [
        ['link', { rel: 'icon', href: '/img/logo.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    themeConfig: {
        sidebarDepth: 4,
        lastUpdated: 'Last Updated',// 文档更新时间：每个文件git最后提交的时间
        // 顶部导航栏
        nav: [
            { text: '主页', link: '/' },
            {
                text: '博文',
                items: [
                    { text: 'Android', link: '/android/' },
                    { text: 'Thought', link: '/Thought/' },
                    { text: 'Web', link: '/web/' }
                ]
            },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://www.github.com/codeteenager' },
        ],
        // 侧边栏菜单( 一个模块对应一个菜单形式 )
        sidebar: sidebar,
        // 添加侧边栏
        sidebar: 'auto',

    },
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'path/to/some/dir'
            }
        }
    }
}