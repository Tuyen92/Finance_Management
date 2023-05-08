# Generated by Django 4.1.7 on 2023-05-03 05:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0003_warning_alter_voting_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='warning',
            name='group',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='warning',
            name='month',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='warning',
            name='quarter',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='warning',
            name='user',
            field=models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='warning',
            name='status',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.CreateModel(
            name='ProjectStatistic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_income', models.IntegerField()),
                ('total_spending', models.IntegerField()),
                ('status', models.CharField(max_length=255)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finance.project')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='GroupStatistic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_income', models.IntegerField()),
                ('total_spending', models.IntegerField()),
                ('status', models.CharField(max_length=255)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finance.group')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]