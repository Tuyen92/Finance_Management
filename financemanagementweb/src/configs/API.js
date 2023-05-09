import axios from "axios";
import * as cookie from 'react-cookies';

export const endpoints = {
    "users": "/user/",
    "groups": "/groups/",
    "group": (groupId) => `/groups/${groupId}/`,
    "new_group": "/group/",
    "projects": "/projects/",
    "project": (projectId) => `/projects/${projectId}/`,
    "new_project": "/project/",
    "incomes": "/incomes/",
    "income": (incomeId) => `/incomes/${incomeId}/`,
    "new_income": "/income/",
    "spendings": "/spendings/",
    "spending": (spendingId) => `/spendings/${spendingId}/`,
    "new_spending": "/spending/",
    "limit_rules": "/limit_rules/",
    "new_limit_rule": "/limit_rule/",
    "meetings": "/meetings/",
    "meeting": (meetingId) => `/meetings/${meetingId}/`,
    "new_meeting": "/meeting/",
    "vote": "/vote/",
    "login": "/o/token/",
    "current_user": "/user/current_user/",
    "user": (userId) => `/user/${userId}/`, 
    "register": "/register/",
    "change_password": "/user/change_password/",
    "group_statistic": "/statistic/group/",
    "project_statistic": "/statistic/project/",
    "warning": (IdUser) => `/user/${IdUser}/warning/`,
    "choose_lr": "/user/limit_rule/"
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