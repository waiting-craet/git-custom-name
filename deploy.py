#!/usr/bin/env python3
"""
部署脚本：将 Flask 应用部署到 Cloudflare Pages (新版本适配)
"""

import os
import sys
import subprocess

def run_command(command, description):
    """运行命令并处理错误"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description}成功")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description}失败: {e.stderr}")
        return False

def main():
    print("🚀 开始部署 Flask 应用到 Cloudflare Pages (新版本)")
    
    # 检查项目结构
    print("\n📋 检查项目结构...")
    required_dirs = ["pages", "pages/functions"]
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            print(f"❌ 缺少必需目录: {dir_path}")
            sys.exit(1)
    
    # 检查必需文件
    required_files = [
        "pages/functions/[[path]].py",
        "requirements.txt",
        "wrangler.toml",
        "pages/functions/_routes.json"
    ]
    for file_path in required_files:
        if not os.path.exists(file_path):
            print(f"❌ 缺少必需文件: {file_path}")
            sys.exit(1)
    
    print("✅ 项目结构检查通过")
    
    # 检查是否已安装 wrangler
    if not run_command("npx wrangler --version", "检查 Wrangler 是否已安装"):
        print("❌ 请先安装 Node.js 和 npm")
        sys.exit(1)
    
    # 检查是否已登录 Cloudflare
    if not run_command("npx wrangler whoami", "检查 Cloudflare 登录状态"):
        print("\n请先登录 Cloudflare:")
        print("npx wrangler auth login")
        sys.exit(1)
    
    # 部署到 Cloudflare Pages
    if not run_command("npx wrangler pages deploy", "部署到 Cloudflare Pages"):
        print("\n❌ 部署失败，请检查错误信息")
        sys.exit(1)
    
    print("\n🎉 部署成功！")
    print("\n📝 新版本部署后注意事项:")
    print("1. 在 Cloudflare Dashboard 中配置环境变量:")
    print("   - SECRET_KEY: Flask 应用密钥")
    print("   - PYTHON_VERSION: 3.11 (已通过 wrangler.toml 配置)")
    print("   - CF_PAGES: 1 (已通过 wrangler.toml 配置)")
    print("2. 新版本不支持本地数据库，建议使用 Cloudflare D1/KV/Redis")
    print("3. 构建命令已配置为: pip install -r requirements.txt --target .python_packages && cp -r .python_packages/* .")
    print("4. 输出目录设置为: pages (包含 functions 目录)")
    print("5. 框架预设设置为: None (禁用自动框架检测)")
    print("6. 路由优先级已设置为: functions/* 优先于 static/*")

if __name__ == "__main__":
    main()