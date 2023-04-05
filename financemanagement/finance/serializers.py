from rest_framework.serializers import ModelSerializer
from .models import *


# class RoleSerializer(ModelSerializer):
#     class Meta:
#         model = Role
#         fields = ['id', 'role_name', 'describe']


class LimitRuleSerializer(ModelSerializer):
    class Meta:
        model = LimitRule
        fields = ['id', 'spending_limit', 'income_limit', 'from_date', 'to_date', 'type']


class UserSerializer(ModelSerializer):
    # role = RoleSerializer()
    limit_rule = LimitRuleSerializer()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'sex', 'birthday', 'address', 'phone', 'email', 'is_active', 'limit_rule']
        extra_kwargs = {
            'avatar': {'write_only': True},
            'password': {'write_only': True}
        }


class UserDetailSerializer(UserSerializer):
    class Meta:
        model = UserSerializer.Meta.model
        fields = ['username', 'password']


class SpendingSerializer(ModelSerializer):
    class Meta:
        model = Spending
        fields = ['id', 'content', 'describe', 'spending_amount', 'implementation_date', 'is_accept']


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name_project', 'target', 'describe', 'income_amount', 'spending_amount', 'start_date',
                  'end_date', 'is_ended']


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'number', 'is_active', 'leader_id', 'project']


class GroupDetailSerializer(GroupSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = GroupSerializer.Meta.model
        fields = GroupSerializer.Meta.fields + ['users']


class IncomeSerializer(ModelSerializer):
    class Meta:
        model = Income
        fields = ['id', 'income_amount', 'implementation_date', 'content', 'describe']


class MeetingScheduleSerializer(ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = MeetingSchedule
        fields = ['id', 'date_time', 'vote', 'content', 'group']
