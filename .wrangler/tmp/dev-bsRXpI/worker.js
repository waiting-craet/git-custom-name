var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var worker_default = {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    if (path === "/") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u5C0F\u9AD8\u535A\u5BA2</title>
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
    <!-- \u5BFC\u822A\u680F -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">\u5C0F\u9AD8\u535A\u5BA2</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="/">\u9996\u9875</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">\u5206\u7C7B</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">\u5173\u4E8E\u6211\u4EEC</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">\u8054\u7CFB\u6211\u4EEC</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">\u767B\u5F55</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">\u6CE8\u518C</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- \u4E3B\u8981\u5185\u5BB9 -->
    <div class="container mt-4">
        <div class="row">
            <!-- \u5DE6\u4FA7\u5185\u5BB9 -->
            <div class="col-lg-8">
                <!-- \u6587\u7AE0\u5361\u7247 -->
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">\u6B22\u8FCE\u6765\u5230\u5C0F\u9AD8\u535A\u5BA2</h5>
                        <p class="card-text">\u8FD9\u662F\u5C0F\u9AD8\u535A\u5BA2\u7684\u9996\u9875\u3002\u5728\u8FD9\u91CC\uFF0C\u60A8\u53EF\u4EE5\u5206\u4EAB\u60A8\u7684\u6280\u672F\u5FC3\u5F97\u548C\u751F\u6D3B\u611F\u609F\u3002</p>
                        <p class="post-meta">
                            <small>\u53D1\u5E03\u4E8E 2023-12-07 | \u5206\u7C7B: \u6280\u672F | \u9605\u8BFB: 100 | \u70B9\u8D5E: 10</small>
                        </p>
                        <div class="mb-2">
                            <span class="tag">Flask</span>
                            <span class="tag">Python</span>
                            <span class="tag">Web\u5F00\u53D1</span>
                        </div>
                        <a href="#" class="btn btn-primary">\u9605\u8BFB\u5168\u6587</a>
                    </div>
                </div>

                <!-- \u6587\u7AE0\u5361\u7247 -->
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Flask\u5165\u95E8\u6559\u7A0B</h5>
                        <p class="card-text">Flask\u662F\u4E00\u4E2A\u8F7B\u91CF\u7EA7\u7684Python Web\u6846\u67B6\uFF0C\u975E\u5E38\u9002\u5408\u5F00\u53D1\u5C0F\u578B\u5E94\u7528\u548CAPI\u3002\u672C\u6587\u5C06\u4ECB\u7ECDFlask\u7684\u57FA\u672C\u7528\u6CD5\u3002</p>
                        <p class="post-meta">
                            <small>\u53D1\u5E03\u4E8E 2023-12-06 | \u5206\u7C7B: \u6280\u672F | \u9605\u8BFB: 200 | \u70B9\u8D5E: 20</small>
                        </p>
                        <div class="mb-2">
                            <span class="tag">Flask</span>
                            <span class="tag">Python</span>
                            <span class="tag">\u6559\u7A0B</span>
                        </div>
                        <a href="#" class="btn btn-primary">\u9605\u8BFB\u5168\u6587</a>
                    </div>
                </div>

                <!-- \u5206\u9875 -->
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">\u4E0A\u4E00\u9875</a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">\u4E0B\u4E00\u9875</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <!-- \u53F3\u4FA7\u8FB9\u680F -->
            <div class="col-lg-4">
                <div class="sidebar mb-4">
                    <h5>\u70ED\u95E8\u6587\u7AE0</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a href="#">Flask\u5165\u95E8\u6559\u7A0B</a>
                            <small class="text-muted d-block">\u9605\u8BFB: 200</small>
                        </li>
                        <li class="mb-2">
                            <a href="#">Python\u6570\u636E\u5206\u6790</a>
                            <small class="text-muted d-block">\u9605\u8BFB: 150</small>
                        </li>
                        <li class="mb-2">
                            <a href="#">Web\u5F00\u53D1\u6700\u4F73\u5B9E\u8DF5</a>
                            <small class="text-muted d-block">\u9605\u8BFB: 120</small>
                        </li>
                    </ul>
                </div>

                <div class="sidebar mb-4">
                    <h5>\u5206\u7C7B</h5>
                    <ul class="list-unstyled">
                        <li><a href="#">\u6280\u672F (5)</a></li>
                        <li><a href="#">\u751F\u6D3B (3)</a></li>
                        <li><a href="#">\u5B66\u4E60 (2)</a></li>
                        <li><a href="#">\u5DE5\u4F5C (1)</a></li>
                    </ul>
                </div>

                <div class="sidebar mb-4">
                    <h5>\u6807\u7B7E</h5>
                    <div>
                        <span class="tag">Flask</span>
                        <span class="tag">Python</span>
                        <span class="tag">Web\u5F00\u53D1</span>
                        <span class="tag">\u6570\u636E\u5206\u6790</span>
                        <span class="tag">\u6559\u7A0B</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- \u9875\u811A -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>\u5C0F\u9AD8\u535A\u5BA2</h5>
                    <p>\u5206\u4EAB\u6280\u672F\u5FC3\u5F97\uFF0C\u8BB0\u5F55\u751F\u6D3B\u70B9\u6EF4</p>
                </div>
                <div class="col-md-6">
                    <h5>\u8054\u7CFB\u6211\u4EEC</h5>
                    <p>\u90AE\u7BB1: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 \u5C0F\u9AD8\u535A\u5BA2. \u4FDD\u7559\u6240\u6709\u6743\u5229.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"><\/script>
</body>
</html>`;
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    } else if (path === "/categories") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u5206\u7C7B - \u5C0F\u9AD8\u535A\u5BA2</title>
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
    <!-- \u5BFC\u822A\u680F -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">\u5C0F\u9AD8\u535A\u5BA2</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">\u9996\u9875</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/categories">\u5206\u7C7B</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">\u5173\u4E8E\u6211\u4EEC</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">\u8054\u7CFB\u6211\u4EEC</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">\u767B\u5F55</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">\u6CE8\u518C</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- \u4E3B\u8981\u5185\u5BB9 -->
    <div class="container mt-4">
        <h2 class="mb-4">\u6587\u7AE0\u5206\u7C7B</h2>
        <div class="row">
            <div class="col-md-6 col-lg-4">
                <div class="card category-card">
                    <div class="card-body text-center">
                        <h5 class="card-title">\u6280\u672F</h5>
                        <p class="card-text">\u5171 5 \u7BC7\u6587\u7AE0</p>
                        <a href="#" class="btn btn-primary">\u67E5\u770B\u6587\u7AE0</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card category-card">
                    <div class="card-body text-center">
                        <h5 class="card-title">\u751F\u6D3B</h5>
                        <p class="card-text">\u5171 3 \u7BC7\u6587\u7AE0</p>
                        <a href="#" class="btn btn-primary">\u67E5\u770B\u6587\u7AE0</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card category-card">
                    <div class="card-body text-center">
                        <h5 class="card-title">\u5B66\u4E60</h5>
                        <p class="card-text">\u5171 2 \u7BC7\u6587\u7AE0</p>
                        <a href="#" class="btn btn-primary">\u67E5\u770B\u6587\u7AE0</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card category-card">
                    <div class="card-body text-center">
                        <h5 class="card-title">\u5DE5\u4F5C</h5>
                        <p class="card-text">\u5171 1 \u7BC7\u6587\u7AE0</p>
                        <a href="#" class="btn btn-primary">\u67E5\u770B\u6587\u7AE0</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- \u9875\u811A -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>\u5C0F\u9AD8\u535A\u5BA2</h5>
                    <p>\u5206\u4EAB\u6280\u672F\u5FC3\u5F97\uFF0C\u8BB0\u5F55\u751F\u6D3B\u70B9\u6EF4</p>
                </div>
                <div class="col-md-6">
                    <h5>\u8054\u7CFB\u6211\u4EEC</h5>
                    <p>\u90AE\u7BB1: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 \u5C0F\u9AD8\u535A\u5BA2. \u4FDD\u7559\u6240\u6709\u6743\u5229.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"><\/script>
</body>
</html>`;
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    } else if (path === "/about_us") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u5173\u4E8E\u6211\u4EEC - \u5C0F\u9AD8\u535A\u5BA2</title>
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
    <!-- \u5BFC\u822A\u680F -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">\u5C0F\u9AD8\u535A\u5BA2</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">\u9996\u9875</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">\u5206\u7C7B</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/about_us">\u5173\u4E8E\u6211\u4EEC</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">\u8054\u7CFB\u6211\u4EEC</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">\u767B\u5F55</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">\u6CE8\u518C</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- \u4E3B\u8981\u5185\u5BB9 -->
    <div class="container mt-4">
        <div class="about-section">
            <h2 class="text-center mb-4">\u5173\u4E8E\u5C0F\u9AD8\u535A\u5BA2</h2>
            <p class="lead">\u5C0F\u9AD8\u535A\u5BA2\u662F\u4E00\u4E2A\u4E13\u6CE8\u4E8E\u6280\u672F\u5206\u4EAB\u548C\u4E2A\u4EBA\u6210\u957F\u7684\u5E73\u53F0\uFF0C\u81F4\u529B\u4E8E\u4E3A\u8BFB\u8005\u63D0\u4F9B\u9AD8\u8D28\u91CF\u7684\u6280\u672F\u6587\u7AE0\u548C\u751F\u6D3B\u611F\u609F\u3002</p>
            <p>\u6211\u4EEC\u7684\u56E2\u961F\u7531\u4E00\u7FA4\u70ED\u7231\u6280\u672F\u7684\u5E74\u8F7B\u4EBA\u7EC4\u6210\uFF0C\u6211\u4EEC\u76F8\u4FE1\u6280\u672F\u7684\u529B\u91CF\u53EF\u4EE5\u6539\u53D8\u4E16\u754C\uFF0C\u4E5F\u76F8\u4FE1\u5206\u4EAB\u7684\u4EF7\u503C\u53EF\u4EE5\u8BA9\u77E5\u8BC6\u4F20\u64AD\u5F97\u66F4\u8FDC\u3002</p>
        </div>

        <div class="about-section">
            <h3 class="text-center mb-4">\u6211\u4EEC\u7684\u4F7F\u547D</h3>
            <p>\u901A\u8FC7\u5206\u4EAB\u6280\u672F\u77E5\u8BC6\u548C\u751F\u6D3B\u7ECF\u9A8C\uFF0C\u5E2E\u52A9\u66F4\u591A\u4EBA\u6210\u957F\uFF0C\u5171\u540C\u8FDB\u6B65\u3002</p>
        </div>

        <div class="about-section">
            <h3 class="text-center mb-4">\u56E2\u961F\u6210\u5458</h3>
            <div class="row">
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="https://picsum.photos/seed/member1/150/150.jpg" alt="\u56E2\u961F\u6210\u54581">
                        <h5>\u5C0F\u9AD8</h5>
                        <p>\u521B\u59CB\u4EBA & \u6280\u672F\u603B\u76D1</p>
                        <p>\u4E13\u6CE8\u4E8EWeb\u5F00\u53D1\u548C\u4E91\u8BA1\u7B97\u6280\u672F</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="https://picsum.photos/seed/member2/150/150.jpg" alt="\u56E2\u961F\u6210\u54582">
                        <h5>\u5C0F\u660E</h5>
                        <p>\u5185\u5BB9\u7F16\u8F91</p>
                        <p>\u8D1F\u8D23\u5185\u5BB9\u7B56\u5212\u548C\u7F16\u8F91\u5DE5\u4F5C</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="https://picsum.photos/seed/member3/150/150.jpg" alt="\u56E2\u961F\u6210\u54583">
                        <h5>\u5C0F\u7EA2</h5>
                        <p>UI\u8BBE\u8BA1\u5E08</p>
                        <p>\u8D1F\u8D23\u7F51\u7AD9\u8BBE\u8BA1\u548C\u7528\u6237\u4F53\u9A8C</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- \u9875\u811A -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>\u5C0F\u9AD8\u535A\u5BA2</h5>
                    <p>\u5206\u4EAB\u6280\u672F\u5FC3\u5F97\uFF0C\u8BB0\u5F55\u751F\u6D3B\u70B9\u6EF4</p>
                </div>
                <div class="col-md-6">
                    <h5>\u8054\u7CFB\u6211\u4EEC</h5>
                    <p>\u90AE\u7BB1: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 \u5C0F\u9AD8\u535A\u5BA2. \u4FDD\u7559\u6240\u6709\u6743\u5229.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"><\/script>
