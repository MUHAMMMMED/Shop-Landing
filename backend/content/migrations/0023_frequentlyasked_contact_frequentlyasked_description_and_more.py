# Generated by Django 5.0.6 on 2024-12-24 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0022_remove_frequentlyasked_content_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='frequentlyasked',
            name='contact',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='frequentlyasked',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='frequentlyasked',
            name='title',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
    ]
