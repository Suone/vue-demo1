let path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
console.log(process.env.NODE_ENV + "环境", process.env);
const isProduction = process.env.NODE_ENV !== "development";
module.exports = {
  publicPath:
        process.env.NODE_ENV !== "development"
            ? "/assets/console/" + process.env.VUE_APP_VERSION
            : "/", // 根路径
    outputDir: "dist", // 打包的时候生成的一个文件名
    assetsDir: "static", // 静态资源目录(js,css,img,fonts)这些文件都可以写里面
    filenameHashing: false,
    productionSourceMap: false,
    lintOnSave: false, // 是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
    devServer: {
        host: "0.0.0.0",
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://myglory.damei.org/front',
        ws: true, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        // pathRewrite: {
        //     '^/api': ''
        // }
      }
    }
  },

  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  },
  css: {
    extract: isProduction,
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/styles/public.scss";`//添加全局sass文件 此处路径替换为你的文件路径
      }
    }
  },
  chainWebpack: (config) => {
    // 删除预加载
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.resolve.alias.set("@", resolve("src")); // key,value自行定义，比如.set('@@', resolve('src/components'))
    // 生产环境配置
    if (isProduction) {
        // 压缩代码
        config.optimization.minimize(true);
        // 分割代码
        config.optimization.splitChunks({
            chunks: "all",
        });
    }
    config.optimization.splitChunks({
        chunks: "all", //async异步代码分割 initial同步代码分割 all同步异步分割都开启
        minSize: 30000, //字节 引入的文件大于30kb才进行分割
        //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
        minChunks: 1, //模块至少使用次数
        maxAsyncRequests: 5, //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
        maxInitialRequests: 3, //首页加载的时候引入的文件最多3个
        automaticNameDelimiter: "~", //缓存组和生成文件名称之间的连接符
        name: true, //缓存组里面的filename生效，覆盖默认命名
        cacheGroups: {
            //缓存组，将所有加载模块放在缓存里面一起分割打包
            vendors: {
                //自定义打包模块
                test: /[\\/]node_modules[\\/]/,
                priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
                name: "vendors.js",
            }
        },
    });
  },
  //  webpack插件配置
  configureWebpack: (config) => {
    let plugins = [
        // 打包忽略console
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "./static"),
                to: path.resolve(__dirname, "./dist/static"),
                ignore: [".*"],
            },
        ]),
    ];
    if (process.env.NODE_ENV !== "development") {
        config.plugins = [...config.plugins, ...plugins];
        // config.externals = {
        //     vue: "Vue",
        //     "vue-router": "VueRouter",
        //     vuex: "Vuex",
        //     axios: "axios"
        // };
    }
  }
};
