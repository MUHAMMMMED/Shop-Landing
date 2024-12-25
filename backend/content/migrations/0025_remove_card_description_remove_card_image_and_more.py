# Generated by Django 5.0.6 on 2024-12-24 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0024_alter_frequentlyasked_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='card',
            name='description',
        ),
        migrations.RemoveField(
            model_name='card',
            name='image',
        ),
        migrations.RemoveField(
            model_name='card',
            name='title',
        ),
        migrations.RemoveField(
            model_name='featurescard',
            name='description',
        ),
        migrations.RemoveField(
            model_name='featurescard',
            name='image',
        ),
        migrations.RemoveField(
            model_name='featurescard',
            name='title',
        ),
        migrations.AddField(
            model_name='card',
            name='content',
            field=models.ManyToManyField(related_name='card', to='content.contentfeatures'),
        ),
        migrations.AddField(
            model_name='featurescard',
            name='content',
            field=models.ManyToManyField(related_name='features_card', to='content.contentfeatures'),
        ),
        migrations.AlterField(
            model_name='contentfeatures',
            name='image',
            field=models.ImageField(upload_to='files/Features/images/%Y/%m/%d/'),
        ),
        migrations.RemoveField(
            model_name='features',
            name='content',
        ),
        migrations.AddField(
            model_name='features',
            name='content',
            field=models.ManyToManyField(related_name='features', to='content.contentfeatures'),
        ),
    ]
