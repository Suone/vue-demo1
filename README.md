
### 更新格式
```
npm run lint
```

### 平时操作
```
git clone git@code.aliyun.com:hzdamei-assets/nb-zero_vue.git
git pull
git add .
git commit -m "v1.0.0 update 修复备注"
git push -u origin master
```

## 修改bug后提交并合并到当前dev
```
// 后台
mkdir console/dev
cd console/dev
git clone -b console/dev git@code.aliyun.com:hzdamei-assets/nb-zero_vue.git
git checkout console/dev
git pull
git add .
git commit -m "console/dev 修复了xxbug"
git push origin -f console/dev

//前台
mkdir front/dev
cd front/dev
git clone -b front/dev git@code.aliyun.com:hzdamei-assets/nb-zero_vue.git
git checkout front/dev
git pull
git add .
git commit -m "front/dev 修复了xxbug"
git push origin -f front/dev
```

## 上线版本
```
npm run build

// 后台
git tag -d console/1.0.0
git push origin :refs/tags/console/1.0.0
git tag -a console/1.0.0 -m "console/1.0.0 update 上线测试"
git add .
git commit -m "console/1.0.0 update 上线测试"
git push origin -f console/1.0.0

//前台
git tag -d front/1.0.0
git push origin :refs/tags/front/1.0.0
git tag -a front/1.0.0 -m "front/1.0.0 update 上线测试"
git add .
git commit -m "front/1.0.0 update 上线测试"
git push origin -f front/1.0.0
```

## 上线后发布
```
// 后台
git tag -d console/master
git push origin :refs/tags/console/master
git tag -a console/master -m "console/master update 正式发布"
git add .
git commit -m "console/master update 正式发布"
git push origin -f console/master

//前台
git tag -d front/master
git push origin :refs/tags/front/master
git tag -a front/master -m "front/master update 正式发布"
git add .
git commit -m "front/master update 正式发布"
git push origin -f front/master
```
