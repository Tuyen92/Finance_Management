from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from . import views

r = routers.DefaultRouter()
r.register('user', views.UserViewSet)
r.register('register', views.UserViewSetCreate)
r.register('income', views.IncomeViewSetCreate)
r.register('incomes', views.IncomeViewSetGet)
r.register('spending', views.SpendingViewSetCreate)
r.register('spendings', views.SpendingViewSetGet)
r.register('group', views.GroupViewSetCreate)
r.register('limit_rule', views.LimitRuleViewSetCreate)
r.register('limit_rules', views.LimitRuleViewSetGet)
r.register('groups', views.GroupViewSetGet)
r.register('project', views.ProjectViewSetCreate)
r.register('projects', views.ProjectViewSetGet)
r.register('meeting', views.MeetingScheduleViewSetCreate)
r.register('meetings', views.MeetingScheduleViewSetGet)
r.register('vote', views.VoteViewSet)
r.register('statistic/group', views.GroupStatisticViewSet)
r.register('statistic/project', views.ProjectStatisticViewSet)


urlpatterns = [
    path('', include(r.urls))
]