# Generated by Django 4.1.7 on 2023-05-05 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0010_remove_projectstatistic_income_amount_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectstatistic',
            name='user',
            field=models.IntegerField(null=True),
        ),
    ]