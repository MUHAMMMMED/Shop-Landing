from rest_framework import serializers
from .models import *
 
class CampaignSerializer(serializers.ModelSerializer):
    dictionary_campaign = serializers.CharField(write_only=True)  # Accept campaign name
    dictionary_campaign_name = serializers.CharField(source="dictionary_campaign.name", read_only=True)  # Provide the name in responses
    class Meta:
        model = Campaign
        fields = ["id", "dictionary_campaign", "dictionary_campaign_name"]

    def create(self, validated_data):
        # Get or create CampaignDictionary
        campaign_name = validated_data.pop("dictionary_campaign")
        dictionary_campaign, created = CampaignDictionary.objects.get_or_create(name=campaign_name)
        # Create Campaign
        return Campaign.objects.create(dictionary_campaign=dictionary_campaign, **validated_data)
    


class SourceSerializer(serializers.ModelSerializer):
    dictionary_source = serializers.CharField(write_only=True)  # Accept Source name
    dictionary_source_name = serializers.CharField(source="dictionary_source.name", read_only=True)  # Provide the name in responses
    class Meta:
        model = Source
        fields = ["id", "dictionary_source", "dictionary_source_name"]

    def create(self, validated_data):
        # Get or create  Dictionary
        source_name = validated_data.pop("dictionary_source")
        dictionary_source, created = SourceDictionary.objects.get_or_create(name=source_name)
        # Create Source
        return Source.objects.create(dictionary_source=dictionary_source, **validated_data)
    

class MediumSerializer(serializers.ModelSerializer):
 
    dictionary_medium = serializers.CharField(write_only=True)  # Accept medium name
    dictionary_medium_name = serializers.CharField(source="dictionary_medium.name", read_only=True)  # Provide the name in responses
    class Meta:
        model = Medium
        fields = ["id", "dictionary_medium", "dictionary_medium_name"]

    def create(self, validated_data):
        # Get or create  Dictionary
        source_name = validated_data.pop("dictionary_medium")
        dictionary_medium, created = MediumDictionary.objects.get_or_create(name=source_name)
        # Create Medium
        return Medium.objects.create(dictionary_medium=dictionary_medium, **validated_data)
    
 
 