#!/usr/bin/env python3
"""
获取Cloudflare Pages项目URL的指南
"""

import webbrowser
import os

def main():
    print("🔍 获取Cloudflare Pages项目URL指南")
    print("=" * 50)
    
    print("\n📋 步骤1: 登录Cloudflare Dashboard")
    print("1. 访问 https://dash.cloudflare.com")
    print("2. 使用您的Cloudflare账号登录")
    
    print("\n📋 步骤2: 找到您的Pages项目")
    print("1. 在左侧菜单中点击 'Pages'")
    print("2. 找到您的项目列表")
    print("3. 点击您的项目名称")
    
    print("\n📋 步骤3: 获取项目URL")
    print("1. 在项目概览页面，查找 'Pages domain' 或 'Custom domains'")
    print("2. 复制显示的URL（格式通常是：your-project-name.pages.dev）")
    print("3. 这是您应该访问的正确URL")
    
    print("\n📋 步骤4: 验证部署")
    print("1. 使用获取的URL访问您的应用")
    print("2. 如果仍然出现404，请检查以下几点：")
    print("   - 确认代码已正确部署")
    print("   - 检查函数日志是否有错误")
    print("   - 确认路由配置是否正确")
    
    print("\n📋 步骤5: 如果问题仍然存在")
    print("1. 尝试重新部署项目")
    print("2. 检查wrangler.toml配置是否正确")
    print("3. 确认pages/functions/[[path]].py文件存在且正确")
    
    print("\n📋 常见问题")
    print("- 问题: 访问four-a7g.pages.dev出现404")
    print("  解决: 这可能不是您的项目URL，请按照上述步骤获取正确的URL")
    print("- 问题: 找不到项目")
    print("  解决: 您可能需要创建一个新的Pages项目")
    
    # 尝试打开Cloudflare Dashboard
    try:
        print("\n🌐 是否要打开Cloudflare Dashboard? (y/n)")
        choice = input().strip().lower()
        if choice == 'y':
            webbrowser.open("https://dash.cloudflare.com")
            print("✅ 已在浏览器中打开Cloudflare Dashboard")
    except:
        print("\n❌ 无法自动打开浏览器，请手动访问 https://dash.cloudflare.com")
    
    print("\n✅ 指南结束，希望这能帮助您解决问题！")

if __name__ == "__main__":
    main()