#!/usr/bin/env bash
# Build script for Render deployment

echo "Starting build process..."

# Install dependencies
pip install -r requirements.txt

# Run migrations first
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput --clear

echo "Build completed successfully!"