</body>
</html>`;
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    } else if (path === "/contact") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u8054\u7CFB\u6211\u4EEC - \u5C0F\u9AD8\u535A\u5BA2</title>
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
    <!-- \u5BFC\u822A\u680F -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">\u5C0F\u9AD8\u535A\u5BA2</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">\u9996\u9875</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">\u5206\u7C7B</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">\u5173\u4E8E\u6211\u4EEC</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/contact">\u8054\u7CFB\u6211\u4EEC</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">\u767B\u5F55</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">\u6CE8\u518C</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- \u4E3B\u8981\u5185\u5BB9 -->
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <div class="contact-section">
                    <h2 class="mb-4">\u8054\u7CFB\u6211\u4EEC</h2>
                    <p>\u5982\u679C\u60A8\u6709\u4EFB\u4F55\u95EE\u9898\u6216\u5EFA\u8BAE\uFF0C\u6B22\u8FCE\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u8054\u7CFB\u6211\u4EEC\uFF1A</p>
                    
                    <div class="contact-info">
                        <h5><i>\u{1F4E7}</i> \u7535\u5B50\u90AE\u7BB1</h5>
                        <p>admin@example.com</p>
                    </div>
                    
                    <div class="contact-info">
                        <h5><i>\u{1F4F1}</i> \u8054\u7CFB\u7535\u8BDD</h5>
                        <p>+86 123 4567 8900</p>
                    </div>
                    
                    <div class="contact-info">
                        <h5><i>\u{1F4CD}</i> \u5730\u5740</h5>
                        <p>\u4E2D\u56FD \u5317\u4EAC\u5E02 \u671D\u9633\u533A</p>
                    </div>
                    
                    <div class="contact-info">
                        <h5><i>\u{1F550}</i> \u5DE5\u4F5C\u65F6\u95F4</h5>
                        <p>\u5468\u4E00\u81F3\u5468\u4E94: 9:00 - 18:00</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="contact-section">
                    <h3 class="mb-4">\u53D1\u9001\u6D88\u606F</h3>
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">\u59D3\u540D</label>
                            <input type="text" class="form-control" id="name" placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u59D3\u540D">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">\u7535\u5B50\u90AE\u7BB1</label>
                            <input type="email" class="form-control" id="email" placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u7535\u5B50\u90AE\u7BB1">
                        </div>
                        <div class="mb-3">
                            <label for="subject" class="form-label">\u4E3B\u9898</label>
                            <input type="text" class="form-control" id="subject" placeholder="\u8BF7\u8F93\u5165\u6D88\u606F\u4E3B\u9898">
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">\u6D88\u606F\u5185\u5BB9</label>
                            <textarea class="form-control" id="message" rows="5" placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u6D88\u606F\u5185\u5BB9"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">\u53D1\u9001\u6D88\u606F</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- \u9875\u811A -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>\u5C0F\u9AD8\u535A\u5BA2</h5>
                    <p>\u5206\u4EAB\u6280\u672F\u5FC3\u5F97\uFF0C\u8BB0\u5F55\u751F\u6D3B\u70B9\u6EF4</p>
                </div>
                <div class="col-md-6">
                    <h5>\u8054\u7CFB\u6211\u4EEC</h5>
                    <p>\u90AE\u7BB1: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 \u5C0F\u9AD8\u535A\u5BA2. \u4FDD\u7559\u6240\u6709\u6743\u5229.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"><\/script>
</body>
</html>`;
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    } else if (path === "/login") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u767B\u5F55 - \u5C0F\u9AD8\u535A\u5BA2</title>
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
    <!-- \u5BFC\u822A\u680F -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">\u5C0F\u9AD8\u535A\u5BA2</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">\u9996\u9875</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">\u5206\u7C7B</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">\u5173\u4E8E\u6211\u4EEC</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">\u8054\u7CFB\u6211\u4EEC</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="/login">\u767B\u5F55</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">\u6CE8\u518C</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- \u4E3B\u8981\u5185\u5BB9 -->
    <div class="login-container">
        <div class="login-form">
            <h2 class="text-center mb-4">\u7528\u6237\u767B\u5F55</h2>
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">\u7528\u6237\u540D</label>
                    <input type="text" class="form-control" id="username" placeholder="\u8BF7\u8F93\u5165\u7528\u6237\u540D">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">\u5BC6\u7801</label>
                    <input type="password" class="form-control" id="password" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember">
                    <label class="form-check-label" for="remember">\u8BB0\u4F4F\u6211</label>
                </div>
                <button type="submit" class="btn btn-primary w-100 mb-3">\u767B\u5F55</button>
                <div class="text-center">
                    <p>\u8FD8\u6CA1\u6709\u8D26\u53F7\uFF1F <a href="/register">\u7ACB\u5373\u6CE8\u518C</a></p>
                </div>
            </form>
        </div>
    </div>

    <!-- \u9875\u811A -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>\u5C0F\u9AD8\u535A\u5BA2</h5>
                    <p>\u5206\u4EAB\u6280\u672F\u5FC3\u5F97\uFF0C\u8BB0\u5F55\u751F\u6D3B\u70B9\u6EF4</p>
                </div>
                <div class="col-md-6">
                    <h5>\u8054\u7CFB\u6211\u4EEC</h5>
                    <p>\u90AE\u7BB1: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 \u5C0F\u9AD8\u535A\u5BA2. \u4FDD\u7559\u6240\u6709\u6743\u5229.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"><\/script>
