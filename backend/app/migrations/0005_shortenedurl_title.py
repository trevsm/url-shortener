# Generated by Django 4.2.5 on 2023-12-14 03:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_view_ip_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='shortenedurl',
            name='title',
            field=models.CharField(default='Untitled', max_length=255),
            preserve_default=False,
        ),
    ]
