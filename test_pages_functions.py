#!/usr/bin/env python3
"""
测试脚本：验证Cloudflare Pages Functions修复
"""

import sys
import os

# 添加pages/functions目录到Python路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'pages', 'functions'))

def test_import():
    """测试导入是否正常"""
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location(
            "[[path]]", 
            os.path.join(os.path.dirname(__file__), 'pages', 'functions', '[[path]].py')
        )
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        # 检查关键组件是否存在
        assert hasattr(module, 'app'), "Flask app未找到"
        assert hasattr(module, 'on_request'), "on_request函数未找到"
        assert hasattr(module, 'Response'), "Response类未找到"
        
        print("✓ 导入测试通过")
        return True
    except Exception as e:
        print(f"✗ 导入测试失败: {str(e)}")
        return False

def test_routes():
    """测试路由是否正确配置"""
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location(
            "[[path]]", 
            os.path.join(os.path.dirname(__file__), 'pages', 'functions', '[[path]].py')
        )
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        # 检查根路由是否存在
        app = module.app
        root_rule_found = False
        api_rule_found = False
        
        for rule in app.url_map.iter_rules():
            if rule.rule == '/':
                root_rule_found = True
                print(f"✓ 根路由 '/' 找到，端点: {rule.endpoint}")
            if rule.rule == '/api/user/<name>':
                api_rule_found = True
                print(f"✓ API路由 '/api/user/<name>' 找到，端点: {rule.endpoint}")
        
        if not root_rule_found:
            print("✗ 根路由 '/' 未找到")
            return False
        if not api_rule_found:
            print("✗ API路由 '/api/user/<name>' 未找到")
            return False
            
        print("✓ 路由测试通过")
        return True
    except Exception as e:
        print(f"✗ 路由测试失败: {str(e)}")
        return False

def test_response_class():
    """测试Response类是否正确实现"""
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location(
            "[[path]]", 
            os.path.join(os.path.dirname(__file__), 'pages', 'functions', '[[path]].py')
        )
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        Response = module.Response
        
        # 测试Response类的基本功能
        response = Response("Test body", 200, {"Content-Type": "text/plain"})
        
        # 检查属性
        assert response.body == b"Test body", "Response.body不正确"
        assert response.status == 200, "Response.status不正确"
        assert response.headers["Content-Type"] == "text/plain", "Response.headers不正确"
        
        # 测试__call__方法
        def mock_start_response(status, headers):
            assert status == "200 OK", "状态码不正确"
            assert ("Content-Type", "text/plain") in headers, "响应头不正确"
        
        result = response({}, mock_start_response)
        assert result == [b"Test body"], "响应体不正确"
        
        print("✓ Response类测试通过")
        return True
    except Exception as e:
        print(f"✗ Response类测试失败: {str(e)}")
        return False

def main():
    """运行所有测试"""
    print("开始测试Cloudflare Pages Functions修复...")
    
    tests = [
        test_import,
        test_routes,
        test_response_class
    ]
    
    passed = 0
    for test in tests:
        if test():
            passed += 1
        print()
    
    print(f"测试结果: {passed}/{len(tests)} 通过")
    
    if passed == len(tests):
        print("✓ 所有测试通过！代码修复成功。")
        return True
    else:
        print("✗ 部分测试失败，请检查代码。")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)