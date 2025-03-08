export async function getUserData() {
    const response = await fetch('/users.json');
    return response.json();
}

export async function getChatAssistants() {
    return [
        { id: 1, name: 'AI 助手 1' },
        { id: 2, name: 'AI 助手 2' }
    ];
}

export async function getChatHistory(assistantId) {
    return [
        { id: 101, assistantId, message: '你好！', time: '10:00' },
        { id: 102, assistantId, message: '今天天气怎么样？', time: '10:05' }
    ];
}

export function getChatWindowUrl(assistantId) {
    return `https://example.com/chat/${assistantId}`;
}