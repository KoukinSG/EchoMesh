import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import ChatPage from './views/ChatPage.vue';

const routes = [
    {path: '/', component: LoginPage},
    {path: '/chat', component: ChatPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;  // 确保这里有 `export default`