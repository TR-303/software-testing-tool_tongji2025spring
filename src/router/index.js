import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/main/Home.vue';
import Triangle from "../views/practice/Triangle.vue";
import WhiteBox from "../views/practice/WhiteBox.vue";
import TeleFee from "../views/practice/TeleFee.vue";
import Calender from "@/views/practice/Calender.vue";
import BackendTests from "@/views/project/BackendTests.vue";

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
                component: Calender
            },
            {
                path: "whitebox",
                name: "白盒测试",
                component: WhiteBox
            },
            {
                path: "telefee",
                name: "电信收费",
                component: TeleFee
            },
        ]
    },
    {
        path: "/project",
        name: "项目测试",
        children: [
            {
                path: "unit",
                name: "单元测试",
                component: BackendTests
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;