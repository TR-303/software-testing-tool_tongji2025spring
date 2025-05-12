import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/main/Home.vue';
import Triangle from "../views/practice/Triangle.vue";


const routes = [
    {
        path: "/",
        name: "主页",
        component: Home,
    },
    {
        path: "/practice",
        name: "课程练习",
        children: [
            {
                path: "triangle",
                name: "判断三角形类型",
                component: Triangle
            },
            {
                path: "calender",
                name: "万年历问题",
                component: null
            }
        ]
    },
    {
        path: "/project",
        name: "项目测试",
        children: []
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;