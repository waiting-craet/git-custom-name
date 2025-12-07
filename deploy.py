#!/usr/bin/env python3
"""
部署脚本：将 Flask 应用部署到 Cloudflare Pages
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
    print("🚀 开始部署 Flask 应用到 Cloudflare Pages")
    
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
    print("\n📝 部署后注意事项:")
    print("1. 在 Cloudflare Dashboard 中配置环境变量 (SECRET_KEY, DATABASE_URL)")
    print("2. 如果使用数据库，请配置 Cloudflare D1 或其他云数据库")
    print("3. 确保静态文件路径正确")

if __name__ == "__main__":
    main()