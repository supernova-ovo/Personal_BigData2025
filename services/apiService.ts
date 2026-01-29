import { AnnualReportData } from '../types';
import { mockUserData } from './mockData';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// 检测是否为生产环境
const isProduction = import.meta.env.MODE === 'production';

// 是否使用模拟数据（仅在开发环境有效）
// 设置为 true 时使用本地测试数据，false 时调用真实接口
const USE_MOCK_DATA = !isProduction && true; // 修改这里的 true/false 来切换

// 生产环境配置
const PROD_WORKFLOW_API_URL = '/jetopcms/KS/DifyWorkflowHandler.ashx';
const PROD_WORKFLOW_ID = 'd1258591-3a5f-5dfd-5894-53f183833c6f';

// 测试环境配置
const TEST_WORKFLOW_API_URL = 'https://test1.tepc.cn/jetopcms/KS/DifyWorkflowHandler.ashx';
const TEST_WORKFLOW_ID = 'ef022bb9-3c15-0f71-377e-6ded7af63d15';

// 根据环境自动选择配置
const WORKFLOW_API_URL = isProduction ? PROD_WORKFLOW_API_URL : TEST_WORKFLOW_API_URL;
const WORKFLOW_ID = isProduction ? PROD_WORKFLOW_ID : TEST_WORKFLOW_ID;

class ApiService {
  async getUserSummary(): Promise<ApiResponse<AnnualReportData>> {
    // 如果启用了模拟数据且在开发环境，直接返回测试数据
    if (USE_MOCK_DATA && !isProduction) {
      console.log('🎭 [API Service] 使用模拟数据进行测试');
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        success: true,
        data: mockUserData
      };
    }

