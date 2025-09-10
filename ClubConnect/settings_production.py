"""
Production settings for ClubConnect project.
"""

from .settings import *
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-fallback-key-for-development-only')

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# Force SQLite for now to avoid PostgreSQL dependency issues
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Uncomment below when you want to use PostgreSQL
# DATABASES = {
#     'default': dj_database_url.parse(os.environ.get('DATABASE_URL', 'sqlite:///db.sqlite3'))
# }

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Additional static files directories
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, 'ClubConnect', 'static'),
]

# Static files finders
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

# Media files
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Handle missing Pillow gracefully
try:
    from PIL import Image
    PILLOW_AVAILABLE = True
except ImportError:
    PILLOW_AVAILABLE = False

# Security settings
ALLOWED_HOSTS = ['*']  # Configure this properly for your domain
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# CORS settings
CORS_ALLOW_CREDENTIALS = True

# Session settings
SESSION_COOKIE_SECURE = False  # Set to True if using HTTPS

# Add whitenoise middleware for static files
# Insert WhiteNoise middleware after SecurityMiddleware
if 'whitenoise.middleware.WhiteNoiseMiddleware' not in MIDDLEWARE:
    MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

# WhiteNoise configuration - Use simple storage instead of manifest
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

# WhiteNoise settings
WHITENOISE_USE_FINDERS = True
WHITENOISE_AUTOREFRESH = True

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}
