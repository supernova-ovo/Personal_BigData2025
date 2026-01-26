
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

const generateInspiringMessage = async (userData: AnnualReportData): Promise<string> => {
  try {
    const response = await fetch(WORKFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workflow_id: WORKFLOW_ID,
        inputs: {
          userData: JSON.stringify(userData)
        },
        query: "Generate Annual Report Summary",
        stream: true,
        conversation_id: "",
        files: [],
        http_method: "POST"
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const text = await response.text();

    if (text.includes('data:')) {
      const lines = text.split('\n');
      let resultText = '';
      for (const line of lines) {
        if (line.startsWith('data:')) {
          try {
            const jsonStr = line.replace('data:', '').trim();
            if (jsonStr === '[DONE]') continue;
            const json = JSON.parse(jsonStr);
            // 流式传输的常见 Dify 字段
            if (json.answer) resultText += json.answer;
            else if (json.data && json.data.text) resultText += json.data.text;
            else if (json.data && json.data.outputs && json.data.outputs.text) resultText = json.data.outputs.text; // 工作流完成输出
          } catch (e) {
            // 忽略 keep-alive 或格式错误行的解析错误
          }
        }
      }
      if (resultText) return resultText;
    }

    // 回退：如果未找到 SSE 结构或解析失败但存在文本，则返回原始文本
    return text || "这一年你付出了惊人的努力，数据见证了你的成长与坚韧。愿你的未来如星辰般璀璨！";

  } catch (error) {
    console.error("Error generating message:", error);
    return "你的辛勤耕耘铸就了我们今年的辉煌。数据无言，却震耳欲聋。";
  }
};

export { generateInspiringMessage };