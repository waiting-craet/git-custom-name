// worker.js（纯JS版，无任何Python依赖）
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // 首页 - 返回博客UI
    if (path === "/") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>小高博客</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Microsoft YaHei', sans-serif;
            background-color: #f8f9fa;
        }
        .navbar {
            background-color: #343a40;
        }
        .card {
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .footer {
            background-color: #343a40;
            color: white;
            padding: 20px 0;
            margin-top: 40px;
        }
        .sidebar {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
        }
        .post-meta {
            color: #6c757d;
            font-size: 0.9rem;
        }
        .tag {
            display: inline-block;
            background-color: #e9ecef;
            color: #495057;
            padding: 0.25rem 0.5rem;
            margin-right: 0.25rem;
            margin-bottom: 0.25rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
        }
    </style>
</head>
<body>
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">小高博客</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="/">首页</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">分类</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">关于我们</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">联系我们</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">注册</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- 主要内容 -->
    <div class="container mt-4">
        <div class="row">
            <!-- 左侧内容 -->
            <div class="col-lg-8">
                <!-- 文章卡片 -->
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">欢迎来到小高博客</h5>
                        <p class="card-text">这是小高博客的首页。在这里，您可以分享您的技术心得和生活感悟。</p>
                        <p class="post-meta">
                            <small>发布于 2023-12-07 | 分类: 技术 | 阅读: 100 | 点赞: 10</small>
                        </p>
                        <div class="mb-2">
                            <span class="tag">Flask</span>
                            <span class="tag">Python</span>
                            <span class="tag">Web开发</span>
                        </div>
                        <a href="#" class="btn btn-primary">阅读全文</a>
                    </div>
                </div>

                <!-- 文章卡片 -->
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Flask入门教程</h5>
                        <p class="card-text">Flask是一个轻量级的Python Web框架，非常适合开发小型应用和API。本文将介绍Flask的基本用法。</p>
                        <p class="post-meta">
                            <small>发布于 2023-12-06 | 分类: 技术 | 阅读: 200 | 点赞: 20</small>
                        </p>
                        <div class="mb-2">
                            <span class="tag">Flask</span>
                            <span class="tag">Python</span>
                            <span class="tag">教程</span>
                        </div>
                        <a href="#" class="btn btn-primary">阅读全文</a>
                    </div>
                </div>

                <!-- 分页 -->
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">上一页</a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">下一页</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <!-- 右侧边栏 -->
            <div class="col-lg-4">
                <div class="sidebar mb-4">
                    <h5>热门文章</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a href="#">Flask入门教程</a>
                            <small class="text-muted d-block">阅读: 200</small>
                        </li>
                        <li class="mb-2">
                            <a href="#">Python数据分析</a>
                            <small class="text-muted d-block">阅读: 150</small>
                        </li>
                        <li class="mb-2">
                            <a href="#">Web开发最佳实践</a>
                            <small class="text-muted d-block">阅读: 120</small>
                        </li>
                    </ul>
                </div>

                <div class="sidebar mb-4">
                    <h5>分类</h5>
                    <ul class="list-unstyled">
                        <li><a href="#">技术 (5)</a></li>
                        <li><a href="#">生活 (3)</a></li>
                        <li><a href="#">学习 (2)</a></li>
                        <li><a href="#">工作 (1)</a></li>
                    </ul>
                </div>

                <div class="sidebar mb-4">
                    <h5>标签</h5>
                    <div>
                        <span class="tag">Flask</span>
                        <span class="tag">Python</span>
                        <span class="tag">Web开发</span>
                        <span class="tag">数据分析</span>
                        <span class="tag">教程</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>小高博客</h5>
                    <p>分享技术心得，记录生活点滴</p>
                </div>
                <div class="col-md-6">
                    <h5>联系我们</h5>
                    <p>邮箱: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 小高博客. 保留所有权利.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
      
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    }
    // 分类页面
    else if (path === "/categories") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>分类 - 小高博客</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Microsoft YaHei', sans-serif;
            background-color: #f8f9fa;
        }
        .navbar {
            background-color: #343a40;
        }
        .footer {
            background-color: #343a40;
            color: white;
            padding: 20px 0;
            margin-top: 40px;
        }
        .category-card {
            transition: transform 0.3s;
            margin-bottom: 20px;
        }
        .category-card:hover {
            transform: translateY(-5px);
        }
    </style>
