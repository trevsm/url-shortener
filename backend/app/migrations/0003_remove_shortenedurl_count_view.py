# Generated by Django 4.2.5 on 2023-11-30 01:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_shortenedurl_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shortenedurl',
            name='count',
        ),
        migrations.CreateModel(
            name='View',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('viewed_at', models.DateTimeField(auto_now_add=True)),
                ('shortened_url', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='views', to='app.shortenedurl')),
            ],
        ),
    ]
