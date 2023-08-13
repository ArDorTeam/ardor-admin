# ardor-admin

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install yarn and tyarn:

```bash
npm install yarn tyarn -g
```

Install `node_modules`:

```bash
tyarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
tyarn start
```

### Build project

```bash
tyarn run build
```

### Check code style

```bash
tyarn run lint
```

You can also use script to auto fix some lint error:

```bash
tyarn run lint:fix
```

### Test code

```bash
tyarn test
```

## More

# build: 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）

# ci: 更改我们的 CI 配置文件和脚本（示例范围：Travis、Circle、BrowserStack、SauceLabs）

# docs: 文档修改

# feat: 一个新的功能

# fix: 一个 bug 修复

# perf: 提升性能的代码修改

# refactor: 既不修复错误也不添加功能的代码更改

# style: 不影响代码含义的更改（空格、格式、缺少分号等）

# test: 添加缺失的测试或更正现有测试

```git commit
提交时加上--no-verify可忽略husky
```

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
