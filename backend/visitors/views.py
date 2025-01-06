from rest_framework import viewsets  
# from .helpers import register_visit 
from .models import*
from .serializers import*
 
class MediumViewSet(viewsets.ModelViewSet):
    queryset = Medium.objects.all()  
    serializer_class = MediumSerializer  

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()  
    serializer_class = CampaignSerializer  


class SourceViewSet(viewsets.ModelViewSet):
    queryset = Source.objects.all()  
    serializer_class = SourceSerializer  




# # عرض البيانات لجهاز
# class DeviceViewSet(viewsets.ModelViewSet):
#     queryset = Device.objects.all()  # استعلام للحصول على جميع الأجهزة
#     serializer_class = DeviceSerializer  # تحديد السيريالايزر المستخدم

# # عرض البيانات لنظام التشغيل
# class OperatingSystemViewSet(viewsets.ModelViewSet):
#     queryset = OperatingSystem.objects.all()  # استعلام للحصول على جميع أنظمة التشغيل
#     serializer_class = OperatingSystemSerializer  # تحديد السيريالايزر المستخدم

# # عرض البيانات للموقع
# class LocationViewSet(viewsets.ModelViewSet):
#     queryset = Location.objects.all()  # استعلام للحصول على جميع المواقع
#     serializer_class = LocationSerializer  # تحديد السيريالايزر المستخدم

# # عرض البيانات لنوع الجهاز
# class DeviceTypeViewSet(viewsets.ModelViewSet):
#     queryset = DeviceType.objects.all()  # استعلام للحصول على جميع أنواع الأجهزة
#     serializer_class = DeviceTypeSerializer  # تحديد السيريالايزر المستخدم

# # عرض البيانات لنظام تشغيل الجهاز
# class OSViewSet(viewsets.ModelViewSet):
#     queryset = OS.objects.all()  # استعلام للحصول على جميع أنظمة تشغيل الأجهزة
#     serializer_class = OSSerializer  # تحديد السيريالايزر المستخدم

# # عرض البيانات لأوقات الذروة
# class PeakTimeViewSet(viewsets.ModelViewSet):
#     queryset = PeakTime.objects.all()  # استعلام للحصول على جميع أوقات الذروة
#     serializer_class = PeakTimeSerializer  # تحديد السيريالايزر المستخدم

# # عرض البيانات للمنطقة
# class RegionViewSet(viewsets.ModelViewSet):
#     queryset = Region.objects.all()  # استعلام للحصول على جميع المناطق
#     serializer_class = RegionSerializer  # تحديد السيريالايزر المستخدم

# # عرض البيانات للمدينة
# class CityViewSet(viewsets.ModelViewSet):
#     queryset = City.objects.all()  # استعلام للحصول على جميع المدن
#     serializer_class = CitySerializer  # تحديد السيريالايزر المستخدم

# # عرض البيانات للبلد
# class CountryViewSet(viewsets.ModelViewSet):
#     queryset = Country.objects.all()  # استعلام للحصول على جميع البلدان
#     serializer_class = CountrySerializer  # تحديد السيريالايزر المستخدم

# # # عرض البيانات لزيارة المستخدم
# class UserVisitViewSet(viewsets.ModelViewSet):
#     queryset = UserVisit.objects.all()  # استعلام للحصول على جميع زيارات المستخدمين
#     serializer_class = UserVisitSerializer  # تحديد السيريالايزر المستخدم
    
 
# def home(request):
#     # response = register_visit(request, product_id=None)   
#     return response





# لجلب كل المدن في دولة معينة
# country = Country.objects.get(place_name__name="Egypt")
# regions = country.regions.all()
# for region in regions:
#     cities = region.cities.all()


# from django.db.models import Q

# # نفترض أن أسماء الدولة والمنطقة والمدينة موجودة بالفعل في PlaceDictionary
# country_name = "مصر"
# region_name = "القاهرة الكبرى"
# city_name = "القاهرة"


# # نبدأ بتنفيذ الاستعلام
# user_visits = UserVisit.objects.filter(
#     country__name__name=country_name,
#     region__name__name=region_name,
#     city__name__name=city_name
# )


# تحسين الاستعلام باستخدام Q للمرونة

# إذا كنت تحتاج إلى استعلام أكثر مرونة، وتريد البحث عن زيارات تتطابق مع دولة أو منطقة أو مدينة معينة فقط، يمكنك استخدام كائنات Q لدمج شروط متعددة في استعلام واحد:


# from django.db.models import Q

# user_visits = UserVisit.objects.filter(
#     Q(country__name__name=country_name) &
#     Q(region__name__name=region_name) &
#     Q(city__name__name=city_name)
# )


# for visit in user_visits:
#     print(f"User Visit ID: {visit.id}, Country: {visit.country.name}, Region: {visit.region.name}, City: {visit.city.name}")


# from django.db.models import Q
# from django.utils import timezone

# # افتراض التواريخ المطلوبة لنطاق البحث
# start_date = timezone.datetime(2024, 1, 1)
# end_date = timezone.datetime(2024, 12, 31)

# # بيانات المواقع التي نبحث عنها
# country_name = "مصر"
# region_name = "القاهرة الكبرى"
# city_name = "القاهرة"

# # استعلام لتصفية البيانات بناءً على نطاق التاريخ والموقع
# user_visits = UserVisit.objects.filter(
#     Q(date__date__range=(start_date, end_date)) &  # فلترة ضمن نطاق التاريخ
#     Q(country__name__name=country_name) &          # فلترة على أساس الدولة
#     Q(region__name__name=region_name) &            # فلترة على أساس المنطقة
#     Q(city__name__name=city_name)                  # فلترة على أساس المدينة
# )


# device_name = "هاتف محمول"
# os_name = "Android"
# source_name = "Google"
# medium_name = "Organic"

# user_visits = UserVisit.objects.filter(
#     Q(date__date__range=(start_date, end_date)) &
#     Q(country__name__name=country_name) &
#     Q(region__name__name=region_name) &
#     Q(city__name__name=city_name) &
#     Q(device__name__name=device_name) &
#     Q(operating_system__name__name=os_name) &
#     Q(source__dictionary_source__name=source_name) &
#     Q(medium__dictionary_medium__name=medium_name)
# )


# user_visits = UserVisit.objects.filter(
#     date__date__range=(start_date, end_date)
# )

# # للوصول إلى hourly visits لكل user_visit
# for visit in user_visits:
#     hourly_visits = visit.hourly_visits.all()  # هذا سيجلب جميع الساعات المرتبطة بهذه الزيارة





 