# ClubConnect Deployment Guide

## 🚀 Deploy to Railway (Recommended)

### Step 1: Prepare Your Repository
1. Create a GitHub repository
2. Push your ClubConnect code to GitHub
3. Make sure all files are committed

### Step 2: Deploy to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your ClubConnect repository
5. Railway will automatically detect it's a Django app

### Step 3: Configure Environment Variables
In Railway dashboard, add these environment variables:
```
SECRET_KEY=your-very-secret-key-here
DJANGO_SETTINGS_MODULE=ClubConnect.settings_production
```

### Step 4: Add Database (Optional)
1. In Railway dashboard, click "New" → "Database" → "PostgreSQL"
2. Railway will automatically set the `DATABASE_URL` environment variable

### Step 5: Deploy
1. Railway will automatically deploy your app
2. Your app will be available at a Railway-provided URL
3. Run migrations: In Railway dashboard → "Deployments" → "View Logs" → Run: `python manage.py migrate`

## 🌐 Deploy to Render

### Step 1: Prepare Repository
Same as Railway - push to GitHub

### Step 2: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn ClubConnect.wsgi:application`
   - **Environment**: Python 3

### Step 3: Add Database
1. In Render dashboard, create a PostgreSQL database
2. Copy the database URL to environment variables

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
