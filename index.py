import os
from app import app

# Cloudflare Pages 环境变量
if os.environ.get('CLOUDFLARE_ENV') == 'production':
    # 在 Cloudflare Pages 环境中设置配置
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///blog.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 导出应用以供 Cloudflare Pages 使用
app = app.wsgi_app