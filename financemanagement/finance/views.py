import requests
from django.db.models.functions import ExtractQuarter
from rest_framework import viewsets, permissions, generics, status, parsers
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.views import Response
from .serializers import *
from .paginators import *


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
            if amount_from and amount_to:
                queryset = queryset.filter(spending_amount__range=(amount_from, amount_to))

            # Filter from day to day
            date_from = self.request.query_params.get("date_from")
            date_to = self.request.query_params.get("date_to")
            if amount_from and amount_to:
                queryset = queryset.filter(implementation_date__range=(date_from, date_to))

            # Filter by is accept
            accept = self.request.query_params.get("accept")
            if accept == 1:
                queryset = queryset.filter(is_accept=True)

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

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search by project's name
            name = self.request.query_params.get("name")
            if name:
                queryset = queryset.filter(name_project__icontains=name)

            # Filter by from target to target
            target_from = self.request.query_params.get("target_from")
            target_to = self.request.query_params.get("target_to")
            if target_from and target_to:
                queryset = queryset.filter(target__range=(target_from, target_to))

            # Filter by from day to day
            day_from = self.request.query_params.get("day_from")
            day_to = self.request.query_params.get("day_to")
            if day_from and day_to:
                queryset = queryset.filter(start_date__range=(day_from, day_to))

            # Search by project month, year
            month = self.request.query_params.get("month")
            year = self.request.query_params.get("year")
            if month:
                queryset = queryset.dates('start_date', month, order='ASC')
            if year:
                queryset = queryset.dates('start_date', year)

            # Sort by target
            sort = self.request.query_params.get("sort")
            if sort == '1':
                queryset = queryset.order_by('target')
            if sort == '0':
                queryset = queryset.order_by('-target')

            # Filter by is ended project
            ended = self.request.query_params.get("ended")
            if ended == 1:
                queryset = queryset.filter(is_ended=False)
            if ended == 2:
                queryset = queryset.filter(is_ended=True)
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

    # Sum spending, income in project (test)
    @action(methods=['put'], detail=True, url_path='report')
    def report_project(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                p = self.get_object()
                spending_sum, income_sum = 0, 0
                spending = Spending.objects.filter(project_id=pk)
                income = Income.objects.filter(project_id=pk)
                for s in spending:
                    spending_sum += s.spending_amount
                for i in income:
                    income_sum += i.income_amount
                p.income_amount = income_sum
                p.spending_amount = spending_sum
                p.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Sum spending, income in each member (not done)
    @action(methods=['put'], detail=True, url_path='report_member')
    def report_sum(self, request, pk):
        try:
            if request.method.__eq__('PUT'):
                p = self.get_object()
                user = self.request.query_params.get('user')
                spending_sum, income_sum = 0, 0
                spending = Spending.filter(project_id=p.id)
                income = Income.filter(project_id=p.id)
                spending_sum += spending.filter(id_user=user)
                income_sum += income.filter(id_user=user)
                return spending_sum, income_sum
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Create project
class ProjectViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]


# GROUP
class GroupViewSetGet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupDetailSerializer

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search by group's name
            name = self.request.query_params.get("name")
            if name:
                queryset = queryset.filter(name__icontains=name)

            # Filter by actived group
            active = self.request.query_params.get("active")
            if active == 1:
                queryset = queryset.filter(is_active=True)
            elif active == 2:
                queryset = queryset.filter(is_active=False)

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


class GroupViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]


# USER
class UserViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    pagination_class = Paginator

    # authentication_classes = [BasicAuthentication, TokenAuthentication]
    # parser_classes = [parsers.MultiPartParser, ]

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search user by name
            name = self.request.query_params.get("name")
            if name:
                queryset = queryset.filter(first_name__icontains=name)

            # Filter by role
            role = self.request.query_params.get("role")
            if role:
                queryset = queryset.filter(role__role_name__icontains=role)
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
        return Response(UserSerializer(u, context={'request': request}).data, status=status.HTTP_200_OK)

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

    # Warning (not done)
    @action(methods=['get'], detail=True, url_path='warning')
    def warning(self, request):
        try:
            if request.method.__eq__('GET'):
                user = self.get_object()
                spending_sum, income_sum = 0, 0
                limit_rule = LimitRule.filter(id=user.limit_rule__id)
                if limit_rule.type.__eq__('Month'):
                    month = self.request.query_params.get('month')
                    spending = Spending.filter(id_user=user.id)
                    income = Income.filter(id_user=user.id)
                    spending_sum += spending.filter(implementation_date__month=month)
                    income_sum += income.filter(implementation_date__month=month)
                if limit_rule.type.__eq__('Year'):
                    year = self.request.query_params.get('year')
                    spending = Spending.filter(id_user=user.id)
                    income = Income.filter(id_user=user.id)
                    spending_sum += spending.filter(implementation_date__year=year)
                    income_sum += income.filter(implementation_date__year=year)
                if limit_rule.type.__eq__('Quarter'):
                    quarter = self.request.query_params.get('quarter')
                    spending = Spending.filter(id_user=user.id)
                    income = Income.filter(id_user=user.id)
                    spending_sum += spending.filter(implementation_date__quater=quarter)
                    income_sum += income.filter(implementation_date__quater=quarter)
                message = ""
                if spending_sum >= limit_rule.spending_limit:
                    message = "Over spending! "
                else:
                    message = "Stable spending "
                if income_sum >= limit_rule.income_limit:
                    message += "Over income!"
                else:
                    message += "Stable income"
                return Response(message)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]


# INCOME
class IncomeViewSetGet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeDetailSerializer
    pagination_class = Paginator

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search by income's content
            content = self.request.query_params.get("content")
            if content:
                queryset = queryset.filter(content__icontains=content)

            # Filter from amount to amount
            income_from = self.request.query_params.get("amount_from")
            income_to = self.request.query_params.get("amount_to")
            if income_from and income_to:
                queryset = queryset.filter(spending_amount__range=(income_from, income_to))

            # Filter from day to day
            date_from = self.request.query_params.get("date_from")
            date_to = self.request.query_params.get("date_to")
            if date_from and date_to:
                queryset = queryset.filter(implementation_date__range=(date_from, date_to))
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


class IncomeViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeCreateSerializer

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]


# MEETING
class MeetingScheduleViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = MeetingSchedule.objects.all()
    serializer_class = MeetingScheduleCreateSerializer

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]


class MeetingScheduleViewSetGet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = MeetingSchedule.objects.all()
    serializer_class = MeetingScheduleSerializer
    pagination_class = Paginator

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]

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
    serializer_class = LimitRuleSerializer
    pagination_class = Paginator

    # def get_permissions(self):
    #     return [permissions.IsAuthenticated()]

    def filter_queryset(self, queryset):
        try:
            # Search limit rule by type
            limit_type = self.request.query_params.get("type")
            if limit_type:
                queryset = queryset.filter(type__icontains=limit_type)

            # Filter limit spending
            limit_spending = self.request.query_params.get("limit_spending")
            if limit_spending:
                queryset = queryset.filter(spending_limit__gte=limit_spending)

            # Filter limit income
            limit_income = self.request.query_params.get("limit_income")
            if limit_income:
                queryset = queryset.filter(income_limit__gte=limit_income)
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


class LimitRuleViewSetCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = MeetingSchedule.objects.all()
    serializer_class = LimitRuleSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]