</head>
<body>
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">小高博客</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">首页</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/categories">分类</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">关于我们</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">联系我们</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">注册</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- 主要内容 -->
    <div class="container mt-4">
        <h2 class="mb-4">文章分类</h2>
        <div class="row">
            <div class="col-md-6 col-lg-4">
                <div class="card category-card">
                    <div class="card-body text-center">
                        <h5 class="card-title">技术</h5>
                        <p class="card-text">共 5 篇文章</p>
                        <a href="#" class="btn btn-primary">查看文章</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card category-card">
                    <div class="card-body text-center">
                        <h5 class="card-title">生活</h5>
                        <p class="card-text">共 3 篇文章</p>
                        <a href="#" class="btn btn-primary">查看文章</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card category-card">
                    <div class="card-body text-center">
                        <h5 class="card-title">学习</h5>
                        <p class="card-text">共 2 篇文章</p>
                        <a href="#" class="btn btn-primary">查看文章</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card category-card">
                    <div class="card-body text-center">
                        <h5 class="card-title">工作</h5>
                        <p class="card-text">共 1 篇文章</p>
                        <a href="#" class="btn btn-primary">查看文章</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>小高博客</h5>
                    <p>分享技术心得，记录生活点滴</p>
                </div>
                <div class="col-md-6">
                    <h5>联系我们</h5>
                    <p>邮箱: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 小高博客. 保留所有权利.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
      
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    }
    // 关于我们页面
    else if (path === "/about_us") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>关于我们 - 小高博客</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Microsoft YaHei', sans-serif;
            background-color: #f8f9fa;
        }
        .navbar {
            background-color: #343a40;
        }
        .footer {
            background-color: #343a40;
            color: white;
            padding: 20px 0;
            margin-top: 40px;
        }
        .about-section {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            padding: 30px;
            margin-bottom: 30px;
        }
        .team-member {
            text-align: center;
            margin-bottom: 30px;
        }
        .team-member img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">小高博客</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">首页</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">分类</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/about_us">关于我们</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">联系我们</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">注册</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- 主要内容 -->
    <div class="container mt-4">
        <div class="about-section">
            <h2 class="text-center mb-4">关于小高博客</h2>
            <p class="lead">小高博客是一个专注于技术分享和个人成长的平台，致力于为读者提供高质量的技术文章和生活感悟。</p>
            <p>我们的团队由一群热爱技术的年轻人组成，我们相信技术的力量可以改变世界，也相信分享的价值可以让知识传播得更远。</p>
        </div>

        <div class="about-section">
            <h3 class="text-center mb-4">我们的使命</h3>
            <p>通过分享技术知识和生活经验，帮助更多人成长，共同进步。</p>
        </div>

        <div class="about-section">
            <h3 class="text-center mb-4">团队成员</h3>
            <div class="row">
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="https://picsum.photos/seed/member1/150/150.jpg" alt="团队成员1">
                        <h5>小高</h5>
                        <p>创始人 & 技术总监</p>
                        <p>专注于Web开发和云计算技术</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="https://picsum.photos/seed/member2/150/150.jpg" alt="团队成员2">
                        <h5>小明</h5>
                        <p>内容编辑</p>
                        <p>负责内容策划和编辑工作</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="https://picsum.photos/seed/member3/150/150.jpg" alt="团队成员3">
                        <h5>小红</h5>
                        <p>UI设计师</p>
                        <p>负责网站设计和用户体验</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>小高博客</h5>
                    <p>分享技术心得，记录生活点滴</p>
                </div>
                <div class="col-md-6">
                    <h5>联系我们</h5>
                    <p>邮箱: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 小高博客. 保留所有权利.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
      
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    }
    // 联系我们页面
    else if (path === "/contact") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>联系我们 - 小高博客</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Microsoft YaHei', sans-serif;
            background-color: #f8f9fa;
        }
        .navbar {
            background-color: #343a40;
        }
        .footer {
            background-color: #343a40;
            color: white;
            padding: 20px 0;
            margin-top: 40px;
        }
        .contact-section {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            padding: 30px;
            margin-bottom: 30px;
        }
        .contact-info {
            margin-bottom: 20px;
        }
        .contact-info i {
            margin-right: 10px;
            color: #343a40;
        }
    </style>
