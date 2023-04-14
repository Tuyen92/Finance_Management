import axios from "axios";
import * as cookie from 'react-cookies';

export const endpoints = {
    "user": "/user/",
    "groups": "/groups/",
    "group": (groupId) => `/groups/${groupId}`,
    "new_group": "/group/",
    "projects": "/projects/",
    "project": (projectId) => `/projects/${projectId}/`,
    "new_project": "/project/",
    "incomes": "/incomes/",
    "income": (incomeId) => `/incomes/${incomeId}`,
    "new_income": "/income/",
    "spendings": "/spendings/",
    "spending": (spendingId) => `/spendings/${spendingId}`,
    "new_spending": "/spending/",
    "limit_rules": "/limit_rules/",
    "meetings": "/meetings/",
    "meeting": (meetingId) => `/meetings/${meetingId}`,
    "new_meeting": "/meeting/",
    "login": "/o/token/",
    "current_user": "/user/current_user/"
}

export const authAPI = () => axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers:{
        "Authorization":`Bearer ${cookie.load("access-token")}`
    }
})

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})