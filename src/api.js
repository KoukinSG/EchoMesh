// 使用dotenv库加载环境变量
import dotenv from 'dotenv';
dotenv.config();

// API配置
const API_CONFIG = {
    1: {
        type: 'ragflow',
        baseUrl: process.env.RAGFLOW_BASE_URL_1, // 从环境变量中读取
        chatId: process.env.RAGFLOW_CHAT_ID_1,   // 从环境变量中读取
        apiKey: process.env.RAGFLOW_API_KEY_1    // 从环境变量中读取
    },
    2: {
        type: 'ragflow',
        baseUrl: process.env.RAGFLOW_BASE_URL_2, // 从环境变量中读取
        chatId: process.env.RAGFLOW_CHAT_ID_2,   // 从环境变量中读取
        apiKey: process.env.RAGFLOW_API_KEY_2    // 从环境变量中读取
    },
    3: {
        type: 'openwebui',
        baseUrl: process.env.OPENWEBUI_BASE_URL, // 从环境变量中读取
        apiKey: process.env.OPENWEBUI_API_KEY    // 从环境变量中读取
    }
};

// 获取用户数据
export async function getUserData() {
    const response = await fetch('/users.json'); // 从本地JSON文件获取用户数据
    return response.json();                      // 返回解析后的JSON数据
}

// 获取聊天助手列表
export async function getChatAssistants() {
    return [
        {
            id: 1,
            name: '知识库助手1',                // 助手名称
            description: '基于RAGFlow的知识库问答助手' // 助手描述
        },
        {
            id: 2,
            name: '知识库助手2',                // 助手名称
            description: '基于RAGFlow的知识库问答助手' // 助手描述
        },
        {
            id: 3,
            name: 'AI助手',                    // 助手名称
            description: '基于OpenWebUI的通用AI助手' // 助手描述
        }
    ];
}

// 获取指定助手的聊天记录
export async function getChatHistory(assistantId) {
    return [
        {id: 101, assistantId, message: '你好！', time: '10:00'}, // 聊天记录1
        {id: 102, assistantId, message: '今天天气怎么样？', time: '10:05'} // 聊天记录2
    ];
}

// 发送消息到RAGFlow助手
async function sendMessageToRagflow(config, message) {
    const response = await fetch(`${config.baseUrl}/chat/${config.chatId}/messages`, {
        method: 'POST',                        // 请求方法：POST
        headers: {
            'Content-Type': 'application/json', // 请求头：内容类型
            'Authorization': `Bearer ${config.apiKey}` // 请求头：授权
        },
        body: JSON.stringify({
            message: message,                  // 消息内容
            stream: false                      // 不使用流式响应
        })
    });

    if (!response.ok) {                        // 如果响应不成功
        throw new Error('RAGFlow API请求失败'); // 抛出错误
    }

    const data = await response.json();        // 解析响应数据
    return data.answer;                        // 返回答案
}

// 发送消息到OpenWebUI助手
async function sendMessageToOpenwebui(config, message) {
    const response = await fetch(`${config.baseUrl}/v1/chat/completions`, {
        method: 'POST',                        // 请求方法：POST
        headers: {
            'Content-Type': 'application/json', // 请求头：内容类型
            'Authorization': `Bearer ${config.apiKey}` // 请求头：授权
        },
        body: JSON.stringify({
            messages: [
                {role: "user", content: message} // 消息内容
            ],
            stream: false                      // 不使用流式响应
        })
    });

    if (!response.ok) {                        // 如果响应不成功
        throw new Error('OpenWebUI API请求失败'); // 抛出错误
    }

    const data = await response.json();        // 解析响应数据
    return data.choices[0].message.content;    // 返回答案
}

// 发送消息到指定助手
export async function sendMessageToAssistant(assistantId, message) {
    const config = API_CONFIG[assistantId];    // 获取助手的API配置
    if (!config) {                             // 如果配置不存在
        throw new Error('未找到对应助手的API配置'); // 抛出错误
    }

    try {
        let response;
        if (config.type === 'ragflow') {       // 如果助手类型是RAGFlow
            response = await sendMessageToRagflow(config, message); // 发送消息到RAGFlow助手
        } else if (config.type === 'openwebui') { // 如果助手类型是OpenWebUI
            response = await sendMessageToOpenwebui(config, message); // 发送消息到OpenWebUI助手
        } else {
            throw new Error('未知的API类型');   // 抛出未知类型错误
        }

        return {
            id: Date.now(),                    // 消息ID
            role: 'assistant',                 // 角色：助手
            content: response,                 // 消息内容
            timestamp: new Date()              // 时间戳
        };
    } catch (error) {
        console.error('发送消息失败:', error); // 打印错误信息
        throw error;                           // 抛出错误
    }
}

// 上传图片文件
export async function uploadImage(file) {
    const formData = new FormData();           // 创建FormData对象
    formData.append('image', file);            // 添加图片文件

    const response = await fetch('/upload', {
        method: 'POST',                        // 请求方法：POST
        body: formData                         // 请求体：FormData
    });

    if (!response.ok) {                        // 如果响应不成功
        throw new Error('图片上传失败');         // 抛出错误
    }

    const data = await response.json();        // 解析响应数据
    return data.url;                           // 返回图片URL
}