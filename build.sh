#!/usr/bin/env bash
# Build script for Render deployment

echo "Starting build process..."

# Install dependencies
pip install -r requirements.txt

# Test Django setup
echo "Testing Django setup..."
python test_deployment.py

# Test media files
echo "Testing media files..."
python test_media.py

# Run migrations first
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput --clear --verbosity=2

echo "Build completed successfully!"
