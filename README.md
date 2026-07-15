<div align="center">

# MianBa · 面霸

**AI 驱动的智能面试助手** — 简历分析 · 模拟面试 · RAG 知识库

[![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-green?logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-336791?logo=postgresql)](https://www.postgresql.org/)

</div>

---

## 项目简介

MianBa 是一个集简历分析、模拟面试和知识库管理于一体的智能面试辅助平台。利用大语言模型（LLM）和向量数据库技术，为求职者和 HR 提供智能化的简历评估和面试练习服务。

核心思路：**用 AI 降低面试准备的门槛**，把简历分析、面试出题、回答评估这些传统上依赖人工经验的事情自动化。

## 系统架构

![](https://oss.javaguide.cn/xingqiu/pratical-project/interview-guide/interview-guide-architecture-diagram.svg)

**异步处理流程**：

简历分析、知识库向量化和面试报告生成采用 Redis Stream 异步处理：

```
上传请求 -> 保存文件 -> 发送消息到 Stream -> 立即返回
                              ↓
                     Consumer 消费消息
                              ↓
                     执行分析/向量化任务
                              ↓
                       更新数据库状态
                              ↓
                     前端轮询获取最新状态
```

状态流转：`PENDING` -> `PROCESSING` -> `COMPLETED` / `FAILED`

## 技术栈

### 后端

| 技术                 | 版本  | 说明                      |
| --------------------- | ----- | ------------------------- |
| Spring Boot           | 4.0   | 应用框架                  |
| Java                  | 21    | 开发语言                  |
| Spring AI             | 2.0   | AI 集成框架               |
| PostgreSQL + pgvector | 14+   | 关系数据库 + 向量存储     |
| Redis                 | 6+    | 缓存 + 消息队列（Stream）|
| Apache Tika           | 2.9.2 | 文档解析                  |
| iText 8               | 8.0.5 | PDF 导出                  |
| MapStruct             | 1.6.3 | 对象映射                  |
| Gradle                | 8.14  | 构建工具                  |

### 前端

| 技术             | 版本  | 说明     |
| ----------------- | ----- | -------- |
| React             | 18.3  | UI 框架  |
| TypeScript        | 5.6   | 开发语言 |
| Vite              | 5.4   | 构建工具 |
| Tailwind CSS      | 4.1   | 样式框架 |
| React Router      | 7.11  | 路由管理 |
| Framer Motion     | 12.23 | 动画库  |
| Recharts          | 3.6   | 图表库  |
| Lucide React      | 0.468 | 图标库  |

## 功能特性

### 简历管理模块

- 多格式支持：PDF、DOCX、DOC、TXT
- 异步简历分析
- 实时显示分析进度（待分析/分析中/已完成/失败）
- 简历分析失败自动重试（最多 3 次）
- 基于内容哈希检测重复
- PDF 简历分析报告导出

### 模拟面试模块

- 基于简历生成个性化面试问题
- 实时问答交互
- 针对面试提供针对性改进建议
- 异步生成模拟面试评估报告
- 展示面试表现趋势
- 面试统计信息
- PDF 报告导出

### 知识库管理模块

- 多格式支持（PDF、DOCX、DOC、TXT、Markdown）
- 文档上传和自动分块
- 异步向量化处理
- RAG 检索增强生成
- 流式响应（SSE）
- 智能问答对话
- 知识库统计信息

### TODO

- [x] 问答助手的 Markdown 展示优化
- [x] 知识库管理页面的知识库下载
- [x] 异步生成模拟面试评估报告
- [x] Docker 快速部署
- [ ] 添加 API 限流保护
- [ ] 前端性能优化（虚拟列表等）
- [ ] 模拟面试增加追问功能
- [ ] 打通模拟面试和知识库

## 项目结构

```
Mianba/
├── app/                              # 后端应用
│   ├── src/main/java/interview/guide/
│   │   ├── App.java                  # 主启动类
│   │   ├── common/                   # 通用模块
│   │   │   ├── config/               # 配置类
│   │   │   ├── exception/            # 异常处理
│   │   │   └── result/               # 统一响应
│   │   ├── infrastructure/           # 基础设施
│   │   │   ├── export/               # PDF 导出
│   │   │   ├── file/                 # 文件处理
│   │   │   ├── redis/                # Redis 服务
│   │   │   └── storage/              # 对象存储
│   │   └── modules/                  # 业务模块
│   │       ├── interview/            # 面试模块
│   │       ├── knowledgebase/        # 知识库模块
│   │       └── resume/               # 简历模块
│   └── src/main/resources/
│       ├── application.yml           # 应用配置
│       └── prompts/                  # AI 提示词模板
│
├── frontend/                         # 前端应用
│   ├── src/
│   │   ├── api/                      # API 接口
│   │   ├── components/               # 公共组件
│   │   ├── pages/                    # 页面组件
│   │   ├── types/                    # 类型定义
│   │   └── utils/                    # 工具函数
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 快速开始

环境要求：

| 依赖              | 版本 | 必需 |
| ----------------- | ---- | ---- |
| JDK               | 21+  | 是   |
| Node.js           | 18+  | 是   |
| PostgreSQL        | 14+  | 是   |
| pgvector 扩展     | -    | 是   |
| Redis             | 6+   | 是   |
| S3 兼容存储       | -    | 是   |

### 克隆项目

```bash
git clone ssh://git@ssh.github.com:443/erencrz/MianBa.git
cd Mianba
```

### 配置数据库

```sql
CREATE DATABASE mianba;
```

### 配置环境变量

```bash
# AI API 密钥（阿里云 DashScope）
export AI_BAILIAN_API_KEY=your_api_key
```

### 启动服务

**后端：**

```bash
./gradlew bootRun
```

后端服务启动于 `http://localhost:8080`

**前端：**

```bash
cd frontend
pnpm install
pnpm dev
```

前端服务启动于 `http://localhost:5173`

## Docker 部署

项目提供了完整的 Docker 支持，可以一键启动所有服务。

### 1. 前置准备

- 安装 [Docker](https://www.docker.com/products/docker-desktop/) 和 Docker Compose
- 申请阿里云百炼 API Key

### 2. 快速启动

```bash
# 编辑 .env 文件，填入 AI 配置
# 必填：AI_BAILIAN_API_KEY=your_key_here

# 构建并启动所有服务
docker-compose up -d --build
```

### 3. 服务访问

| 服务             | 地址                                           | 默认账号     | 默认密码     | 说明                   |
| ---------------- | ---------------------------------------------- | ------------ | ------------ | ---------------------- |
| **前端应用**     | [http://localhost](http://localhost)           | -            | -            | 用户访问入口           |
| **后端 API**     | [http://localhost:8080](http://localhost:8080) | -            | -            | Swagger/接口文档       |
| **MinIO 控制台** | [http://localhost:9001](http://localhost:9001) | `minioadmin` | `minioadmin` | 对象存储管理           |
| **PostgreSQL**   | `localhost:5432`                               | `postgres`   | `password`   | 数据库(包含 pgvector)  |
| **Redis**        | `localhost:6379`                               | -            | -            | 缓存与消息队列         |

### 4. 常用运维命令

```bash
# 查看服务状态
docker-compose ps

# 查看后端日志
docker-compose logs -f app

# 停止并移除所有服务
docker-compose down
```

## 使用场景

| 用户角色        | 使用场景                               |
| --------------- | -------------------------------------- |
| **求职者**      | 上传简历获取分析建议，进行模拟面试练习 |
| **HR/招聘人员** | 批量分析简历，评估候选人能力           |
| **培训机构**    | 提供面试培训服务，管理知识库资源       |

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可

AGPL-3.0 License
