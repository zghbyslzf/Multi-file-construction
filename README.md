## 说明

webpack 多页面项目配置，适合公司官网，需要 seo 的网站使用！

## 启动

```
git clone https://github.com/zghbyslzf/Multi-file-construction.git

npm install

npm run dev
```

## 打包

```
npm run build
```

打包结构如下

```
├── about
├── home
    ├── home.xxxxxx.js
    ├── home.css
    └── home.html            # 这个页面一般是你的主页
├── runtime
└── vendors

```

## 配置功能

> 热更新
> <br>自动打包压缩
> <br>生产环境和开发环境
> <br>css 提取
> <br>全局 lodash
> <br>路径解析
> <br>自动路径补全
> <br>自动打包输出路径
> <br>sass 预处理器
> <br>postcss-loader 自动添加 css 适配
> <br>分包，自动提取 node_modules 里的所有公共文件

## 使用提示

开发文件必须放到 src 下面，结构如下：

```
├── src
    ├── about
    └── home
        ├── index.html       # 这个页面一般是你的主页
        ├── index.js
        └── style.scss
```

src 下面每一个文件夹里面的 html 和 js 文件都要命名为 index，如果不是，会报错。

图片的话，可以在 src 下面新建一个 images 文件夹，图片都放入里面。

如果不是必须，不建议使用字体文件，必须使用的字体文件的话也尽量使用 cdn。原因是：字体文件经过提交到 github 仓库后，经过多次 commit 会造成.git 隐藏文件过大。

## 配置

如果有需要可以自行修改 webpack 配置（配置文件内都有详细的注释），配置结构如下:

```
├── webpack.common.js       # 公共配置
├── webpack.dev.js          # 开发环境配置
├── webpack.entry.js        # 动态生成html路径
└── webpack.prod.js         # 生产环境配置

```
