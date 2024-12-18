# 隐私政策

最后更新日期：2024-12-13

## 简介
ChatGPT 对话历史记录下载器（以下简称"本扩展程序"）致力于保护您的隐私。本隐私政策详细说明了我们如何收集、使用、存储和保护您的数据。

## 数据收集和使用

### 我们收集的数据
本扩展程序收集以下类型的数据：
1. 网页内容数据：
   - ChatGPT对话内容（仅限chat.openai.com域名）
   - 对话的时间戳
   - 对话的标题信息
   
2. 用户配置数据：
   - 下载格式偏好（如：Markdown、纯文本等）
   - 文件命名格式设置
   - 界面语言偏好
   - 其他用户自定义设置

### 数据收集方式
1. 网页内容数据：
   - 仅在用户主动点击下载按钮时，通过DOM API读取当前页面内容
   - 不会自动收集或持续监控页面内容
   
2. 用户配置数据：
   - 仅在用户主动更改设置时保存
   - 使用Chrome Storage API存储在本地

### 数据使用目的
1. 网页内容数据用于：
   - 生成本地下载文件
   - 格式化对话内容
   - 提供预览功能
   
2. 用户配置数据用于：
   - 保存用户的偏好设置
   - 提供个性化的使用体验
   - 记住用户的格式选择

## 数据处理和存储

### 数据存储位置
- 所有数据严格存储在用户本地设备上
- 使用Chrome Storage API进行安全存储
- 不会将任何数据上传到外部服务器

### 数据保留期限
- 网页内容数据：仅在生成下载文件时临时存在于内存中，完成下载后立即删除
- 用户配置数据：保留至用户手动清除或卸载扩展程序

### 数据访问和控制
用户可以通过以下方式管理其数据：
1. 在扩展程序设置中查看和修改所有配置
2. 使用浏览器的开发者工具查看存储的数据
3. 通过浏览器设置清除扩展程序数据
4. 卸载扩展程序时自动删除所有本地数据

## 数据共享和传输

### 数据共享政策
本扩展程序承诺：
- 不会与任何第三方共享用户数据
- 不会将数据用于商业目的
- 不会出售或出租用户数据
- 不会用于用户画像或行为分析

### 数据传输安全
- 所有数据操作都在用户本地设备上进行
- 不涉及网络传输
- 不使用任何远程服务器或API

## 用户权利和控制

### 用户权利
作为用户，您有权：
1. 访问：查看扩展程序收集的所有数据
2. 修改：更改任何配置设置
3. 删除：清除所有存储的数据
4. 导出：将配置数据导出备份
5. 限制：通过浏览器权限控制扩展程序的访问范围

### 权限说明
本扩展程序请求以下Chrome权限：
1. `activeTab`
   - 用途：读取当前ChatGPT对话内容
   - 触发条件：仅在用户点击下载按钮时
   
2. `storage`
   - 用途：存储用户配置信息
   - 数据类型：扩展程序设置
   
3. `downloads`
   - 用途：保存对话内容到本地文件
   - 触发条件：用户主动下载时
   
4. `host permissions (chat.openai.com)`
   - 用途：在ChatGPT网站上运行扩展功能
   - 限制：仅限指定域名

## 安全措施

### 技术保护措施
1. 数据安全：
   - 使用Chrome安全API进行数据存储
   - 实施内存数据即时清理
   - 采用最小权限原则
   
2. 代码安全：
   - 定期安全审计
   - 开源代码接受社区监督
   - 及时修复安全漏洞

## 合规承诺

本扩展程序严格遵守：
1. Chrome网上应用店开发者计划政策
2. 数据最小化原则
3. 用户隐私保护最佳实践

特别承诺：
- 不会出于已获批准的用途之外的目的向第三方出售或传输用户数据
- 不会为实现与产品单一用途无关的目的而使用或转移用户数据
- 不会为确定信用度或实现贷款而使用或转移用户数据

## 政策更新
- 本隐私政策可能会随时更新
- 重大变更将通过GitHub仓库和Chrome商店通知用户
- 继续使用本扩展程序表示您同意更新后的隐私政策

## 联系方式
如有隐私相关问题或建议，请通过以下方式联系我们：
- GitHub Issues: https://github.com/dongyu19920904/chatgpt-history-downloader/issues
- 电子邮件：[您的联系邮箱]

本隐私政策的最新版本将始终在我们的GitHub仓库中提供。 
