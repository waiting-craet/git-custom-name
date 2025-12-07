#!/usr/bin/env python3
"""
验证 Cloudflare Pages Functions 修复
"""

import os
import sys

def test_directory_structure():
    """测试目录结构"""
    print("测试目录结构...")
    
    # 检查根目录下是否有 functions 目录
    if not os.path.isdir("functions"):
        print("❌ 错误: 根目录下没有 functions 文件夹")
        return False
    else:
        print("✅ 根目录下存在 functions 文件夹")
    
    # 检查 functions 目录中是否有 [[path]].py 文件
    if not os.path.isfile("functions/[[path]].py"):
        print("❌ 错误: functions 目录中没有 [[path]].py 文件")
        return False
    else:
        print("✅ functions 目录中存在 [[path]].py 文件")
    
    # 检查文件名是否正确（双中括号）
    files = os.listdir("functions")
    path_file = None
    for file in files:
        if file.endswith(".py"):
            path_file = file
            break
    
    if path_file != "[[path]].py":
        print(f"❌ 错误: 文件名不正确，应该是 [[path]].py，实际是 {path_file}")
        return False
    else:
        print("✅ 文件名正确，是 [[path]].py")
    
    return True

def test_function_file():
    """测试函数文件内容"""
    print("\n测试函数文件内容...")
    
    try:
        with open("functions/[[path]].py", "r", encoding="utf-8") as f:
            content = f.read()
        
        # 检查是否有 on_request 函数
        if "def on_request" not in content:
            print("❌ 错误: 没有找到 on_request 函数")
            return False
        else:
            print("✅ 找到 on_request 函数")
        
        # 检查是否有根路由
        if "@app.route('/')" not in content:
            print("❌ 错误: 没有找到根路由")
            return False
        else:
            print("✅ 找到根路由")
        
        # 检查是否有测试API路由
        if "@app.route('/api/test')" not in content:
            print("❌ 错误: 没有找到测试API路由")
            return False
        else:
            print("✅ 找到测试API路由")
        
        # 检查是否有 new_response 函数
        if "def new_response" not in content:
            print("❌ 错误: 没有找到 new_response 函数")
            return False
        else:
            print("✅ 找到 new_response 函数")
        
        return True
    except Exception as e:
        print(f"❌ 错误: 无法读取函数文件: {e}")
        return False

def test_wrangler_config():
    """测试 wrangler.toml 配置"""
    print("\n测试 wrangler.toml 配置...")
    
    if not os.path.isfile("wrangler.toml"):
        print("❌ 错误: 没有 wrangler.toml 文件")
        return False
    
    with open("wrangler.toml", "r", encoding="utf-8") as f:
        content = f.read()
    
    # 检查是否有 pages_build_output_dir
    if "pages_build_output_dir" not in content:
        print("❌ 错误: wrangler.toml 中没有 pages_build_output_dir 配置")
        return False
    else:
        print("✅ wrangler.toml 中有 pages_build_output_dir 配置")
    
    return True

def main():
    print("Cloudflare Pages Functions 修复验证")
    print("=" * 50)
    
    all_tests_passed = True
    
    # 测试目录结构
    if not test_directory_structure():
        all_tests_passed = False
    
    # 测试函数文件
    if not test_function_file():
        all_tests_passed = False
    
    # 测试配置文件
    if not test_wrangler_config():
        all_tests_passed = False
    
    print("\n" + "=" * 50)
    if all_tests_passed:
        print("✅ 所有测试通过! 配置已修复。")
        print("\n下一步:")
        print("1. 提交代码到 Git 仓库")
        print("2. 重新部署到 Cloudflare Pages")
        print("3. 验证部署结果")
        print("\n测试URL:")
        print("- 首页: https://您的域名.pages.dev/")
        print("- API测试: https://您的域名.pages.dev/api/test")
    else:
        print("❌ 部分测试失败，请检查上述错误。")
        sys.exit(1)

if __name__ == "__main__":
    main()