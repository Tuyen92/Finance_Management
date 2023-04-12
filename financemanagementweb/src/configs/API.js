import axios from "axios";

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
    "meeting": "/meeting/"
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})