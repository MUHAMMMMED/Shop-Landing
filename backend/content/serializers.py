from rest_framework import serializers
from .models import *
from products.serializers import * 
from visitors.serializers import CampaignSerializer,SourceSerializer,MediumSerializer

class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Header 
        fields = '__all__'


class YouTubePlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = YouTubePlayer 
        fields = '__all__'
       

class VideoPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoPlayer
        fields = '__all__'
      
class ImageHightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageHight
        fields = '__all__'
 
class ContentFreqSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentFreq
        fields = '__all__'

class  FrequentlyAskedSerializer(serializers.ModelSerializer):
    content = ContentFreqSerializer(many=True) 
    class Meta:
        model = FrequentlyAsked
        fields = '__all__'
 
class ImageSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageSlider 
        fields = '__all__'

class SliderSerializer(serializers.ModelSerializer):
    images =ImageSliderSerializer(many=True, required=False)   
    class Meta:
        model = Slider 
        fields = '__all__'

class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content 
        fields = '__all__'

class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer 
        fields = '__all__'


class CountdownBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountdownBanner
        fields = '__all__'

class ContentFeaturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentFeatures
        fields = '__all__'
 

class CardSerializer(serializers.ModelSerializer):
    content = ContentFeaturesSerializer(many=True) 
    class Meta:
        model = Card
        fields = '__all__'

class FeaturesCardSerializer(serializers.ModelSerializer):
    content = ContentFeaturesSerializer(many=True) 
    class Meta:
        model = FeaturesCard
        fields = '__all__'

class FeaturesSerializer(serializers.ModelSerializer):
    content = ContentFeaturesSerializer(many=True) 
    class Meta:
        model = Features
        fields = '__all__'
   
 
class Page_Serializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = ['id', 'title', 'product']

    def get_product(self, obj):
        # البحث عن أول منتج في موديولات السيكشنات المرتبطة بالصفحة
        sections = obj.sections.all()
        for section in sections:
            for module in section.modules.all():
                if module.product:
                    return ProductSerializer(module.product).data
        return None

 


class ProductGridSerializer(serializers.ModelSerializer):
  page = Page_Serializer( many=True) 
  class Meta:
        model = ProductGrid
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    header = HeaderSerializer(required=False)
    slider = SliderSerializer(required=False)
    content = ContentSerializer(required=False)
    footer = FooterSerializer(required=False)
    product = ProductSerializer(required=False)
    video = VideoPlayerSerializer(required=False)  
    youtube = YouTubePlayerSerializer(required=False)   
    freq = FrequentlyAskedSerializer(required=False)
    image_hight = ImageHightSerializer(required=False)
    countdown = CountdownBannerSerializer(required=False)
    card = CardSerializer(required=False) 
    features_card = FeaturesCardSerializer(required=False) 
    features = FeaturesSerializer(required=False)
    product_grid = ProductGridSerializer(required=False)
    class Meta:
        model = Module
        fields = [
            'id', 'unique_id', 'module_type', 'mobile_order', 
            'tablet_order', 'desktop_order', 'header', 'slider', 
            'product', 'content', 'footer', 'image_hight', 'freq', 
            'youtube', 'video', 'countdown', 'card', 'features_card', 
            'features', 'product_grid'
        ]
class SectionSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, required=False)  # التأكد من أن الموديولات ليست مطلوبة
    class Meta:
        model = Section
        fields = '__all__'

    def create(self, validated_data):
        modules_data = validated_data.pop('modules', None)  # إزالة البيانات الخاصة بالموديولات
        section = Section.objects.create(**validated_data)
        if modules_data:
            for module_data in modules_data:
                Module.objects.create(section=section, page=module_data['page'].id, **module_data)
        return section

    def update(self, instance, validated_data):
        modules_data = validated_data.pop('modules', None)
        instance.title = validated_data.get('title', instance.title)
        # instance.order = validated_data.get('order', instance.order)
        instance.mobile_order = validated_data.get('mobile_order', instance.mobile_order)
        instance.tablet_order = validated_data.get('tablet_order', instance.tablet_order)
        instance.desktop_order = validated_data.get('desktop_order', instance.desktop_order)
        instance.save()  
        
        if modules_data:
           
            print("Modules data provided for update:", modules_data)  # تتبع الموديولات

        return instance

  
class LinksSerializer(serializers.ModelSerializer):
    campaign = CampaignSerializer( read_only=True)
    source = SourceSerializer( read_only=True)
    medium = MediumSerializer(read_only=True)

    class Meta:
        model = Links
        fields = '__all__'

  

class PageSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, required=False)   
    class Meta:
        model = Page
        fields = '__all__'

    def create(self, validated_data):
        validated_data.pop('sections', None)   
        page = Page.objects.create(**validated_data)  
        return page

    def update(self, instance, validated_data):
        validated_data.pop('sections', None)  
        instance.title = validated_data.get('title', instance.title)  # تحديث العنوان إذا تم توفيره
        instance.save()  
        return instance 
    

 
class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'
 

class Settings_Serializer(serializers.ModelSerializer):
    home = PageSerializer( read_only=True)
    # about = PageSerializer(required=False)
    # privacy = PageSerializer(required=False)
    # contactUs = PageSerializer(required=False)
  
    class Meta:
        model = Settings
        fields = '__all__'

   