</body>
</html>`;
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    } else if (path === "/register") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u6CE8\u518C - \u5C0F\u9AD8\u535A\u5BA2</title>
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
    <!-- \u5BFC\u822A\u680F -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/">\u5C0F\u9AD8\u535A\u5BA2</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">\u9996\u9875</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">\u5206\u7C7B</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about_us">\u5173\u4E8E\u6211\u4EEC</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">\u8054\u7CFB\u6211\u4EEC</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">\u767B\u5F55</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/register">\u6CE8\u518C</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- \u4E3B\u8981\u5185\u5BB9 -->
    <div class="register-container">
        <div class="register-form">
            <h2 class="text-center mb-4">\u7528\u6237\u6CE8\u518C</h2>
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">\u7528\u6237\u540D</label>
                    <input type="text" class="form-control" id="username" placeholder="\u8BF7\u8F93\u5165\u7528\u6237\u540D">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">\u7535\u5B50\u90AE\u7BB1</label>
                    <input type="email" class="form-control" id="email" placeholder="\u8BF7\u8F93\u5165\u7535\u5B50\u90AE\u7BB1">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">\u5BC6\u7801</label>
                    <input type="password" class="form-control" id="password" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801">
                </div>
                <div class="mb-3">
                    <label for="confirm-password" class="form-label">\u786E\u8BA4\u5BC6\u7801</label>
                    <input type="password" class="form-control" id="confirm-password" placeholder="\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="agree">
                    <label class="form-check-label" for="agree">\u6211\u540C\u610F<a href="#">\u7528\u6237\u534F\u8BAE</a>\u548C<a href="#">\u9690\u79C1\u653F\u7B56</a></label>
                </div>
                <button type="submit" class="btn btn-primary w-100 mb-3">\u6CE8\u518C</button>
                <div class="text-center">
                    <p>\u5DF2\u6709\u8D26\u53F7\uFF1F <a href="/login">\u7ACB\u5373\u767B\u5F55</a></p>
                </div>
            </form>
        </div>
    </div>

    <!-- \u9875\u811A -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>\u5C0F\u9AD8\u535A\u5BA2</h5>
                    <p>\u5206\u4EAB\u6280\u672F\u5FC3\u5F97\uFF0C\u8BB0\u5F55\u751F\u6D3B\u70B9\u6EF4</p>
                </div>
                <div class="col-md-6">
                    <h5>\u8054\u7CFB\u6211\u4EEC</h5>
                    <p>\u90AE\u7BB1: admin@example.com</p>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p>&copy; 2023 \u5C0F\u9AD8\u535A\u5BA2. \u4FDD\u7559\u6240\u6709\u6743\u5229.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"><\/script>
</body>
</html>`;
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    } else if (path.match(/^\/api\/user\/(\w+)$/)) {
      const name = path.split("/")[3];
      return new Response(JSON.stringify({
        name,
        message: "Hello from Cloudflare Workers!",
        status: "success"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else if (path === "/api/posts" && method === "POST") {
      const data = await request.json();
      return new Response(JSON.stringify({
        received: data,
        code: 201
      }), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response("404 Not Found", { status: 404 });
    }
  }
};

// ../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-J45ruw/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-J45ruw/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
