import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './', // 使用相对路径，这样资源会相对于HTML文件位置加载
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        // 🎯 核心配置：代理 DifyWorkflowHandler.ashx API 请求
        '/DifyWorkflowHandler.ashx': {
          // ⚠️ 注意：这里填写你后端真实的运行地址和端口
          target: 'https://test1.tepc.cn',
          changeOrigin: true, // 允许跨域，修改 Host 头
          secure: false,      // 如果后端是 https 自签名证书，设为 false 避免报错
        },
        // 🎯 额外配置：代理 jetopcms API 请求（如果需要）
        '/jetopcms': {
          target: 'https://test1.tepc.cn',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
