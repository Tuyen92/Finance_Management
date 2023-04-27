from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField('avatar')

    def get_image(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % obj.avatar.name) if request else ''


class LimitRuleSerializer(ModelSerializer):
    class Meta:
        model = LimitRule
        fields = ['id', 'spending_limit', 'income_limit', 'from_date', 'to_date', 'type']


class LimitRuleSerializerGet(LimitRuleSerializer):
    class Meta:
        model = LimitRuleSerializer.Meta.model
        fields = LimitRuleSerializer.Meta.fields + ['active']


class UserSerializer(ImageSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'sex', 'birthday', 'address', 'phone', 'email', 'is_superuser',
                  'is_staff', 'is_active', 'avatar', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }


class UserDetailSerializer(UserSerializer):
    limit_rule = LimitRuleSerializer()

    class Meta:
        model = UserSerializer.Meta.model
        fields = UserSerializer.Meta.fields + ['limit_rule']


class SpendingSerializer(ModelSerializer):
    class Meta:
        model = Spending
        fields = ['id', 'content', 'describe', 'spending_amount', 'implementation_date', 'group_id', 'is_accept',
                  'project_id']


class SpendingDetailSerializer(SpendingSerializer):
    user = UserSerializer()

    class Meta:
        model = SpendingSerializer.Meta.model
        fields = SpendingSerializer.Meta.fields + ['user']


class SpendingCreateSerializer(SpendingSerializer):
    class Meta:
        model = SpendingSerializer.Meta.model
        fields = SpendingSerializer.Meta.fields + ['user']


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name_project', 'target', 'describe', 'income_amount', 'spending_amount', 'start_date',
                  'end_date', 'is_ended']


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'number', 'is_active', 'leader_id', 'users']


class GroupDetailSerializer(GroupSerializer):
    users = UserSerializer(many=True)
    project = ProjectSerializer()

    class Meta:
        model = GroupSerializer.Meta.model
        fields = GroupSerializer.Meta.fields + ['project', 'users']


class IncomeSerializer(ModelSerializer):
    class Meta:
        model = Income
        fields = ['id', 'income_amount', 'implementation_date', 'content', 'describe', 'group_id', 'is_confirm',
                  'project_id']


class IncomeDetailSerializer(IncomeSerializer):
    user = UserSerializer()

    class Meta:
        model = IncomeSerializer.Meta.model
        fields = IncomeSerializer.Meta.fields + ['user']


class IncomeCreateSerializer(IncomeSerializer):
    class Meta:
        model = IncomeSerializer.Meta.model
        fields = IncomeSerializer.Meta.fields + ['user']


class MeetingScheduleSerializer(ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = MeetingSchedule
        fields = ['id', 'date_time', 'vote', 'content', 'description', 'is_active', 'group']


class MeetingScheduleCreateSerializer(ModelSerializer):
    class Meta:
        model = MeetingSchedule
        fields = ['id', 'date_time', 'vote', 'content', 'description', 'is_active', 'group']


class VotingSerializer(ModelSerializer):
    user = UserSerializer()
    meeting_schedule = MeetingScheduleSerializer()

    class Meta:
        model = Voting
        fields = ['voting_time', 'user', 'meeting_schedule', 'vote']
