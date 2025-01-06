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

 

    def update(self, instance, validated_data):
        # التعامل مع صورة الويب
        web_image = validated_data.get('web', None)
        if web_image:
            instance.web = web_image

        # التعامل مع صورة الموبايل
        mobile_image = validated_data.get('mobile', None)
        if mobile_image:
            instance.mobile = mobile_image

        # تحديث باقي الحقول
        for attr, value in validated_data.items():
            if attr not in ['web', 'mobile']:  # تجاهل الحقول التي تم التعامل معها
                setattr(instance, attr, value)

        # حفظ التحديثات
        instance.save()
        return instance









class ContentFreqSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentFreq
        fields = '__all__'

class FrequentlyAskedSerializer(serializers.ModelSerializer):
    content = ContentFreqSerializer(many=True)

    class Meta:
        model = FrequentlyAsked
        fields = '__all__'

    def create(self, validated_data):
        # Extract the content data from validated data
        content_data = validated_data.pop('content')
        # Create the FrequentlyAsked instance
        frequently_asked = FrequentlyAsked.objects.create(**validated_data)

        # Create the ContentFreq instances and add them to the ManyToManyField
        content_instances = []
        for content_item in content_data:
            content_instance = ContentFreq.objects.create(**content_item)
            content_instances.append(content_instance)
        # Add created content instances to the ManyToManyField
        frequently_asked.content.set(content_instances)
        return frequently_asked




 
 
 
class ImageSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageSlider
        fields = '__all__'
    def create(self, validated_data):
        slider_id = self.context.get('slider_id')
        if not slider_id:
            raise serializers.ValidationError({"slider_id": "Slider ID is required."})
        try:
            slider = Slider.objects.get(id=slider_id)
        except Slider.DoesNotExist:
            raise serializers.ValidationError({"slider_id": "Invalid Slider ID."})
        image_instance = ImageSlider.objects.create(**validated_data)
        slider.images.add(image_instance)
        return image_instance
    
class SliderSerializer(serializers.ModelSerializer):
    images = serializers.ListField( child=serializers.ImageField(), write_only=True, required=False  )
    images_data = ImageSliderSerializer(source='images', many=True, read_only=True)

    class Meta:
        model = Slider
        fields = [
            'id',
            'themes_desktop_Types',
            'themes_tablet_Types',
            'themes_mobile_Types',
            'is_mobile',
            'is_tablet',
            'is_desktop',
            'images',  # Write-only field
            'images_data',  # Read-only field
        ]

    def create(self, validated_data):
        # Extract images from the data
        images = validated_data.pop('images', [])
        slider = Slider.objects.create(**validated_data)
        # Create ImageSlider objects for each image and associate with slider
        for image in images:
            image_instance = ImageSlider.objects.create(image=image)
            slider.images.add(image_instance)
        return slider

    def update(self, instance, validated_data):
        # Extract images from the data
        images = validated_data.pop('images', [])
        
        # Update basic fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Handle images: Clear existing and add new ones
        if images:
            instance.images.clear()
            for image in images:
                image_instance = ImageSlider.objects.create(image=image)
                instance.images.add(image_instance)
        
        return instance

 


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
        # fields = '__all__'
        fields = ['id', 'image', 'title', 'description']
 
class FeaturesCardSerializer(serializers.ModelSerializer):
    content = ContentFeaturesSerializer(many=True)  # Nested serializer for content

    class Meta:
        model = FeaturesCard
        fields = '__all__'

    def create(self, validated_data):
        # Extract nested content data
        content_data = validated_data.pop('content', [])

        # Create the FeaturesCard object
        features_card = FeaturesCard.objects.create(**validated_data)

        # Handle nested content with images
        request = self.context.get('request')
        for index, content_item in enumerate(content_data):
            image_field_name = f"image_{index}"
            if request and request.FILES.get(image_field_name):
                content_item['image'] = request.FILES[image_field_name]

            ContentFeatures.objects.create(
                features_card=features_card,  # Assuming a ForeignKey to FeaturesCard exists
                **content_item
            )

        return features_card

 
class ContentFeaturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentFeatures
        fields = ['id', 'title', 'description', 'image']

    def create(self, validated_data):
        # Create a new ContentFeature instance from the validated data
        return ContentFeatures.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Update the existing ContentFeature instance with new data
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance




class CardSerializer(serializers.ModelSerializer):
    # Nested serializer to handle the Many-to-Many relation with ContentFeatures
    content = ContentFeaturesSerializer(many=True)

    class Meta:
        model = Card
        fields = '__all__'

    def create(self, validated_data):
        # Extract content from the validated data
        content_data = validated_data.pop('content')
        card = Card.objects.create(**validated_data)
        
        # Create and add each ContentFeature instance to the Card
        for content_item in content_data:
            content_feature = ContentFeatures.objects.create(**content_item)
            card.content.add(content_feature)  # Associate ContentFeature with Card

        return card

    def update(self, instance, validated_data):
        # Extract content from the validated data
        content_data = validated_data.pop('content')
        
        # Update the Card instance
        instance.themes_desktop_Types = validated_data.get('themes_desktop_Types', instance.themes_desktop_Types)
        instance.themes_tablet_Types = validated_data.get('themes_tablet_Types', instance.themes_tablet_Types)
        instance.themes_mobile_Types = validated_data.get('themes_mobile_Types', instance.themes_mobile_Types)
        instance.is_mobile = validated_data.get('is_mobile', instance.is_mobile)
        instance.is_tablet = validated_data.get('is_tablet', instance.is_tablet)
        instance.is_desktop = validated_data.get('is_desktop', instance.is_desktop)
        instance.save()

        # Update the related ContentFeatures (remove existing ones and add new)
        instance.content.clear()
        for content_item in content_data:
            content_feature = ContentFeatures.objects.create(**content_item)
            instance.content.add(content_feature)  # Add updated ContentFeature to Card

        return instance
 


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
    # content = ContentSerializer(required=False)
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
            'product',  'footer', 'image_hight', 'freq', 
            'youtube', 'video', 'countdown', 'card', 'features_card', 
            'features', 'product_grid'
        ]
class SectionSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, required=False)  
    class Meta:
        model = Section
        fields = '__all__'

    def create(self, validated_data):
        modules_data = validated_data.pop('modules', None)  
        section = Section.objects.create(**validated_data)
        if modules_data:
            for module_data in modules_data:
                Module.objects.create(section=section, page=module_data['page'].id, **module_data)
        return section

    def update(self, instance, validated_data):
        modules_data = validated_data.pop('modules', None)
        instance.title = validated_data.get('title', instance.title)
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

   