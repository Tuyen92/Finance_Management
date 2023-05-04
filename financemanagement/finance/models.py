from django.db import models
from ckeditor.fields import RichTextField
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    sex = models.CharField(null=False, max_length=20)
    avatar = models.ImageField(null=True, upload_to='finance/%Y/%m')
    birthday = models.DateField(null=True)
    address = models.CharField(null=True, max_length=255)
    phone = models.CharField(null=False, max_length=50)
    limit_rule = models.ForeignKey('LimitRule', on_delete=models.CASCADE, default=1)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.username


class Income(models.Model):
    content = models.CharField(null=False, max_length=225)
    income_amount = models.IntegerField(null=False)
    implementation_date = models.DateTimeField(auto_now_add=True)
    describe = RichTextField(null=False)
    is_confirm = models.BooleanField(default=False)
    user = models.ForeignKey('User', on_delete=models.CASCADE, default=True)
    group_id = models.CharField(null=True, max_length=20)
    project_id = models.CharField(null=True, max_length=20)

    def __str__(self):
        return self.content


class Spending(models.Model):
    content = models.CharField(null=False, max_length=225)
    spending_amount = models.IntegerField(null=False)
    implementation_date = models.DateTimeField(auto_now_add=True)
    describe = RichTextField(null=False)
    is_accept = models.BooleanField(default=False)
    user = models.ForeignKey('User', on_delete=models.CASCADE, default=True)
    group_id = models.CharField(null=True, max_length=20)
    project_id = models.CharField(null=True, max_length=20)

    def __str__(self):
        return self.content


class Group(models.Model):
    name = models.CharField(null=False, max_length=100)
    number = models.IntegerField(null=False, default=1)
    created_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    leader_id = models.CharField(max_length=10)
    project = models.ForeignKey('Project', on_delete=models.CASCADE, default=True)
    users = models.ManyToManyField('User', related_name='group')
    income_amount = models.IntegerField(null=False, default=0)
    spending_amount = models.IntegerField(null=False, default=0)

    def __str__(self):
        return self.name


class Project(models.Model):
    name_project = models.CharField(null=False, max_length=100)
    describe = RichTextField(null=False)
    target = models.IntegerField(null=False)
    start_date = models.DateTimeField(null=False)
    end_date = models.DateTimeField(null=False)
    is_ended = models.BooleanField(default=False)
    income_amount = models.IntegerField(null=False, default=0)
    spending_amount = models.IntegerField(null=False, default=0)

    def __str__(self):
        return self.name_project


class MeetingSchedule(models.Model):
    content = models.CharField(null=False, max_length=100)
    date_time = models.DateTimeField(null=False)
    vote = models.IntegerField(default=0)
    description = RichTextField(null=True)
    is_active = models.BooleanField(default=1)
    group = models.ForeignKey('Group', on_delete=models.CASCADE, default=True)

    def __str__(self):
        return self.content


class LimitRule(models.Model):
    spending_limit = models.IntegerField(null=True, default=0)
    income_limit = models.IntegerField(null=True, default=0)
    from_date = models.DateTimeField(auto_now_add=True)
    to_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=100)
    active = models.BooleanField(default=1)

    def __str__(self):
        return self.type


class Voting(models.Model):
    voting_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    meeting_schedule = models.ForeignKey(MeetingSchedule, on_delete=models.CASCADE)
    vote = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user', 'meeting_schedule')


class Warning(models.Model):
    total_income = models.IntegerField()
    total_spending = models.IntegerField()
    status = models.CharField(max_length=255, null=True)
    month = models.CharField(max_length=255, null=True)
    quarter = models.IntegerField(null=True)
    group = models.IntegerField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=True)


class Statistic(models.Model):
    total_income = models.IntegerField()
    total_spending = models.IntegerField()
    status = models.CharField(max_length=255)
    statistic_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True


class GroupStatistic(Statistic):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    percent_spending = models.CharField(max_length=20, null=True, default=0)
    percent_income = models.CharField(max_length=20, null=True, default=0)


class ProjectStatistic(Statistic):
    project = models.ForeignKey('Project', on_delete=models.CASCADE)
    percent_spending = models.CharField(max_length=20, null=True, default=0)
    percent_income = models.CharField(max_length=20, null=True, default=0)
