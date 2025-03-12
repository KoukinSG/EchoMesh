// API配置
const API_CONFIG = {
  1: {
    type: 'ragflow',
    baseUrl: 'YOUR_RAGFLOW_BASE_URL',      // RAGFlow服务器地址
    chatId: 'YOUR_RAGFLOW_CHAT_ID_1',      // 第一个RAGFlow聊天ID
    apiKey: 'YOUR_RAGFLOW_API_KEY'         // RAGFlow API密钥
  },
  2: {
    type: 'ragflow',
    baseUrl: 'YOUR_RAGFLOW_BASE_URL',      // RAGFlow服务器地址
    chatId: 'YOUR_RAGFLOW_CHAT_ID_2',      // 第二个RAGFlow聊天ID
    apiKey: 'YOUR_RAGFLOW_API_KEY'         // RAGFlow API密钥
  },
  3: {
    type: 'openwebui',
    baseUrl: 'YOUR_OPENWEBUI_BASE_URL',    // OpenWebUI服务器地址
    apiKey: 'YOUR_OPENWEBUI_API_KEY'       // OpenWebUI API密钥
  }
};

export async function getUserData() {
    const response = await fetch('/users.json');
    return response.json();
}

export async function getChatAssistants() {
    return [
        { 
          id: 1, 
          name: '知识库助手1',
          description: '基于RAGFlow的知识库问答助手'
        },
        { 
          id: 2, 
          name: '知识库助手2',
          description: '基于RAGFlow的知识库问答助手'
        },
        { 
          id: 3, 
          name: 'AI助手',
          description: '基于OpenWebUI的通用AI助手'
        }
    ];
}

export async function getChatHistory(assistantId) {
    return [
        { id: 101, assistantId, message: '你好！', time: '10:00' },
        { id: 102, assistantId, message: '今天天气怎么样？', time: '10:05' }
    ];
}

async function sendMessageToRagflow(config, message) {
    const response = await fetch(`${config.baseUrl}/chat/${config.chatId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            message: message,
            stream: false  // 不使用流式响应
        })
    });

    if (!response.ok) {
        throw new Error('RAGFlow API请求失败');
    }

    const data = await response.json();
    return data.answer;
}

async function sendMessageToOpenwebui(config, message) {
    const response = await fetch(`${config.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            messages: [
                { role: "user", content: message }
            ],
            stream: false
        })
    });

    if (!response.ok) {
        throw new Error('OpenWebUI API请求失败');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

export async function sendMessageToAssistant(assistantId, message) {
    const config = API_CONFIG[assistantId];
    if (!config) {
        throw new Error('未找到对应助手的API配置');
    }

    try {
        let response;
        if (config.type === 'ragflow') {
            response = await sendMessageToRagflow(config, message);
        } else if (config.type === 'openwebui') {
            response = await sendMessageToOpenwebui(config, message);
        } else {
            throw new Error('未知的API类型');
        }

        return {
            id: Date.now(),
            role: 'assistant',
            content: response,
            timestamp: new Date()
        };
    } catch (error) {
        console.error('发送消息失败:', error);
        throw error;
    }
}