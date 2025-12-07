-- 创建用户表
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建分类表
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建标签表
CREATE TABLE IF NOT EXISTS tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建文章表
CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    summary VARCHAR(500),
    author_id INTEGER NOT NULL,
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES user (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
);

-- 创建文章标签关联表
CREATE TABLE IF NOT EXISTS post_tag (
    post_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    author_id INTEGER,
    post_id INTEGER NOT NULL,
    parent_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES user (id),
    FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comment (id) ON DELETE CASCADE
);

-- 插入默认分类
INSERT OR IGNORE INTO category (id, name, description) VALUES (1, '技术', '技术相关文章');
INSERT OR IGNORE INTO category (id, name, description) VALUES (2, '生活', '生活随笔');
INSERT OR IGNORE INTO category (id, name, description) VALUES (3, '学习', '学习笔记');

-- 插入默认标签
INSERT OR IGNORE INTO tag (id, name) VALUES (1, 'Flask');
INSERT OR IGNORE INTO tag (id, name) VALUES (2, 'Python');
INSERT OR IGNORE INTO tag (id, name) VALUES (3, 'Web开发');
INSERT OR IGNORE INTO tag (id, name) VALUES (4, '教程');
INSERT OR IGNORE INTO tag (id, name) VALUES (5, '数据分析');

-- 创建默认管理员用户 (密码: admin123)
INSERT OR IGNORE INTO user (id, username, email, password_hash) VALUES (1, 'admin', 'admin@example.com', 'pbkdf2:sha256:260000$salt$hash');

-- 插入示例文章
INSERT OR IGNORE INTO post (id, title, content, summary, author_id, category_id, view_count, like_count) VALUES 
(1, '欢迎来到小高博客', '这是小高博客的首页。在这里，您可以分享您的技术心得和生活感悟。', '小高博客首页', 1, 1, 100, 10),
(2, 'Flask入门教程', 'Flask是一个轻量级的Python Web框架，非常适合开发小型应用和API。本文将介绍Flask的基本用法。', 'Flask入门教程', 1, 1, 200, 20);

-- 关联文章和标签
INSERT OR IGNORE INTO post_tag (post_id, tag_id) VALUES (1, 1), (1, 2), (1, 3);
INSERT OR IGNORE INTO post_tag (post_id, tag_id) VALUES (2, 1), (2, 2), (2, 4);

-- 插入示例评论
INSERT OR IGNORE INTO comment (content, author_id, post_id) VALUES ('很好的文章！', 1, 1);
INSERT OR IGNORE INTO comment (content, '期待更多内容', 1, 1);
INSERT OR IGNORE INTO comment (content, '教程很实用', 1, 2);