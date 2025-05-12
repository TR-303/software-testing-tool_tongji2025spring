import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/main/Home.vue';
import TriangleCode from "../views/practice/triangle/TriangleCode.vue";
import TriangleTest from "../views/practice/triangle/TriangleTest.vue";


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
                redirect: "/practice/triangle/code",
                children: [
                    {
                        path: "code",
                        name: "triangleCode",
                        component: TriangleCode,
                    },
                    {
                        path: "test",
                        name: "triangleTest",
                        component: TriangleTest,
                    }
                ],
            },
            {
                path: "calender",
                name: "万年历问题",
                redirect: "/practice/calender/code",
                children: [
                    {
                        path: "code",
                        name: "calenderCode",
                        component: null,
                    },
                    {
                        path: "test",
                        name: "calenderTest",
                        component: null,
                    }
                ]
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