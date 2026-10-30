# PubMed Evidence Agent · GitHub Pages 静态作品集

## 这是什么

这是基于 PubMed Evidence Agent V1.4.0 已保存的 **2026-10-30 真实历史检索**整理的公开展示站。采用纯 HTML / CSS / JavaScript，不需要 Node、Python、API Key、数据库或服务器。可以托管在 GitHub Pages，也可以放在 Cloudflare Pages 或 Vercel。

**这不是原 Streamlit 程序的在线部署。** 本站不会发起 PubMed 搜索、不会调用通义千问，也不能为用户生成新科研报告。交互只限浏览、筛选、搜索、展开已归档的文献及下载已保存的历史报告。

## 公开演示数据（引文为简短摘录）

- 疾病：塑形性支气管炎；候选因素：低氧血症。
- 运行日期：2026-10-30（北京时间）。
- 去重 50 篇文献；47 篇完成 AI 判读。
- 分类：临床描述 12；结局不匹配 15；证据不明确 20；无摘要未判读 3。
- 自动直接关联 0，不等于医学上无关联。中文疾病名与英文结局匹配存在已知保守漏报，应人工查看 39192444 与 41073163 等原文。
- 116 项自动化回归测试通过，指原 Python V1.4.0 的历史验收记录，**不是**本静态网页 116 项测试。

## 文件

```text
index.html                 展示页（内嵌50条归档文献数据）
styles.css                 样式
app.js                     搜索、分类筛选、文献详情展开
favicon.svg                纯矢量图标
case-replay-report.md      可公开分享的短引文摘录版 Markdown（原始报告不随包上传）
.nojekyll                  关闭 Jekyll 处理
README.md                  此说明
```

## 本地预览

直接双击 `index.html` 即可打开（无跨域 fetch，归档数据内嵌）。也可以在文件夹里使用 `python -m http.server 8000`，访问 `http://127.0.0.1:8000`。

## 发布到 GitHub Pages

1. 在 GitHub 网站新建 **公开** repository，例如 `pubmed-evidence-agent-demo`。不要勾选初始化 README（也可以勾选，上传时覆盖同名 README 即可）。
2. 将**此文件夹里的内容**上传到仓库根目录，注意必须在根目录看到 `index.html`，不能多包一层文件夹。
3. 打开仓库 **Settings → Pages → Build and deployment**：Source 选 `Deploy from a branch`，Branch 选 `main`，Folder 选 `/(root)`，保存。
4. 访问 `https://<GitHub用户名>.github.io/pubmed-evidence-agent-demo/`（实际地址以仓库页面提示为准）。
5. 在电脑之外的设备打开网址，验证筛选、PMID 跳转、两份 Markdown 下载正常。

**不用把你真实的 Python 项目文件夹直接上传为公开仓库。** 原项目包含 Git 历史、验收材料、备份，公开之前需单独审查。这里是完全独立的展示包，建议使用全新仓库。原始完整 live_report.md 和开发日志不随公开包发布。

## 搜索引擎与隐私

- 页面提供 HTML 标题、描述和可搜索的正文，公开后有被 Google/Bing 收录的可能，但不保证收录或排名。
- 建议把这个页面链接写到求职简历、GitHub Profile README 等入口，而不是依赖搜索排名。
- 本站不包含 API Key、不运行服务端、不主动收集用户填写的信息，也不接入第三方统计代码。
- 不是医学诊疗服务；论文结论需要由研究者核验全文。

## 版本说明

- Python V1.4.0 `main` 本地发布 SHA：`6ce62938ff47ba38b5738e211d25e429ce063852`（由项目发布者提供，非本站 Git 历史）。
- 本站为独立静态作品集首版，不代表原 Python 核心代码已经发布至 GitHub。