    try {
      const requestPayload = {
        workflow_id: WORKFLOW_ID,
        inputs: {},
        query: "Get User Summary",
        stream: false,
        conversation_id: "",
        files: [],
        http_method: "POST"
      };

      // 构建请求头
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      // 只在测试环境添加调试 token
      if (!isProduction) {
        headers['X-JetopDebug-User'] = '3FF0773D01A515D92C4AFFA3DD49EA88228E8C8E2D35E99AE116DE2413A8772A08061620225C1C2DBDF49D3CB79DAECACCBA4D1C97A726EF36FB0B0F2E739BD99A3C1B3B73B1CE5C36CD6967328C6F7AB2CD186B2F6A9FE112E0C79B3980ED7169BABDC39744AB7A2FF1FBAA5B415D04A28031072E874673B109343A9B630453C6AEE7780DB5D3946B08A2B40AE64F62ED2E9CC4CD787310';
      }

      const response = await fetch(WORKFLOW_API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestPayload)
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

      // 解析响应文本为JSON
      let parsedData: any;
      try {
        parsedData = JSON.parse(responseText);
        // 移除原始响应数据日志，避免数据泄露
        // console.log('🔵 [API Service] 原始响应数据:', JSON.stringify(parsedData, null, 2));
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      // 提取 workflow 返回的数据结构
      // Dify 可能自动包装多层，需要递归提取 result
      // 格式1: { data: { outputs: { result: [{ result: [实际数据对象] }] } } }
      // 格式2: { result: [{ result: [实际数据对象] }] }
      // 格式3: { text: "", files: [], json: [{ result: [实际数据对象] }] }
      let resultData: any = null;

      // 递归函数：从嵌套的 result 结构中提取数据
      const extractResultData = (data: any, depth: number = 0): any => {
        // 移除调试日志，避免数据泄露
        // const indent = '  '.repeat(depth);
        // console.log(`${indent}🔍 [提取数据] 深度 ${depth}, 数据类型:`, Array.isArray(data) ? 'Array' : typeof data);

        if (!data || typeof data !== 'object') {
          // console.log(`${indent}❌ [提取数据] 不是对象或为空`);
          return null;
        }

        // 如果直接是数组，检查第一个元素
        if (Array.isArray(data)) {
          // console.log(`${indent}📋 [提取数据] 是数组，长度: ${data.length}`);
          if (data.length > 0) {
            return extractResultData(data[0], depth + 1);
          }
          return null;
        }

        // 如果对象本身看起来像是数据对象（有常见字段），直接返回
        if (data.XingMing || data.GongHao || data.APM !== undefined) {
          // console.log(`${indent}✅ [提取数据] 找到数据对象!`, { XingMing: data.XingMing, GongHao: data.GongHao, APM: data.APM });
          return data;
        }

        // 检查 data.data 字段（新格式：{ data: { outputs: { result: [...] } } }）
        if (data.data && typeof data.data === 'object') {
          // console.log(`${indent}🔎 [提取数据] 找到 data.data 字段`);
          return extractResultData(data.data, depth + 1);
        }

        // 检查 outputs 字段
        if (data.outputs && typeof data.outputs === 'object') {
          // console.log(`${indent}🔎 [提取数据] 找到 outputs 字段`);
          return extractResultData(data.outputs, depth + 1);
        }

        // 如果有 result 字段且是数组
        if (data.result && Array.isArray(data.result) && data.result.length > 0) {
          // console.log(`${indent}🔎 [提取数据] 找到 result 数组，长度: ${data.result.length}`);
          const firstResult = data.result[0];
          // 如果第一个元素还有 result 字段，继续递归
          if (firstResult && firstResult.result && Array.isArray(firstResult.result)) {
            // console.log(`${indent}🔎 [提取数据] result[0] 还有 result 字段，继续递归`);
            return extractResultData(firstResult, depth + 1);
          }
          // 否则返回第一个元素
          // console.log(`${indent}✅ [提取数据] 返回 result[0]`);
          return firstResult;
        }

        // 检查 json 字段（旧格式）
        if (data.json && Array.isArray(data.json) && data.json.length > 0) {
          // console.log(`${indent}🔎 [提取数据] 找到 json 数组`);
          return extractResultData(data.json[0], depth + 1);
        }

        // console.log(`${indent}❌ [提取数据] 未找到有效数据，可用字段:`, Object.keys(data));
        return null;
      };

      // 尝试提取数据
      resultData = extractResultData(parsedData);
      // console.log('🟢 [API Service] 提取后的 resultData:', JSON.stringify(resultData, null, 2));

      // 如果没有找到 result，尝试其他可能的格式
      if (!resultData) {
        // 如果返回的是数组，取第一个元素
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          resultData = parsedData[0];
        }
        // 如果直接是数据对象
        else if (parsedData && typeof parsedData === 'object') {
          resultData = parsedData;
        }
      }

      // 如果仍然没有找到数据，返回错误
      if (!resultData) {
        console.error('Unable to extract data from response:', parsedData);
        throw new Error('无法从响应中提取数据');
      }

      // 字段名映射：将返回数据中的字段名映射为代码中使用的字段名（与类型定义保持一致）
      const fieldMapping: Record<string, string> = {
        'APM': 'Apm',                    // 总操作数
        'APMPX': 'Apmpx',                // 操作数排序
        'examCiShu': 'ExamCiShu',        // 答题次数
        'maxScore': 'MaxScore',          // 最高分
        'timuShu': 'TimuShu',            // 题目数
        'readcnt': 'Readcnt',            // 总阅读数
        'zancnt': 'Zancnt',              // 总点赞数
        'r_rsdt': 'R_rsdt',              // 人事大厅阅读
        'r_zsfx': 'R_zsfx',              // 知识分享阅读
        'r_zt': 'R_zt',                  // 专题阅读
        'r_qt': 'R_qt',                  // 其他阅读
        'n_rsdt': 'N_rsdt',              // 人事大厅点赞
        'n_zsfx': 'N_zsfx',              // 知识分享点赞
        'n_zt': 'N_zt',                  // 专题点赞
        'n_qt': 'N_qt',                  // 其他点赞
        'zuiDuoYW': 'ZuiDuoYW'           // 最常用业务
      };

      // 应用字段名映射
      const mappedData: any = { ...resultData };
      for (const [oldKey, newKey] of Object.entries(fieldMapping)) {
        if (oldKey in mappedData && !(newKey in mappedData)) {
          mappedData[newKey] = mappedData[oldKey];
          // 保留原字段名，以防其他地方使用
        }
      }

      const finalResponse = {
        success: true,
        data: mappedData
      };
      // console.log('✅ [API Service] 最终返回数据:', JSON.stringify(finalResponse, null, 2));

      return finalResponse;

    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: '请先登录以查看数据。', // Simplified user-friendly error message
      };
    }
  }
}

export const apiService = new ApiService();