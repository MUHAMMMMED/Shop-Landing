# Generated by Django 5.0.6 on 2024-12-24 02:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0015_alter_module_module_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='module',
            name='module_type',
            field=models.CharField(choices=[('header', 'Header'), ('slider', 'Slider'), ('content', 'Content'), ('product', 'Product'), ('hight', 'Hight'), ('freq', 'Freq'), ('youtube', 'Youtube'), ('video', 'Video'), ('footer', 'Footer'), ('countdown', 'Countdown'), ('card', 'Card'), ('featurescard', 'FeaturesCard'), ('features', 'Features')], default='header', max_length=20),
        ),
    ]
