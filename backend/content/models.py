from django.db import models
import uuid   
from products.models import  *
from visitors.models import Campaign,Source,Medium
 
class Page(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField( blank=True, null=True) 
    keywords= models.TextField( blank=True, null=True)  
    image = models.ImageField(upload_to="files/products/images/%Y/%m/%d/" , blank=True, null=True)

    def __str__(self):
        return self.title
  
class Links(models.Model):
    page = models.ForeignKey(Page, related_name='Link', on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='Link', blank=True, null=True)
    source = models.ForeignKey(Source, on_delete=models.CASCADE, related_name='Link', blank=True, null=True)
    medium = models.ForeignKey(Medium, on_delete=models.CASCADE, related_name='Link', blank=True, null=True)
   
    def __str__(self):
        return f"Link for Page: {self.page.title}"
 
class Settings(models.Model):
    home = models.ForeignKey(Page, related_name='home_settings', on_delete=models.CASCADE,blank=True, null=True)
    about = models.ForeignKey(Page, related_name='about_settings', on_delete=models.CASCADE,blank=True, null=True)
    privacy = models.ForeignKey(Page, related_name='privacy_settings', on_delete=models.CASCADE,blank=True, null=True)
    contactUs = models.ForeignKey(Page, related_name='contactUs_settings', on_delete=models.CASCADE,blank=True, null=True)
    currency_ar= models.CharField(max_length= 50 ,blank=True, null=True)
    currency_en= models.CharField(max_length= 50 ,blank=True, null=True)
 
class Section(models.Model):
    page = models.ForeignKey(Page, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField(max_length=200) 
    mobile_order = models.PositiveIntegerField(default=0)   
    tablet_order = models.PositiveIntegerField(default=0)   
    desktop_order = models.PositiveIntegerField(default=0)   
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  
    def __str__(self):
        return self.title
      


class Style(models.Model):
    primary_color = models.CharField(max_length=7, default="#3498db")
    secondary_color = models.CharField(max_length=7, default="#2ecc71")
    background_color = models.CharField(max_length=7, default="#f5f5f5")
    text_color = models.CharField(max_length=7, default="#333333")
    font_family = models.CharField(max_length=100, default="Arial, sans-serif")
    box_shadow = models.CharField(max_length=100, default="0px 4px 6px rgba(0, 0, 0, 0.1)")
    border_radius = models.CharField(max_length=10, default="5px")
    border_color = models.CharField(max_length=7, default="#dddddd")

    def __str__(self):
        return "Site Style Configuration"



  
class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField()
    def __str__(self):
        return self.name

class Header(models.Model):

    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )

    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    title = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    menu_items = models.ManyToManyField(MenuItem, related_name='headers')
    # style = models.ForeignKey(Style, related_name='header', on_delete=models.CASCADE, blank=True, null=True)



class ImageSlider(models.Model):
    image = models.FileField(upload_to="files/images_Slider/%Y/%m/%d/", blank=True, null=True)
    def delete(self, *args, **kwargs):
        self.image.delete()
        super().delete(*args, **kwargs)
 
class Slider(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
 
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    images = models.ManyToManyField(ImageSlider)
    # style = models.ForeignKey(Style, related_name='slider', on_delete=models.CASCADE, blank=True, null=True)


class ImageHight(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
    
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    web = models.ImageField(upload_to="files/hight/images/%Y/%m/%d/", blank=True, null=True)
    mobile= models.ImageField(upload_to="files/hight/images/%Y/%m/%d/", blank=True, null=True)
 


class YouTubePlayer(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
    
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    video_id = models.CharField(max_length=300)
 
    def __str__(self):
        return self.video_id
  
class VideoPlayer(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
    
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    link = models.CharField(max_length=500)
    def __str__(self):
        return self.link
  
class ContentFeatures(models.Model):
    image = models.ImageField(upload_to="files/Features/images/%Y/%m/%d/" )
    title = models.TextField()
    description= models.TextField()
    def __str__(self):
      return self.title
    

class Card(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
    
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    content= models.ManyToManyField(ContentFeatures, related_name='card')
    def __str__(self):
        return ", ".join([content.title for content in self.content.all()[:3]]) or "No Content"

 
class FeaturesCard(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    content= models.ManyToManyField(ContentFeatures, related_name='features_card')
    def __str__(self):
        return ", ".join([content.title for content in self.content.all()[:3]]) or "No Content"

  
class Features(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
    
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    content= models.ManyToManyField(ContentFeatures, related_name='features')
    def __str__(self):
        return ", ".join([content.title for content in self.content.all()[:3]]) or "No Content"



 
 
class ContentFreq(models.Model):
    question= models.TextField()
    answer =  models.TextField()
    def __str__(self):
      return self.question


class FrequentlyAsked(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
    
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    content = models.ManyToManyField(ContentFreq, related_name='freq')
    title =  models.CharField(max_length=200)
    description= models.TextField()
    contact = models.CharField(max_length=100,blank=True, null=True)

    def __str__(self):
      return self.title

  

class CountdownBanner(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
    
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    content = models.TextField()
    date_offer= models.DateField()
    button_link =models.CharField(max_length=300,blank=True, null=True)

 



 

class Content(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
     )
    
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    text = models.TextField()
    # style = models.ForeignKey(Style, related_name='content', on_delete=models.CASCADE, blank=True, null=True)

 
class SocialLink(models.Model):
    platform = models.CharField(max_length=50)
    url = models.URLField()
    def __str__(self):
        return self.platform

class Footer (models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
    )
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    content = models.TextField()
    copyright_text = models.CharField(max_length=100)
    social_links = models.ManyToManyField(SocialLink, related_name='footers')
    # style = models.ForeignKey(Style, related_name='footer', on_delete=models.CASCADE, blank=True, null=True)

class ProductGrid(models.Model):
    Themes_TYPES = (
        ('classic', 'Classic'),
        ('simple', 'Simple'),
        ('modern', 'Modern'),
    )
    themes_desktop_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_tablet_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    themes_mobile_Types = models.CharField(max_length=20, choices=Themes_TYPES , default="Classic")
    is_mobile = models.BooleanField(default=True)
    is_tablet = models.BooleanField(default=True)
    is_desktop = models.BooleanField(default=True)
    page = models.ManyToManyField(Page)
  
class Module(models.Model):
    MODULE_TYPES = (
        ('header', 'Header'),
        ('slider', 'Slider'),
        ('content', 'Content'),
        ('product', 'Product'),
        ('hight','Hight'),
        ('freq','Freq'),
        ('youtube','Youtube'),
        ('video','Video'),       
        ('footer','Footer' ),
        ('countdown','Countdown'),
        ('card','Card'),
        ('featurescard','FeaturesCard'),
        ('features','Features'),
        ('productgrid','ProductGrid'),
    )
 
    section = models.ForeignKey(Section, related_name='modules', on_delete=models.CASCADE)
    module_type = models.CharField(max_length=20, choices=MODULE_TYPES , default="header")  
    mobile_order = models.PositiveIntegerField(default=0)   
    tablet_order = models.PositiveIntegerField(default=0)   
    desktop_order = models.PositiveIntegerField(default=0)   
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True) 
    header = models.ForeignKey(Header , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    slider = models.ForeignKey(Slider , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    content = models.ForeignKey(Content , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    image_hight = models.ForeignKey(ImageHight , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    freq  = models.ForeignKey(FrequentlyAsked , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    youtube = models.ForeignKey(YouTubePlayer , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    video = models.ForeignKey(VideoPlayer , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    footer = models.ForeignKey(Footer , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    countdown = models.ForeignKey(CountdownBanner , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    card = models.ForeignKey(Card , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    features_card = models.ForeignKey(FeaturesCard , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    features = models.ForeignKey(Features , on_delete=models.CASCADE, related_name='module', blank=True, null=True)
    product_grid = models.ForeignKey(ProductGrid , on_delete=models.CASCADE, related_name='module', blank=True, null=True)

 
     




 






 
 
 