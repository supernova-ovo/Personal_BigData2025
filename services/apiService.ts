import { AnnualReportData } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class ApiService {
  async getUserSummary(): Promise<ApiResponse<AnnualReportData>> {
    try {
      console.log('Making API request to:', 'https://test1.tepc.cn/jetopcms/KS/sectionHandler.ashx');

      const requestBody = {
        "id": "017d373c-4f50-3467-7353-5d6747b282b8"
      };

      console.log('Request body:', requestBody);

      // 使用与jQuery $.ajax 完全相同的请求方式
      const formData = new URLSearchParams();
      formData.append('id', requestBody.id);

      console.log('Form data:', formData.toString());

      const response = await fetch('https://test1.tepc.cn/jetopcms/KS/sectionHandler.ashx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-JetopDebug-User': '3FF0773D01A515D92C4AFFA3DD49EA88228E8C8E2D35E99AE116DE2413A8772A08061620225C1C2DBDF49D3CB79DAECACCBA4D1C97A726EF36FB0B0F2E739BD99A3C1B3B73B1CE5C36CD6967328C6F7AB2CD186B2F6A9FE112E0C79B3980ED7169BABDC39744AB7A2FF1FBAA5B415D04A28031072E874673B109343A9B630453C6AEE7780DB5D3946B08A2B40AE64F62ED2E9CC4CD787310',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData.toString()
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // 检查响应状态
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      // 获取响应内容类型
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      const responseText = await response.text();
      console.log('Raw response text (first 500 chars):', responseText.substring(0, 500));
      console.log('Full response text length:', responseText.length);

      // 检查是否是JSON格式
      if (contentType && contentType.includes('application/json')) {
        try {
          let data = JSON.parse(responseText);
          console.log('Parsed JSON data:', data);
          console.log('Data type:', typeof data);
          console.log('Is Array:', Array.isArray(data));

          // 如果返回的是数组，取第一个元素
          if (Array.isArray(data) && data.length > 0) {
            console.log('Taking first element from array');
            data = data[0];
            console.log('Data after taking first element:', data);
          }

          // 检查关键字段是否存在
          console.log('API Data Field Check:', {
            XingMing: data.XingMing,
            GangWei: data.GangWei,
            GongHao: data.GongHao,
            NianFen: data.NianFen,
            BiYeYX: data.BiYeYX,
            ZaiGangZSC: data.ZaiGangZSC,
            DengLuCS: data.DengLuCS,
            Apm: data.Apm
          });

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
          console.log('Parsed JSON data (no content-type):', data);
          console.log('Data type (no content-type):', typeof data);
          console.log('Is Array (no content-type):', Array.isArray(data));

          // 如果返回的是数组，取第一个元素
          if (Array.isArray(data) && data.length > 0) {
            console.log('Taking first element from array (no content-type)');
            data = data[0];
            console.log('Data after taking first element (no content-type):', data);
          }

          // 检查关键字段是否存在
          console.log('API Data Field Check (no content-type):', {
            XingMing: data.XingMing,
            GangWei: data.GangWei,
            GongHao: data.GongHao,
            NianFen: data.NianFen,
            BiYeYX: data.BiYeYX,
            ZaiGangZSC: data.ZaiGangZSC,
            DengLuCS: data.DengLuCS,
            Apm: data.Apm
          });

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