</head>
<body>
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">小高博客</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">首页</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">分类</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">关于我们</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/contact">联系我们</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">注册</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- 主要内容 -->
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <div class="contact-section">
                    <h2 class="mb-4">联系我们</h2>
                    <p>如果您有任何问题或建议，欢迎通过以下方式联系我们：</p>
                    
                    <div class="contact-info">
                        <h5><i>📧</i> 电子邮箱</h5>
                        <p>admin@example.com</p>
                    </div>
                    
                    <div class="contact-info">
                        <h5><i>📱</i> 联系电话</h5>
                        <p>+86 123 4567 8900</p>
                    </div>
                    
                    <div class="contact-info">
                        <h5><i>📍</i> 地址</h5>
                        <p>中国 北京市 朝阳区</p>
                    </div>
                    
                    <div class="contact-info">
                        <h5><i>🕐</i> 工作时间</h5>
                        <p>周一至周五: 9:00 - 18:00</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="contact-section">
                    <h3 class="mb-4">发送消息</h3>
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">姓名</label>
                            <input type="text" class="form-control" id="name" placeholder="请输入您的姓名">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">电子邮箱</label>
                            <input type="email" class="form-control" id="email" placeholder="请输入您的电子邮箱">
                        </div>
                        <div class="mb-3">
                            <label for="subject" class="form-label">主题</label>
                            <input type="text" class="form-control" id="subject" placeholder="请输入消息主题">
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">消息内容</label>
                            <textarea class="form-control" id="message" rows="5" placeholder="请输入您的消息内容"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">发送消息</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>小高博客</h5>
                    <p>分享技术心得，记录生活点滴</p>
                </div>
                <div class="col-md-6">
                    <h5>联系我们</h5>
                    <p>邮箱: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 小高博客. 保留所有权利.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
      
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    }
    // 登录页面
    else if (path === "/login") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录 - 小高博客</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Microsoft YaHei', sans-serif;
            background-color: #f8f9fa;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .navbar {
            background-color: #343a40;
        }
        .footer {
            background-color: #343a40;
            color: white;
            padding: 20px 0;
            margin-top: auto;
        }
        .login-container {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-form {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            padding: 30px;
            width: 100%;
            max-width: 400px;
        }
    </style>
</head>
<body>
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">小高博客</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">首页</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">分类</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">关于我们</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">联系我们</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="/login">登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">注册</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- 主要内容 -->
    <div class="login-container">
        <div class="login-form">
            <h2 class="text-center mb-4">用户登录</h2>
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">用户名</label>
                    <input type="text" class="form-control" id="username" placeholder="请输入用户名">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">密码</label>
                    <input type="password" class="form-control" id="password" placeholder="请输入密码">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember">
                    <label class="form-check-label" for="remember">记住我</label>
                </div>
                <button type="submit" class="btn btn-primary w-100 mb-3">登录</button>
                <div class="text-center">
                    <p>还没有账号？ <a href="/register">立即注册</a></p>
                </div>
            </form>
        </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>小高博客</h5>
                    <p>分享技术心得，记录生活点滴</p>
                </div>
                <div class="col-md-6">
                    <h5>联系我们</h5>
                    <p>邮箱: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 小高博客. 保留所有权利.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
      
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    }
    // 注册页面
    else if (path === "/register") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>注册 - 小高博客</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Microsoft YaHei', sans-serif;
            background-color: #f8f9fa;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .navbar {
            background-color: #343a40;
        }
        .footer {
            background-color: #343a40;
            color: white;
            padding: 20px 0;
            margin-top: auto;
        }
        .register-container {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .register-form {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            padding: 30px;
            width: 100%;
            max-width: 500px;
        }
    </style>
</head>
<body>
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">小高博客</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">首页</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">分类</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">关于我们</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">联系我们</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/register">注册</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- 主要内容 -->
    <div class="register-container">
        <div class="register-form">
            <h2 class="text-center mb-4">用户注册</h2>
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">用户名</label>
                    <input type="text" class="form-control" id="username" placeholder="请输入用户名">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">电子邮箱</label>
                    <input type="email" class="form-control" id="email" placeholder="请输入电子邮箱">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">密码</label>
                    <input type="password" class="form-control" id="password" placeholder="请输入密码">
                </div>
                <div class="mb-3">
                    <label for="confirm-password" class="form-label">确认密码</label>
                    <input type="password" class="form-control" id="confirm-password" placeholder="请再次输入密码">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="agree">
                    <label class="form-check-label" for="agree">我同意<a href="#">用户协议</a>和<a href="#">隐私政策</a></label>
                </div>
                <button type="submit" class="btn btn-primary w-100 mb-3">注册</button>
                <div class="text-center">
                    <p>已有账号？ <a href="/login">立即登录</a></p>
                </div>
            </form>
        </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>小高博客</h5>
                    <p>分享技术心得，记录生活点滴</p>
                </div>
                <div class="col-md-6">
                    <h5>联系我们</h5>
                    <p>邮箱: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 小高博客. 保留所有权利.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
      
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    }
    // 模拟/api/user/<name>路由
    else if (path.match(/^\/api\/user\/(\w+)$/)) {
      const name = path.split("/")[3];
      return new Response(JSON.stringify({
        name: name,
        message: "Hello from Cloudflare Workers!",
        status: "success"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    // 模拟POST请求
    else if (path === "/api/posts" && method === "POST") {
      const data = await request.json();
      return new Response(JSON.stringify({
        received: data,
        code: 201
      }), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    }
    // 404处理
    else {
      return new Response("404 Not Found", { status: 404 });
    }
  }
};