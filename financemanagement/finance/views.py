from datetime import datetime

import requests
from django.db.models.functions import ExtractQuarter
from rest_framework import viewsets, permissions, generics, status, parsers
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.views import Response
from .serializers import *
from .paginators import *
from django.contrib.auth.hashers import make_password


# SPENDING
class SpendingViewSetGet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Spending.objects.all()
    serializer_class = SpendingDetailSerializer
    pagination_class = Paginator

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search by spending's content
            content = self.request.query_params.get("content")
            if content:
                queryset = queryset.filter(content__icontains=content)

            # Filter from amount to amount
            amount_from = self.request.query_params.get("amount_from")
            amount_to = self.request.query_params.get("amount_to")
            if amount_from:
                queryset = queryset.filter(spending_amount__gte=amount_from)
            if amount_to:
                queryset = queryset.filter(spending_amount__lte=amount_to)

            # Filter from day to day
            date_from = self.request.query_params.get("date_from")
            date_to = self.request.query_params.get("date_to")
            if date_from:
                queryset = queryset.filter(implementation_date__gte=date_from)
            if date_to:
                queryset = queryset.filter(implementation_date__lte=date_to)

            # Filter by is accept
            accept = self.request.query_params.get("accept")
            if accept == '1':
                queryset = queryset.filter(is_accept=True)
            if accept == '0':
                queryset = queryset.filter(is_accept=False)

            # Sort by spending amount
            sort = self.request.query_params.get("sort")
            if sort == '1':
                queryset = queryset.order_by('spending_amount')
            if sort == '0':
                queryset = queryset.order_by('-spending_amount')
            return queryset
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Accept one spending
    @action(methods=['put'], detail=True, url_path='accept')
    def accept_spending(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                s = self.get_object()
                if s.is_accept == False:
                    s.is_accept = True
                else:
                    s.is_accept = False
                s.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Edit spending
    @action(methods=['put'], detail=True, url_path='edit')
    def update_spending(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                s = self.get_object()
                for k, v in request.data.items():
                    setattr(s, k, v)
                s.save()
                return Response(SpendingSerializer(s, context={'request': request}).data, status=status.HTTP_200_OK)
            else:
                return  Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Delete spending
    @action(methods=['delete'], detail=True, url_path='delete')
    def delete_spending(self, request, pk):
        try:
            if request.method.__eq__('DELETE'):
                s = self.get_object()
                s.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SpendingViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Spending.objects.all()
    serializer_class = SpendingCreateSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]


# PROJECT
class ProjectViewSetGet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = Paginator

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search by project's name
            name = self.request.query_params.get("name")
            if name:
                queryset = queryset.filter(name_project__icontains=name)

            # Filter by from target to target
            target_from = self.request.query_params.get("target_from")
            target_to = self.request.query_params.get("target_to")
            if target_from:
                queryset = queryset.filter(target__gte=target_from)
            if target_to:
                queryset = queryset.filter(target__lte=target_to)

            # Filter by from day to day
            type = self.request.query_params.get("type")
            date_from = self.request.query_params.get("date_from")
            date_to = self.request.query_params.get("date_to")
            if type == 'start_date':
                if date_from:
                    queryset = queryset.filter(start_date__gte=date_from)
                if date_to:
                    queryset = queryset.filter(start_date_lte=date_to)
            if type == 'end_date':
                if date_from:
                    queryset = queryset.filter(end_date__gte=date_from)
                if date_to:
                    queryset = queryset.filter(end_date_lte=date_to)

            # Search by project month, year
            month = self.request.query_params.get("month")
            year = self.request.query_params.get("year")
            if type == 'start_date':
                if month:
                    queryset = queryset.filter(start_date__month=month)
            if type == 'end_date':
                if year:
                    queryset = queryset.dates(start_date__year=year)

            # Sort by target
            sort = self.request.query_params.get("sort")
            if sort == '1':
                queryset = queryset.order_by('target')
            if sort == '0':
                queryset = queryset.order_by('-target')

            # Filter by is ended project
            ended = self.request.query_params.get("ended")
            if ended == '0':
                queryset = queryset.filter(is_ended=True)
            if ended == '1':
                queryset = queryset.filter(is_ended=False)
            return queryset
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Edit project
    @action(methods=['put'], detail=True, url_path='edit')
    def edit_project(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                p = self.get_object()
                for k, v in request.data.items():
                    setattr(p, k, v)
                p.save()
                return Response(ProjectSerializer(p, context={'request': request}).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Delete project
    @action(methods=['delete'], detail=True, url_path='delete')
    def delete_project(self, request, pk):
        try:
            if request.method.__eq__('DELETE'):
                p = self.get_object()
                p.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Statistic project
    @action(methods=['get'], detail=True, url_path='report')
    def report_project(self, request, pk):
        try:
            if request.method.__eq__('GET'):
                p = self.get_object()
                spending_sum, income_sum = 0, 0
                message = ""
                now = datetime.now()
                if now.date() >= p.end_date.date():
                    if now.time() >= p.end_date.time():
                        message = "Project is overdue!"
                    return Response(message, status=status.HTTP_200_OK)
                else:
                    queryset_spending = Spending.objects.all()
                    queryset_spending = queryset_spending.filter(project_id=pk)
                    queryset_income = Income.objects.all()
                    queryset_income = queryset_income.filter(project_id=pk)
                    for s in queryset_spending:
                        spending_sum = spending_sum + s.spending_amount
                    for i in queryset_income:
                        income_sum = income_sum + i.income_amount
                    p.income_amount = income_sum
                    p.spending_amount = spending_sum
                    p.save()

                    group = Group.objects.get(project_id=p.id)
                    queryset_spending = Spending.objects.all()
                    queryset_income = Income.objects.all()
                    for u in group.users.all():
                        income_user, spending_user = 0, 0
                        percent_spending, percent_income = 0, 0

                        for s in queryset_spending:
                            if s.project_id == p.id:
                                spending_user = spending_user + s.spending_amount
                            if not spending_sum == 0:
                                percent_spending = (spending_user / spending_sum) * 100
                        for i in queryset_income:
                            if i.project_id == p.id:
                                income_user = income_user + i.income_amount
                            if not income_sum == 0:
                                percent_income = (income_user / income_sum) * 100

                        queryset_statistic = ProjectStatistic.objects.all()
                        queryset_statistic = queryset_statistic.filter(project=p.id)
                        queryset_statistic = queryset_statistic.filter(user=u.id)
                        if queryset_statistic:
                            for stt in queryset_statistic:
                                stt.total_income = income_user
                                stt.total_spending = spending_user
                                stt.statistic_date = datetime.now()
                                stt.percent_income = percent_income
                                stt.percent_spending = percent_spending
                                stt.save()
                        else:
                            statistic, _ = ProjectStatistic.objects.get_or_create(total_spending=spending_sum, total_income=income_sum, status=message, project=p, user=u.id,
                                                                                  percent_income=percent_income, percent_spending=percent_spending)
                            # return Response(ProjectStatisticSerializer(statistic, context={'request': request}).data, status=status.HTTP_200_OK)
                    return Response(message, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # End project
    @action(methods=['put'], detail=True, url_path="ended")
    def ended(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                p = self.get_object()
                if p.is_ended == False:
                    p.is_ended = True
                elif p.is_ended == True:
                    p.is_ended = False
                p.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Create project
class ProjectViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]


# Get statistic
class ProjectStatisticViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ProjectStatistic.objects.all()
    serializer_class = ProjectStatisticSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        project_id = self.request.query_params.get("id")
        queryset = queryset.filter(project=project_id)
        return queryset


# GROUP
class GroupViewSetGet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupDetailSerializer
    pagination_class = Paginator

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search by group's name
            name = self.request.query_params.get("name")
            if name:
                queryset = queryset.filter(name__icontains=name)

            # Filter by actived group
            active = self.request.query_params.get("active")
            if active == '1':
                queryset = queryset.filter(is_active=True)
            elif active == '0':
                queryset = queryset.filter(is_active=False)

            # Filter by number of member
            number = self.request.query_params.get("number")
            if number:
                queryset = queryset.filter(number=number)

            # Filter by created date
            created_date = self.request.query_params.get("created_date")
            if created_date:
                queryset = queryset.filter(created_date=created_date)

            # Search by leader id
            leader = self.request.query_params.get("leader")
            if leader:
                if User.objects.filter(id=leader):
                    queryset = queryset.filter(leader_id=leader)
                else:
                    return "No User ID"

            # Search by project id
            project = self.request.query_params.get("project")
            if project:
                if Project.objects.filter(id=project):
                    queryset = queryset.filter(project_id=project)
                else:
                    return "No Project ID"
            return queryset
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Edit group
    @action(methods=['put'], detail=True, url_path='edit')
    def edit_group(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                if self.request.data.get('user'):
                    return Response("Cannot add user in this API")
                else:
                    g = self.get_object()
                    for k, v in request.data.items():
                        setattr(g, k, v)
                    g.save()
                return Response(GroupSerializer(g, context={'request': request}).data)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Delete group
    @action(methods=['delete'], detail=True, url_path='delete')
    def delete_group(self, request, pk):
        try:
            if request.method.__eq__('DELETE'):
                g = self.get_object()
                g.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Deactivate/active group
    @action(methods=['put'], detail=True, url_path='active')
    def active_group(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                group = self.get_object()
                if group.is_active == True:
                    group.is_active = False
                    group.save()
                elif group.is_active == False:
                    group.is_active = True
                    group.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Delete member of group
    @action(methods=['put'], detail=True, url_path='delete_member')
    def delete_member(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                group = self.get_object()
                users = self.request.data.get('user')
                flag = 0
                for user in users:
                    for member in group.users.all():
                        if member.id == user:
                            group.user.remove(member)
                            group.number = group.number - 1
                            group.save()
                            flag = 1
                if flag == 1:
                    return Response("Deleted member", status=status.HTTP_200_OK)
                elif flag == 0:
                    return Response("No member deleted", status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Add member
    @action(methods=['put'], detail=True, url_path='add_member')
    def add_member(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                group = self.get_object()
                users = self.request.data.get('users')
                flag_response = False
                for user in users:
                    flag = user in group.users.all()
                    if flag == False:
                        group.users.add(user)
                        group.number = group.number + 1
                        group.save()
                        flag_response = True
                if flag_response == True:
                    return Response(GroupDetailSerializer(group, context={'request': request}).data,status=status.HTTP_200_OK)
                elif flag_response == False:
                    return Response("No member added", status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Statistic
    @action(methods=['get'], detail=True, url_path='statistic')
    def statistic_group(self, request, pk):
        try:
            if request.method.__eq__('GET'):
                group = self.get_object()
                queryset_spending = Spending.objects.all()
                queryset_income = Income.objects.all()
                message = ""
                total_spending, total_income = 0, 0
                for u in group.users.all():
                    queryset_spending = queryset_spending.filter(user=u.id)
                    queryset_income = queryset_income.filter(user=u.id)

                    for s in queryset_spending:
                        if str(s.group_id) == str(group.id):
                            total_spending = total_spending + s.spending_amount
                    for i in queryset_income:
                        if str(i.group_id) == str(group.id):
                            total_income = total_income + i.income_amount
                if not total_spending == 0:
                    group.spending_amount = total_spending
                if not total_income == 0:
                    group.income_amount = total_income
                group.save()

                queryset_spending = Spending.objects.all()
                queryset_income = Income.objects.all()
                for u in group.users.all():
                    queryset_spending = queryset_spending.filter(user=u.id)
                    queryset_income = queryset_income.filter(user=u.id)
                    income_sum, spending_sum = 0, 0
                    percent_spending, percent_income = 0, 0
                    for s in queryset_spending:
                        if str(s.group_id) == str(group.id):
                            spending_sum = spending_sum + s.spending_amount
                        if not total_spending == 0:
                            percent_spending = (spending_sum / total_spending) * 100
                    for i in queryset_income:
                        if str(i.group_id) == str(group.id):
                            income_sum = income_sum + i.income_amount
                        if not total_income == 0:
                            percent_income = (income_sum / total_income) * 100

                    statistic = GroupStatistic.objects.all()
                    statistic = statistic.filter(group=group.id)
                    statistic = statistic.filter(user=u.id)
                    if statistic:
                        for stt in statistic:
                            stt.total_spending = spending_sum
                            stt.total_income = income_sum
                            stt.percent_spending = percent_spending
                            stt.percent_income = percent_income
                            stt.statistic_date = datetime.now()
                            message = spending_sum
                            stt.save()
                    else:
                        statistic, _ = GroupStatistic.objects.get_or_create(total_spending=spending_sum, total_income=income_sum,
                                                                    percent_spending=percent_spending, percent_income=percent_income,
                                                                    status=message, group=group, user=u)
                # return Response(GroupStatisticSerializer(statistic, context={'request': request}).data, status=status.HTTP_200_OK)
                return Response(message, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GroupViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    pagination_class = Paginator

    def get_permissions(self):
        return [permissions.IsAuthenticated()]


# Get statistic
class GroupStatisticViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = GroupStatistic.objects.all()
    serializer_class = GroupStatisticSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        group_id = self.request.query_params.get("id")
        queryset = queryset.filter(group=group_id)
        return queryset


# USER
class UserViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    pagination_class = Paginator

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search user by name
            name = self.request.query_params.get("name")
            if name:
                queryset = queryset.filter(first_name__icontains=name)

            # Filter by role
            role = self.request.query_params.get("role")
            if role == "superuser":
                queryset = queryset.filter(is_superuser=True)
            if role == "leader":
                queryset = queryset.filter(is_superuser=False)
                queryset = queryset.filter(is_staff=True)
            if role == "user":
                queryset = queryset.filter(is_superuser=False)
                queryset = queryset.filter(is_staff=False)

            # Filter by group
            group = self.request.query_params.get("group")
            if group:
                queryset = queryset.filter(group__id=group)
            return queryset
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Get, update current user
    @action(methods=['get', 'put'], detail=False, url_path='current_user')
    def current_user(self, request):
        u = request.user
        if request.method.__eq__('PUT'):
            for k, v in request.data.items():
                setattr(u, k, v)
            u.save()
        return Response(UserDetailSerializer(u, context={'request': request}).data, status=status.HTTP_200_OK)

    # Block user
    @action(methods=['post'], detail=True, url_path="block_user")
    def block_user(self, request, pk):
        try:
            u = self.get_object()
            u.is_active = 0
            u.save()
            return Response(UserSerializer(u, context={'request': request}).data, status=status.HTTP_200_OK)
        except User.DoesNotExits:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # Unblock user
    @action(methods=['post'], detail=True, url_path="unblock_user")
    def unblock_user(self, request, pk):
        try:
            u = self.get_object()
            u.is_active = 1
            u.save()
            return Response(data=UserSerializer(u, context={'request': request}).data, status=status.HTTP_200_OK)
        except User.DoesNotExits:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # Choose limit rule
    @action(methods=['put'], detail=False, url_path='limit_rule')
    def choose_limit_rule(self, request):
        try:
            if request.method.__eq__('PUT'):
                lr_id = self.request.data.get('limit_rule')
                if lr_id:
                    user = request.user
                    user.limit_rule = LimitRule.objects.get(id=lr_id)
                    user.save()
                    return Response(UserSerializer(user, context={'request': request}).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Change password
    @action(methods=['put'], detail=False, url_path='change_password')
    def change_password(self, request):
        try:
            if request.method.__eq__('PUT'):
                old_password = self.request.data.get('old_password')
                new_password = self.request.data.get('new_password')
                user = request.user
                if user.check_password(old_password):
                    user.set_password(new_password)
                    user.save()
                    return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Warning
    @action(methods=['get'], detail=True, url_path='warning')
    def warning(self, request, pk):
        try:
            if request.method.__eq__('GET'):
                user = self.get_object()
                spending_sum, income_sum = 0, 0
                month = self.request.query_params.get("month")
                quarter = self.request.query_params.get("quarter")
                group = self.request.query_params.get("group")
                limit_rule = LimitRule.objects.get(id=user.limit_rule.id)
                status_spending = "1"
                status_income = "1"
                queryset_spending = Spending.objects.all()
                queryset_spending = queryset_spending.filter(user=user.id)
                queryset_income = Income.objects.all()
                queryset_income = queryset_income.filter(user=user.id)
                if limit_rule.id == 1:
                    message = "Your limit rule id is 0"
                    return Response(message, status=status.HTTP_200_OK)
                if month:
                    queryset_spending = queryset_spending.filter(implementation_date__month=month)
                    for s in queryset_spending:
                        spending_sum = spending_sum + s.spending_amount

                    queryset_income = queryset_income.filter(implementation_date__month=month)
                    for i in queryset_income:
                        income_sum = income_sum + i.income_amount

                if quarter:
                    queryset_spending = queryset_spending.filter(implementation_date__quarter=quarter)
                    for s in queryset_spending:
                        spending_sum = spending_sum + s.spending_amount

                    queryset_income = queryset_income.filter(implementation_date__quarter=quarter)
                    for i in queryset_income:
                        income_sum = income_sum + i.income_amount

                if group:
                    queryset_spending = queryset_spending.filter(group_id=group)
                    for s in queryset_spending:
                        spending_sum = spending_sum + s.spending_amount

                    queryset_income = queryset_income.filter(group_id=group)
                    for i in queryset_income:
                        income_sum = income_sum + i.income_amount

                if spending_sum >= limit_rule.spending_limit:
                    status_spending = "3"
                if spending_sum >= limit_rule.spending_limit / 2:
                    status_spending = "2"
                if income_sum < limit_rule.income_limit:
                    status_income = "3"
                if income_sum >= limit_rule.income_limit * 2:
                    status_income = "2"

                queryset_warning = Warning.objects.all()
                queryset_warning = queryset_warning.filter(user=self.request.user.id)
                if queryset_warning:
                    for w in queryset_warning:
                        w.status_spending = status_spending
                        w.status_income = status_income
                        w.total_income = income_sum
                        w.total_spending = spending_sum
                        w.statistic_date = datetime.now()
                        if month:
                            w.month = month
                        if quarter:
                            w.quarter = quarter
                        if group:
                            w.group = group
                        w.save()
                    return Response(WarningSerializer(w, context={'request': request}).data, status=status.HTTP_200_OK)
                else:
                    warning, _ = Warning.objects.get_or_create(total_income=income_sum, total_spending=spending_sum, status_income=status_income,
                                                                    status_spending=status_spending, month=month, quarter=quarter, group=group, user=request.user)
                    return Response(WarningSerializer(warning, context={'request': request}).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        password = serializer.validated_data.get('password')
        hash_password = make_password(password)
        serializer.save(password=hash_password)


# INCOME
class IncomeViewSetGet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeDetailSerializer
    pagination_class = Paginator

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search by income's content
            content = self.request.query_params.get("content")
            if content:
                queryset = queryset.filter(content__icontains=content)

            # Filter from amount to amount
            income_from = self.request.query_params.get("amount_from")
            income_to = self.request.query_params.get("amount_to")
            if income_from:
                queryset = queryset.filter(income_amount__gte=income_from)
            if income_to:
                queryset = queryset.filter(income_amount__lte=income_from)

            # Filter from day to day
            date_from = self.request.query_params.get("date_from")
            date_to = self.request.query_params.get("date_to")
            if date_from:
                queryset = queryset.filter(implementation_date__gte=date_from)
            if date_to:
                queryset = queryset.filter(implementation_date__lte=date_to)

            # Filter by confirm
            confirm = self.request.query_params.get("confirm")
            if confirm == '1':
                queryset = queryset.filter(is_confirm=True)
            if confirm == '0':
                queryset = queryset.filter(is_confirm=False)

            # Sort by income amount
            sort = self.request.query_params.get("sort")
            if sort == '1':
                queryset = queryset.order_by('income_amount')
            if sort == '0':
                queryset = queryset.order_by('-income_amount')
            return queryset
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Delete income
    @action(methods=['delete'], detail=True, url_path="delete")
    def income_delete(self, request, pk):
        try:
            if request.method.__eq__('DELETE'):
                s = self.get_object()
                s.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Update income
    @action(methods=['put'], detail=True, url_path="edit")
    def income_update(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                i = self.get_object()
                for k, v in request.data.items():
                    setattr(i, k, v)
                i.save()
                return Response(IncomeSerializer(i, context={'request': request}).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Confirm income
    @action(methods=['put'], detail=True, url_path="confirm")
    def confirm(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                i = self.get_object()
                if i.is_confirm == True:
                    i.is_confirm = False
                elif i.is_confirm == False:
                    i.is_confirm = True
                i.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class IncomeViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeCreateSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]


# MEETING
class MeetingScheduleViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = MeetingSchedule.objects.all()
    serializer_class = MeetingScheduleCreateSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]


class MeetingScheduleViewSetGet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = MeetingSchedule.objects.all()
    serializer_class = MeetingScheduleSerializer
    pagination_class = Paginator

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Filter from day to day
            date_from = self.request.query_params.get("date_from")
            date_to = self.request.query_params.get("date_to")
            if date_from and date_to:
                queryset = queryset.filter(implementation_date__range=(date_from, date_to))

            # Search by name
            name = self.request.query_params.get("name")
            if name:
                queryset = queryset.filter(content__icontains=name)

            # Search by group
            group = self.request.query_params.get("group")
            if group:
                queryset = queryset.filter(group=group)

            # Search active meeting
            active = self.request.query_params.get("active")
            if active == 1:
                queryset = queryset.filter(is_active=True)
            return queryset
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Delete meeting schedule
    @action(methods=['delete'], detail=True, url_path="delete_meeting")
    def delete_meeting(self, request, pk):
        try:
            if request.method.__eq__('DELETE'):
                s = self.get_object()
                s.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Update meeting schedule
    @action(methods=['put'], detail=True, url_path="update_meeting")
    def update_meeting(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                m = self.get_object()
                for k, v in request.data.items():
                    setattr(m, k, v)
                m.save()
                return Response(MeetingScheduleSerializer(m, context={'request': request}).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Result, sort by vote
    @action(methods=['get'], detail=True, url_path="result")
    def result(self, request, pk):
        try:
            if request.method.__eq__('GET'):
                group = self.request.query_params.get("group")
                queryset = MeetingSchedule.filter(group=group)
                queryset = queryset.filter(active=True)
                for meeting in queryset:
                    meeting.is_active = 0
                    meeting.save()
                return queryset.order_by('vote')
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Vote meeting
    @action(methods=['put'], detail=True, url_path="vote")
    def vote(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                m = self.get_object()
                v, created = Voting.objects.get_or_create(meeting_schedule=m, user=request.user)
                v.save()
                m.vote = m.vote + 1
                m.save()
                return Response(MeetingScheduleSerializer(m, context={'request': request}).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Deactivate/Active meeting
    @action(methods=['put'], detail=True, url_path="active")
    def active_meeting(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                meeting = self.get_object()
                if meeting.is_active == True:
                    meeting.is_active = False
                elif meeting.is_active == False:
                    meeting.is_active = True
                meeting.save()
                return Response(MeetingScheduleSerializer(meeting, context={'request': request}).data,status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# LIMIT RULE
class LimitRuleViewSetGet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = LimitRule.objects.all()
    serializer_class = LimitRuleSerializerGet
    pagination_class = Paginator

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search limit rule by type
            limit_type = self.request.query_params.get("type")
            if limit_type:
                queryset = queryset.filter(type__icontains=limit_type)

            # Filter from limit spending to limit spending
            limit_spending_from = self.request.query_params.get("limit_spending_from")
            limit_spending_to = self.request.query_params.get("limit_spending_to")
            if limit_spending_from:
                queryset = queryset.filter(spending_limit__gte=limit_spending_from)
            if limit_spending_to:
                queryset = queryset.filter(spending_limit__lte=limit_spending_to)

            # Filter from limit income to limit income
            limit_income_from = self.request.query_params.get("limit_income_from")
            limit_income_to = self.request.query_params.get("limit_income_to")
            if limit_income_from:
                queryset = queryset.filter(income_limit__gte=limit_income_from)
            if limit_spending_to:
                queryset = queryset.filter(income_limit__lte=limit_income_to)
            return queryset
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Update limit rule
    @action(methods=['put'], detail=True, url_path='edit')
    def update_limit_rule(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                lr = self.get_object()
                for k, v in request.data.items():
                    setattr(lr, k, v)
                lr.save()
                return Response(LimitRuleSerializer(lr, context={'request': request}).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Delete limit rule
    @action(methods=['delete'], detail=True, url_path='delete')
    def delete_limit_rule(self, request, pk):
        try:
            if request.method.__eq__('DELETE'):
                lr = self.get_object()
                lr.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Inactive/active limit rule
    @action(methods=['put'], detail=True, url_path='inactive')
    def inactive(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                lr = self.get_object()
                if lr.active == True:
                    lr.active = False
                elif lr.active == False:
                    lr.active = True
                lr.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LimitRuleViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = MeetingSchedule.objects.all()
    serializer_class = LimitRuleSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]


# VOTE
class VoteViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Voting.objects.all()
    serializer_class = VotingSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        queryset = queryset.filter(user=self.request.user)
        return queryset

    # @action(methods=['get'], detail=True)
    # def vote(self, request, pk):
    #     try:
    #         if request.method.__eq__('GET'):
    #             queryset = Voting.objects.all()
    #             queryset = queryset.filter(user=request.user)
    #             return queryset
    #         else:
    #             return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    #     except:
    #         return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)