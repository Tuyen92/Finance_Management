# Generated by Django 4.1.7 on 2023-04-11 13:57

import ckeditor.fields
from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('sex', models.CharField(max_length=20)),
                ('avatar', models.ImageField(null=True, upload_to='finance/%Y/%m')),
                ('birthday', models.DateField(null=True)),
                ('address', models.CharField(max_length=255, null=True)),
                ('phone', models.CharField(max_length=50)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('number', models.IntegerField(default=0)),
                ('created_date', models.DateField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('leader_id', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='LimitRule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spending_limit', models.IntegerField(default=0, null=True)),
                ('income_limit', models.IntegerField(default=0, null=True)),
                ('from_date', models.DateTimeField(null=True)),
                ('to_date', models.DateTimeField(null=True)),
                ('type', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_project', models.CharField(max_length=100)),
                ('describe', ckeditor.fields.RichTextField()),
                ('target', models.IntegerField()),
                ('income_amount', models.IntegerField(default=0)),
                ('spending_amount', models.IntegerField(default=0)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('is_ended', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Spending',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=225)),
                ('spending_amount', models.IntegerField()),
                ('implementation_date', models.DateTimeField(auto_now_add=True)),
                ('describe', ckeditor.fields.RichTextField()),
                ('is_accept', models.BooleanField(default=False)),
                ('group_id', models.CharField(max_length=20, null=True)),
                ('project_id', models.CharField(max_length=20, null=True)),
                ('user', models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MeetingSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=100)),
                ('date_time', models.DateTimeField()),
                ('vote', models.IntegerField(default=0)),
                ('description', ckeditor.fields.RichTextField(null=True)),
                ('is_active', models.BooleanField(default=1)),
                ('group', models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, to='finance.group')),
            ],
        ),
        migrations.CreateModel(
            name='Income',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=225)),
                ('income_amount', models.IntegerField()),
                ('implementation_date', models.DateTimeField(auto_now_add=True)),
                ('describe', ckeditor.fields.RichTextField()),
                ('is_confirm', models.BooleanField(default=False)),
                ('group_id', models.CharField(max_length=20, null=True)),
                ('project_id', models.CharField(max_length=20, null=True)),
                ('user', models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='group',
            name='project',
            field=models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, to='finance.project'),
        ),
        migrations.AddField(
            model_name='group',
            name='users',
            field=models.ManyToManyField(related_name='group', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='limit_rule',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='finance.limitrule'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
