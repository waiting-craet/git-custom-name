// Cloudflare Pages Functions 入口文件
// 这个文件将处理所有传入的请求并转发给Flask应用

import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      );
    }
    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
});

async function handleEvent(event) {
  const url = new URL(event.request.url);
  const path = url.pathname;
  
  // 处理静态资源请求
  if (path.startsWith('/static/') || path.endsWith('.css') || path.endsWith('.js') || path.endsWith('.jpg') || path.endsWith('.png')) {
    try {
      return await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/static${req.url.replace(new URL(req.url).origin, '')}`, req),
      });
    } catch (e) {
      // 如果找不到静态资源，返回404
    }
  }
  
  // 处理API请求
  if (path.startsWith('/api/')) {
    // 这里可以添加API处理逻辑
    return new Response(JSON.stringify({ message: 'API endpoint' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // 对于其他所有请求，返回index.html（SPA模式）
  try {
    const page = await getAssetFromKV(event, {
      mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
    });
    return page;
  } catch (e) {
    // 如果找不到index.html，尝试获取根路径
    try {
      return await getAssetFromKV(event);
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  }
}