import axios from "axios";

export const endpoints = {
    "role": "/role/",
    "user": "/user/",
    "groups": "/groups/",
    "group": (groupId) => `/groups/${groupId}`,
    "projects": "/projects/",
    "project": (projectId) => `/projects/${projectId}/`,
    "meetings": "/meetings/",
    "incomes": "/incomes/",
    "spendings": "/spendings/",
    "limit_rules": "/limit_rules/"
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})