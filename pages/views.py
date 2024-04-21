from django.shortcuts import redirect, render
from django.contrib.auth.models import User, auth
from django.contrib import messages
from .models import createclub,Post,EventActivity
from django.contrib.auth.decorators import login_required
from pages.authentication_backends import EmailAuthBackend
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
def studentLogout(request):
    auth.logout(request)
    return redirect('usertype')

# All Users Interface:
#@login_required(login_url='usertype') 
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

def get_or_create_user_by_username(username):
    # Attempt to get the user by username
    user, created = User.objects.get_or_create(username=username)
    # If the user is newly created, you might want to set some default values
    if created:
        # Set default values or perform any additional actions if needed
        pass
    return user 

def createNewClub(request):
        if request.method == 'POST':
                # Assuming you have a form that submits club data
                # Extract club data from the form
                clubname = request.POST['clubname']
                headline = request.POST['headline']
                location = request.POST['location']
                clubmanager = request.POST.get('clubmanager')
                clubvicemanager = request.POST['clubvicemanager']
                phonenumber1 = request.POST['phonenumber1']
                phonenumber2 = request.POST['phonenumber2']
                email = request.POST['email']
                category = request.POST['category']
                clubvision = request.POST['clubvision']
                clubdescription = request.POST['clubdescription']
                profileimg = request.FILES.get('profile')
                profileimg2 = request.FILES.get('background')

               # try:
              #      manager = User.objects.get(username=clubmanager)
              #  except User.DoesNotExist:
                        # Handle the case where the user does not exist
                        # You might want to redirect the user to an error page or display a message
               #     return HttpResponse("Error: The specified club manager does not exist.")

                manager = get_or_create_user_by_username(clubmanager)
                vice_manager = get_or_create_user_by_username(clubvicemanager)

                        # Validate form data
                if not clubname or not headline or not clubmanager or not email:
                    messages.error(request, 'Please fill in all required fields.')
                    return redirect('createNewClub')
                
                
                # Create club profile
                new_club = createclub.objects.create(
                    clubname=clubname,
                    headline=headline,
                    location=location,
                    clubmanager=manager,
                    clubvicemanager= clubvicemanager,
                    phonenumber1=phonenumber1,
                    phonenumber2=phonenumber2,
                    email=email,
                    category=category,
                    clubvision=clubvision,
                    clubdescription=clubdescription,
                    profileimg=profileimg,
                    profileimg2=profileimg2
                )
                new_club.user = request.user
                # Save the profile
                new_club.save()
                
                # Optionally, you might want to associate the profile with the current user
                # new_club.user = request.user
                # new_profile.save()

                # Redirect to a success page or homepage
                return redirect('createNewClub')
        else:
                return render(request, 'pages/sks-admin-interface/create-club-form.html')


posts = Post.objects.all().order_by('-pk')

activities = EventActivity.objects.all().order_by('-pk')

context = {
        'posts': posts,
        'activities': activities,
    }          

def adminNotifications(request):
    return render(request, 'pages/sks-admin-interface/admin-notifications.html',context)

# manager Interface:

def eventActivityForm(request): 
    if request.method == 'POST':
        # Retrieve form data
        clubmanager = request.POST['clubmanager']
        clubvicemanager = request.POST['clubvicemanager']
        clubname = request.POST['clubname']
        email = request.POST['email']
        eventtitle = request.POST['eventtitle']
        categories = request.POST['categories']
        date = request.POST['date']
        time = request.POST['time']
        location = request.POST['location']
        phonenumber = request.POST['phonenumber']
        description = request.POST['description']
        if len(request.FILES) != 0:
          event_image = request.FILES['event_image']

        # Create EventActivity object
        event_activity = EventActivity(
            clubmanager=clubmanager,
            clubvicemanager=clubvicemanager,
            clubname=clubname,
            email=email,
            eventtitle=eventtitle,
            categories=categories,
            event_image=event_image,
            date=date,
            time=time,
            location=location,
            phonenumber=phonenumber,
            description=description
        )

        # Save the object to the database
        event_activity.save()

        # Redirect to a success page or homepage
        return redirect('eventActivityForm')

    return render(request, 'pages/club-manager-interface/event-activity.html')

def eventPostForm(request):
     if request.method == 'POST':   
            clubname = request.POST['clubname']
            postdescription = request.POST['postdescription']
            eventtitle = request.POST['eventtitle']
            image = request.FILES['post_image']
        
            new_post = Post.objects.create(
            clubname=clubname,
            image=image,
            postdescription=postdescription,
            eventtitle=eventtitle
             )
            new_post.save()
            return redirect('eventPostForm')
     else:
            return render(request, 'pages/club-manager-interface/event-post.html')


def managerNotifications(request):
    return render(request, 'pages/club-manager-interface/manager-notifications.html')
