# Generated by Django 5.0.6 on 2024-12-24 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0023_frequentlyasked_contact_frequentlyasked_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='frequentlyasked',
            name='title',
            field=models.CharField(max_length=200),
        ),
    ]
