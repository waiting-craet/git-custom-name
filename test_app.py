#!/usr/bin/env python3
"""
测试脚本：验证 Flask 应用是否可以在 Cloudflare Pages 环境中运行
"""

import os
import sys

# 设置 Cloudflare Pages 环境变量
os.environ['CLOUDFLARE_ENV'] = 'production'

try:
    # 导入应用
    from app import app
    
    # 测试应用是否可以创建
    with app.app_context():
        print("✓ Flask 应用创建成功")
        
        # 测试数据库连接
        from app import db
        db.create_all()
        print("✓ 数据库连接成功")
        
        # 测试路由
        with app.test_client() as client:
            response = client.get('/')
            print(f"✓ 首页路由测试成功，状态码: {response.status_code}")
            
            response = client.get('/about_us')
            print(f"✓ 关于我们页面测试成功，状态码: {response.status_code}")
            
            response = client.get('/categories')
            print(f"✓ 分类页面测试成功，状态码: {response.status_code}")
    
    print("\n✅ 所有测试通过！应用已准备好部署到 Cloudflare Pages")
    
except Exception as e:
    print(f"\n❌ 测试失败: {str(e)}")
    sys.exit(1)