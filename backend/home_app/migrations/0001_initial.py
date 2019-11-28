# Generated by Django 2.2.7 on 2019-11-28 06:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('mal_id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=300)),
                ('title_english', models.CharField(blank=True, max_length=300)),
                ('airing', models.BooleanField(default=False)),
                ('url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.FloatField()),
                ('date_time', models.DateTimeField()),
                ('anime', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home_app.Anime')),
            ],
        ),
    ]
