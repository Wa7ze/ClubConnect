# 🚀 Quick Deployment Steps for ClubConnect

## Option 1: Render (Recommended - FREE)

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository"
3. Name it: `clubconnect`
4. Make it **Public** (required for free Render deployment)
5. **Don't** initialize with README (you already have files)
6. Click "Create repository"

### Step 2: Push Your Code to GitHub
Run these commands in your terminal:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/clubconnect.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Sign up with your GitHub account
3. Click "New" → "Web Service"
4. Connect your `clubconnect` repository
5. Configure:
   - **Name**: `clubconnect`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn ClubConnect.wsgi:application`

### Step 4: Add Environment Variables
In Render dashboard, add:
```
SECRET_KEY=django-insecure-your-very-long-secret-key-here-make-it-random
DJANGO_SETTINGS_MODULE=ClubConnect.settings_production
```

### Step 5: Add Database
1. In Render dashboard, click "New" → "PostgreSQL"
2. Name it: `clubconnect-db`
3. Copy the database URL
4. Add environment variable: `DATABASE_URL=your-postgres-url-here`

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Your app will be live at: `https://clubconnect.onrender.com`

---

## Option 2: PythonAnywhere (Alternative - FREE)

### Step 1: Create Account
1. Go to [PythonAnywhere.com](https://pythonanywhere.com)
2. Sign up for free account
3. Verify email

### Step 2: Upload Code
1. In Files tab, create directory: `clubconnect`
2. Upload your project files
3. Or use Git: `git clone https://github.com/YOUR_USERNAME/clubconnect.git`

### Step 3: Set Up Web App
1. Web tab → "Add a new web app"
2. Choose "Manual configuration" → "Python 3.9"
3. Configure WSGI file
4. Set up static files

---

## 🎯 After Deployment

1. **Run Migrations**: 
   - Render: Automatic
   - PythonAnywhere: In Bash console: `python manage.py migrate`

2. **Create Admin Account**:
   - Render: Use Django admin at `/admin/`
   - PythonAnywhere: `python manage.py createsuperuser`

3. **Test Your App**:
   - Main page: `https://your-app-url.com`
   - Admin: `https://your-app-url.com/admin/`
   - Student login: `https://your-app-url.com/login-student`

## 🔑 Your Login Credentials (After Deployment)

- **Admin**: `sks.admin@st.uskudar.edu.tr` / `sksadmin`
- **Manager**: `manager1@st.uskudar.edu.tr` / `manager123`
- **Student**: `student1@st.uskudar.edu.tr` / `student123`
