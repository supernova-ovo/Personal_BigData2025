import { AnnualReportData } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class ApiService {
  async getUserSummary(): Promise<ApiResponse<AnnualReportData>> {
    try {
      const requestBody = {
        "id": "017d373c-4f50-3467-7353-5d6747b282b8"
      };

      // 使用与jQuery $.ajax 完全相同的请求方式
      const formData = new URLSearchParams();
      formData.append('id', requestBody.id);

      const response = await fetch('https://test1.tepc.cn/jetopcms/KS/sectionHandler.ashx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-JetopDebug-User': '3FF0773D01A515D92C4AFFA3DD49EA88228E8C8E2D35E99AE116DE2413A8772A08061620225C1C2DBDF49D3CB79DAECACCBA4D1C97A726EF36FB0B0F2E739BD99A3C1B3B73B1CE5C36CD6967328C6F7AB2CD186B2F6A9FE112E0C79B3980ED7169BABDC39744AB7A2FF1FBAA5B415D04A28031072E874673B109343A9B630453C6AEE7780DB5D3946B08A2B40AE64F62ED2E9CC4CD787310',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData.toString()
      });

      // 检查响应状态
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      // 获取响应内容类型
      const contentType = response.headers.get('content-type');
      const responseText = await response.text();

      // 检查是否是JSON格式
      if (contentType && contentType.includes('application/json')) {
        try {
          let data = JSON.parse(responseText);

          // 如果返回的是数组，取第一个元素
          if (Array.isArray(data) && data.length > 0) {
            data = data[0];
          }

          // 如果API直接返回数据对象，包装成我们期望的格式
          return {
            success: true,
            data: data
          };
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError);
          throw new Error(`Invalid JSON response: ${responseText}`);
        }
      } else {
        // 尝试直接解析响应文本为JSON（有些API不设置正确的content-type）
        try {
          let data = JSON.parse(responseText);

          // 如果返回的是数组，取第一个元素
          if (Array.isArray(data) && data.length > 0) {
            data = data[0];
          }

          return {
            success: true,
            data: data
          };
        } catch (fallbackError) {
          console.error('Fallback JSON parse also failed:', fallbackError);
          throw new Error(`Expected JSON but got ${contentType}: ${responseText}`);
        }
      }

    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

export const apiService = new ApiService();