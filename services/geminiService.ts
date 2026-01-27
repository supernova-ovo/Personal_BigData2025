
import { AnnualReportData } from "../types";

// 检测是否为生产环境
const isProduction = import.meta.env.MODE === 'production';

// 生产环境配置
const PROD_WORKFLOW_API_URL = '/jetopcms/KS/DifyWorkflowHandler.ashx';
const PROD_WORKFLOW_ID = '22C0866A-3BCB-844B-B503-EEDC4663F738';

// 测试环境配置
const TEST_WORKFLOW_API_URL = 'https://test1.tepc.cn/jetopcms/KS/DifyWorkflowHandler.ashx';
const TEST_WORKFLOW_ID = '90d04f00-8296-8b0e-fc94-f6a2ed0a6105';

// 根据环境自动选择配置
const WORKFLOW_API_URL = isProduction ? PROD_WORKFLOW_API_URL : TEST_WORKFLOW_API_URL;
const WORKFLOW_ID = isProduction ? PROD_WORKFLOW_ID : TEST_WORKFLOW_ID;

/**
 * 移除文本中的 <think>...</think> 标签及其内容
 * 只保留最终的结语部分
 */
const removeThinkTags = (text: string): string => {
  if (!text) return text;
  
  // 使用正则表达式匹配 <think>...</think> 标签（包括多行内容）
  // 使用 [\s\S]*? 来匹配包括换行符在内的任意字符（非贪婪模式）
  const thinkTagPattern = /<think>[\s\S]*?<\/think>/gi;
  
  let cleanedText = text.replace(thinkTagPattern, '');
  
  // 清理可能残留的空白字符
  cleanedText = cleanedText.trim();
  
  // 如果移除后文本为空，返回原始文本（可能是格式不同）
  if (!cleanedText && text.trim()) {
    return text.trim();
  }
  
  return cleanedText;
};

const generateInspiringMessage = async (userData: AnnualReportData): Promise<string> => {
  try {
    const requestPayload = {
      workflow_id: WORKFLOW_ID,
      inputs: {
        userData: JSON.stringify(userData)
      },
      query: "Generate Annual Report Summary",
      stream: true,
      conversation_id: "",
      files: [],
      http_method: "POST"
    };

    const response = await fetch(WORKFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      console.error('AI服务请求失败:', response.status, response.statusText);
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const text = await response.text();

    if (text.includes('data:')) {
      const lines = text.split('\n');
      let resultText = '';
      let hasCompleteOutput = false;

      for (const line of lines) {
        if (line.startsWith('data:')) {
          try {
            const jsonStr = line.replace('data:', '').trim();

            if (jsonStr === '[DONE]') {
              continue;
            }

            const json = JSON.parse(jsonStr);

            // 流式传输的常见 Dify 字段
            // 优先级：完整输出 > 增量文本
            if (json.data && json.data.outputs && json.data.outputs.text) {
              const completeOutput = json.data.outputs.text;
              if (!hasCompleteOutput) {
                resultText = completeOutput;
                hasCompleteOutput = true;
              }
            } else if (!hasCompleteOutput) {
              // 只有在没有完整输出时才处理增量文本
              if (json.answer) {
                resultText += json.answer;
              } else if (json.data && json.data.text) {
                resultText += json.data.text;
              }
            }
          } catch (e) {
            // 静默跳过解析错误（通常是keep-alive或格式错误行）
          }
        }
      }

      if (resultText && resultText.trim()) {
        const cleanedResult = removeThinkTags(resultText.trim());
        return cleanedResult;
      }
    }

    // 回退：如果未找到 SSE 结构或解析失败但存在文本，则返回原始文本
    const rawFallbackText = (text && text.trim()) || "这一年你付出了惊人的努力，数据见证了你的成长与坚韧。愿你的未来如星辰般璀璨！";
    const fallbackText = removeThinkTags(rawFallbackText);
    return fallbackText;

  } catch (error) {
    console.error("AI服务调用失败:", error instanceof Error ? error.message : 'Unknown error');
    return "你的辛勤耕耘铸就了我们今年的辉煌。数据无言，却震耳欲聋。";
  }
};

export { generateInspiringMessage };