#!/usr/bin/env python
"""
Test script to check media file serving
"""
import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ClubConnect.settings_production')

try:
    django.setup()
    print("✅ Django setup successful!")
    
    from django.conf import settings
    print(f"✅ Media URL: {settings.MEDIA_URL}")
    print(f"✅ Media Root: {settings.MEDIA_ROOT}")
    
    # Check if media directory exists
    if os.path.exists(settings.MEDIA_ROOT):
        print("✅ Media directory exists")
        
        # List some files in media directory
        profile_images = os.path.join(settings.MEDIA_ROOT, 'profile_images')
        if os.path.exists(profile_images):
            files = os.listdir(profile_images)[:5]  # First 5 files
            print(f"✅ Profile images found: {files}")
        else:
            print("❌ Profile images directory not found")
            
        event_images = os.path.join(settings.MEDIA_ROOT, 'event_images')
        if os.path.exists(event_images):
            files = os.listdir(event_images)[:5]  # First 5 files
            print(f"✅ Event images found: {files}")
        else:
            print("❌ Event images directory not found")
    else:
        print("❌ Media directory does not exist")
    
    print("🎉 Media file test completed!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
