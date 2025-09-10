#!/usr/bin/env python
"""
Simple test script to check if Django can start properly
"""
import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ClubConnect.settings_production')

try:
    django.setup()
    print("✅ Django setup successful!")
    
    # Test basic imports
    from django.contrib.auth.models import User
    from pages.models import createclub
    print("✅ Models imported successfully!")
    
    # Test database connection
    from django.db import connection
    cursor = connection.cursor()
    print("✅ Database connection successful!")
    
    print("🎉 All tests passed! Django is ready for deployment.")
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
