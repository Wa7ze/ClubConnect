# ClubConnect Deployment Guide

## 🚀 Deploy to Render (Recommended - FREE)

### Step 1: Prepare Your Repository
1. Create a GitHub repository
2. Push your ClubConnect code to GitHub
3. Make sure all files are committed

### Step 2: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Sign up with your GitHub account
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Select your ClubConnect repository

### Step 3: Configure Build Settings
In Render dashboard, set these settings:
- **Name**: `clubconnect` (or your preferred name)
- **Environment**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn ClubConnect.wsgi:application`

### Step 4: Add Environment Variables
In Render dashboard, add these environment variables:
```
SECRET_KEY=your-very-secret-key-here-make-it-long-and-random
DJANGO_SETTINGS_MODULE=ClubConnect.settings_production
```

### Step 5: Add Database
1. In Render dashboard, click "New" → "PostgreSQL"
2. Name it `clubconnect-db`
3. Copy the database URL
4. Add it as environment variable: `DATABASE_URL=your-postgres-url-here`

### Step 6: Deploy
1. Click "Create Web Service"
2. Render will automatically deploy your app
3. Your app will be available at `https://your-app-name.onrender.com`

## 🐍 Alternative: Deploy to PythonAnywhere (FREE)

### Step 1: Create Account
1. Go to [PythonAnywhere.com](https://pythonanywhere.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Upload Your Code
1. In the Files tab, create a new directory: `clubconnect`
2. Upload your Django project files
3. Or use Git: `git clone https://github.com/yourusername/clubconnect.git`

### Step 3: Set Up Virtual Environment
1. Open a Bash console
2. Create virtual environment: `mkvirtualenv --python=/usr/bin/python3.9 clubconnect`
3. Install requirements: `pip install -r requirements.txt`

### Step 4: Configure Database
1. In the Databases tab, create a new MySQL database
2. Update your settings to use MySQL instead of SQLite

### Step 5: Set Up Web App
1. Go to Web tab → "Add a new web app"
2. Choose "Manual configuration" → "Python 3.9"
3. Configure WSGI file to point to your Django app
4. Set up static files mapping

### Step 6: Run Migrations
1. In Bash console: `python manage.py migrate`
2. Create superuser: `python manage.py createsuperuser`

## 🔧 Alternative: Netlify + Backend

If you really want to use Netlify:

### Frontend (Netlify)
1. Build static files from Django templates
2. Deploy static files to Netlify

### Backend (Separate Service)
1. Deploy Django backend to Railway/Render
2. Configure CORS for frontend-backend communication
3. Update frontend to use backend API URLs

## 📝 Post-Deployment Steps

1. **Create Admin Account**:
   ```bash
   python manage.py createsuperuser
   ```

2. **Run Migrations**:
   ```bash
   python manage.py migrate
   ```

3. **Collect Static Files**:
   ```bash
   python manage.py collectstatic
   ```

4. **Set Up Media Files**:
   - Configure media file storage (AWS S3, Cloudinary, etc.)

## 🎯 Recommended: Railway Deployment

Railway is the easiest option because:
- ✅ Free tier available
- ✅ Automatic Django detection
- ✅ Built-in database support
- ✅ Easy environment variable management
- ✅ Automatic deployments from GitHub

## 🔗 Your App URLs After Deployment

- **Main App**: `https://your-app-name.railway.app`
- **Admin Panel**: `https://your-app-name.railway.app/admin/`
- **Login Pages**: 
  - Student: `https://your-app-name.railway.app/login-student`
  - Manager: `https://your-app-name.railway.app/login-manager`
  - Admin: `https://your-app-name.railway.app/login-admin`
