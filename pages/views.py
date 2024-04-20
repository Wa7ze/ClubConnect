from django.shortcuts import redirect, render
from django.contrib.auth.models import User, auth
from django.contrib import messages
from .models import clubProfile
from django.contrib.auth.decorators import login_required


# registration:

def userType(request):
    return render(request, 'pages/registration-form/userType.html')

def adminLogin(request):
    return render(request, 'pages/registration-form/admin-login.html')

def managerLogin(request):
    return render(request, 'pages/registration-form/manager-login.html')


def studentSignup(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        # Validate username length
        if len(username) < 3 or len(username) > 20:
            messages.error(request, 'Name should be between 3 and 20 characters')
            return redirect('studentSignup')

        # Validate email format
        if not email.endswith('@st.uskudar.edu.tr'):
            messages.error(request, 'Email should be in the form example.email@st.uskudar.edu.tr')
            return redirect('studentSignup')

        # Validate password length
        if len(password) < 8 or len(password) > 20:
            messages.error(request, 'Password should be between 8 and 20 characters')
            return redirect('studentSignup')

        if password == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email Taken')
                return redirect('studentSignup')
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'Username Taken')
                return redirect('studentSignup')
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()

                #log user in and redirect to settings page
                user_login = auth.authenticate(username=username, password=password)
                auth.login(request, user_login)

                #create a Profile object for the new user
                user_model = User.objects.get(username=username)
                return redirect('homePage')
            
        else:
            messages.info(request, 'Password Not Matching')
            return redirect('studentSignup')
        
    else:
     return render(request, 'pages/registration-form/student-signup.html')

def studentLogin(request):
    if request.method == 'POST':
            email = request.POST['email']
            password = request.POST['password']
            print("Email:", email)
            print("Password:", password)
            
            user = auth.authenticate(email=email, password=password)

            if user is not None:
                auth.login(request, user)
                return redirect('homePage')
            else:
                messages.info(request, 'Credentials Invalid')
                return redirect('studentLogin')
    else:
        return render(request, 'pages/registration-form/student-login.html')
    

@login_required(login_url='usertype')     
def studentLogout(request):
    auth.logout(request)
    return redirect('usertype')

# All Users Interface:
def homePage(request):
    return render(request, 'pages/all-users-interface/homepage.html')

def events(request):
    return render(request, 'pages/all-users-interface/events.html')

def clubs(request):
    return render(request, 'pages/all-users-interface/clubs.html')

def myList(request):
    return render(request, 'pages/all-users-interface/my-list.html')

def clubProfile(request):
    return render(request, 'pages/all-users-interface/club-profile.html')

def eventPage(request):
    return render(request, 'pages/all-users-interface/event-page.html')

# admin Interface:

def adminBoard(request):
    return render(request, 'pages/sks-admin-interface/admin-board.html')

def createNewClub(request):
        if request.method == 'POST':
                # Assuming you have a form that submits club data
                # Extract club data from the form
                clubname = request.POST.get('clubname')
                headline = request.POST.get('headline')
                location = request.POST.get('location')
                clubmanager = request.POST.get('clubmanager')
                clubvicemanager = request.POST.get('clubvicemanager')
                phonenumber1 = request.POST.get('phonenumber1')
                phonenumber2 = request.POST.get('phonenumber2')
                email = request.POST.get('email')
                category = request.POST.get('category')
                clubvision = request.POST.get('clubvision')
                clubdescription = request.POST.get('clubdescription')

                # Validate form data
                if not clubname or not headline or not clubmanager or not email:
                    messages.error(request, 'Please fill in all required fields.')
                    return redirect('createNewClub')

                # Create club profile
                new_profile = clubProfile.objects.create(
                    clubname=clubname,
                    headline=headline,
                    location=location,
                    clubmanager=clubmanager,
                    clubvicemanager=clubvicemanager,
                    phonenumber1=phonenumber1,
                    phonenumber2=phonenumber2,
                    email=email,
                    category=category,
                    clubvision=clubvision,
                    clubdescription=clubdescription
                )

                # Save the profile
                new_profile.save()

                # Optionally, you might want to associate the profile with the current user
                # new_profile.user = request.user
                # new_profile.save()

                # Redirect to a success page or homepage
                return redirect('homepage')
        else:
                return render(request, 'pages/sks-admin-interface/create-club-form.html')
            

def adminNotifications(request):
    return render(request, 'pages/sks-admin-interface/admin-notifications.html')

# manager Interface:

def eventActivityForm(request):
    return render(request, 'pages/club-manager-interface/event-activity.html')

def eventPostForm(request):
    return render(request, 'pages/club-manager-interface/event-post.html')

def managerNotifications(request):
    return render(request, 'pages/club-manager-interface/manager-notifications.html')