# Generated by Django 4.2 on 2023-08-22 00:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_comment'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Comment',
        ),
    ]
