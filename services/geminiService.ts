
import { AnnualReportData } from "../types";

const generateInspiringMessage = async (userData: AnnualReportData): Promise<string> => {
  try {
    const response = await fetch('DifyWorkflowHandler.ashx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workflow_id: '22C0866A-3BCB-844B-B503-EEDC4663F738',
        inputs: userData,
        query: "Generate Annual Report Summary",
        stream: true,
        conversation_id: "", // 此函数中无会话 ID 上下文
        files: [],
        http_method: "POST"
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    // 处理响应。假设 stream: true 返回 SSE 或文本流。
    // 为了简化该返回 Promise<string> 的函数，我们倾向于获取完整的文本。
    // 我们将读取流直至完成。
    const text = await response.text();

    // 尝试解析是否为 SSE 格式，以便在需要时提取实际消息。
    // Dify SSE 通常格式：data: {"event": "text_chunk", "data":{ "text": "..."}}
    // 或 data: {"event": "workflow_finished", "data": {"outputs": {"output": "..."}}}
    // 检查响应是类 JSON 还是原始文本。
    // 鉴于可变性，如果看起来像 SSE，我们将尝试清理它，否则按原样返回。

    // 简单的启发式方法：如果包含 "data:"，尝试提取有用部分。
    if (text.includes('data:')) {
      // 从 JSON 行中提取所有 "text" 或 "answer" 字段
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