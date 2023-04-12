from django import forms
from django.contrib import admin
from .models import *
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class IncomeForm(forms.ModelForm):
    describe = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Income
        fields = '__all__'


class SpendingForm(forms.ModelForm):
    describe = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Spending
        fields = '__all__'


class ProjectForm(forms.ModelForm):
    describe = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Project
        fields = '__all__'


class MeetingScheduleForm(forms.ModelForm):
    describe = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = MeetingSchedule
        fields = '__all__'


class IncomeAdmin(admin.ModelAdmin):
    form = IncomeForm


class SpendingAdmin(admin.ModelAdmin):
    form = SpendingForm


class ProjectAdmin(admin.ModelAdmin):
    form = ProjectForm


class MeetingScheduleAdmin(admin.ModelAdmin):
    form = MeetingScheduleForm


admin.site.register(Income, IncomeAdmin)
admin.site.register(Spending, SpendingAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(MeetingSchedule, MeetingScheduleAdmin)
admin.site.register(User)
admin.site.register(Group)
