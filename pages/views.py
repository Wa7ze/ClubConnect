from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.models import User, auth, Group
from django.contrib.auth import logout,login,authenticate
from django.contrib import messages
from .models import createclub,Post,EventActivity,Rejections,EditEventActivity
from django.contrib.auth.decorators import login_required
from pages.authentication_backends import EmailAuthBackend
from .decorators import unauthenticated_user ,allowed_users

# registration:

def userType(request):
    return render(request, 'pages/registration-form/userType.html')

@unauthenticated_user
def adminLogin(request):
    user = None  
    if request.method == 'POST':
            email = request.POST['email']
            password = request.POST['password']

                # Check if the provided email and password match the admin credentials
            if email == 'sks.admin@st.uskudar.edu.tr' and password == 'sksadmin':
                # If credentials match, authenticate the user
                # You may also want to hash the password and compare it with the hashed password stored in the database
                admin_user = User.objects.get(username='SKS')  # Assuming 'admin' is the username of the admin account
                user = authenticate(username=admin_user.username, password=password)

            if user is not None:
                login(request, user)
                return redirect('homePage')
            else:
                messages.info(request, 'Credentials Invalid')
                return redirect('adminLogin')
    else:
        return render(request, 'pages/registration-form/admin-login.html')

@unauthenticated_user
def managerLogin(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        if user is not None:
            # Check if the authenticated user is a superuser
            if  user.groups.filter(name='manager').exists():
                # If the user is a superuser, redirect to homePage
                login(request, user)
                return redirect('homePage')
            else:
                # If the user is not a superuser, show error message and redirect to managerLogin
                messages.error(request, 'You are not authorized to access this page.')
                return redirect('managerLogin')
        else:
            # If authentication fails, show error message and redirect to managerLogin
            messages.error(request, 'Invalid email or password.')
            return redirect('managerLogin')
    else:
         return render(request, 'pages/registration-form/manager-login.html')

@unauthenticated_user
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

                group=Group.objects.get(name='student')
                user.groups.add(group)
                #log user in and redirect to settings page
                user_login = authenticate(username=username, password=password)
                login(request, user_login)

                #create a Profile object for the new user
                user_model = User.objects.get(username=username)
                return redirect('homePage')
            
        else:
            messages.info(request, 'Password Not Matching')
            return redirect('studentSignup')
        
    else:
     return render(request, 'pages/registration-form/student-signup.html')
    
@unauthenticated_user
def studentLogin(request):
    if request.method == 'POST':
            email = request.POST['email']
            password = request.POST['password']
            print("Email:", email)
            print("Password:", password)
            
            user = authenticate(email=email, password=password)

            if user is not None:
                login(request, user)
                return redirect('homePage')
            else:
                messages.info(request, 'Credentials Invalid')
                return redirect('studentLogin')
    else:
        return render(request, 'pages/registration-form/student-login.html')



def LogoutUser(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect('usertype')

# All Users Interface:
#@allowed_users(allowed_roles=['student','admin','manager'])
#@login_required(login_url='usertype') 
#@admin_only
def homePage(request):
    home = createclub.objects.all()
    event = EventActivity.objects.all()
    return render(request, 'pages/all-users-interface/homepage.html',{'home':home ,'event':event})

@login_required(login_url='usertype')
def events(request):
    activity= EventActivity.objects.all()
    return render(request, 'pages/all-users-interface/events.html', {'activity': activity})



def clubs(request):
    clubs = createclub.objects.all()
    return render(request, 'pages/all-users-interface/clubs.html',{'clubs': clubs})



def myList(request):
    return render(request, 'pages/all-users-interface/my-list.html')

def clubProfile(request,pk):
    club = get_object_or_404(createclub, pk = pk)
    activity= EventActivity.objects.filter(clubname=club)
    post=Post.objects.filter(clubname=club)
    
    
    return render(request, 'pages/all-users-interface/club-profile.html', {'activity': activity , 'post':post , 'club':club})


def eventPage(request,pk):
    activity= EventActivity.objects.all()
    event_activity= get_object_or_404(EventActivity, pk=pk)

    if request.method == 'POST':
        # Retrieve form data
        clubmanager = request.POST.get('edit_clubmanager')
        clubvicemanager = request.POST['edit_clubvicemanager']
        clubname = request.POST.get('edit_clubname')
        email = request.POST['edit_email']
        eventtitle = request.POST['edit_eventtitle']
        categories = request.POST['edit_categories']
        date = request.POST['edit_date']
        time = request.POST['edit_time']
        location = request.POST['edit_location']
        phonenumber = request.POST['edit_phonenumber']
        description = request.POST['edit_description']
        event_image = None  # Initialize event_image as None

        if 'edit_event_image' in request.FILES:  # Check if event_image file is uploaded
            event_image = request.FILES['edit_event_image']
        
        manager = get_or_create_user_by_username(clubmanager)
        club_instance, created = createclub.objects.get_or_create(clubname=clubname)
        # Create EventActivity object
        edit_event_activity = EditEventActivity(
            clubmanager=manager,
            clubvicemanager=clubvicemanager,
            clubname=club_instance,
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
        edit_event_activity.save()

        # Redirect to a success page or homepage
        return redirect('events')

    return render(request, 'pages/all-users-interface/event-page.html',{'event_activity': event_activity, 'activity': activity})

# admin Interface:
@login_required(login_url='usertype') 
# @allowed_users(allowed_roles=['admin'])
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

@login_required(login_url='usertype')   
# @allowed_users(allowed_roles=['admin'])  
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
                number_of_members=request.POST['numOfMembers']
                club_achievement1 = request.POST['clubAchievment1']
                club_achievement2 = request.POST['clubAchievment2']
                club_achievement3 = request.POST['clubAchievment3']
                club_achievement4 = request.POST['clubAchievment4']
                club_achievement5 = request.POST['clubAchievment5']
                
                profileimg = None
                bgimg = None

                if 'profile_club' in request.FILES:  # Check if profile image file is uploaded
                    profileimg = request.FILES['profile_club']
                if 'background_club' in request.FILES:  # Check if background image file is uploaded
                   bgimg = request.FILES['background_club']


               # try:
              #      manager = User.objects.get(username=clubmanager)
              #  except User.DoesNotExist:
                        # Handle the case where the user does not exist
                        # You might want to redirect the user to an error page or display a message
               #     return HttpResponse("Error: The specified club manager does not exist.")

                manager = get_or_create_user_by_username(clubmanager)

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
                    bgimg=bgimg,
                    number_of_members=number_of_members,
                    club_achievement1=club_achievement1,
                    club_achievement2=club_achievement2,
                    club_achievement3=club_achievement3,
                    club_achievement4=club_achievement4,
                    club_achievement5=club_achievement5,
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
        
@login_required(login_url='usertype')            
# @allowed_users(allowed_roles=['admin'])
def adminNotifications(request):
    posts = Post.objects.all().order_by('-pk')

    activities = EventActivity.objects.all().order_by('-pk')

    if request.method == 'POST':
        if 'update_activities' in request.POST:
            id_list = request.POST.getlist('boxes')
            activities.update(approved=False)
            activities.filter(id__in=id_list).update(approved=True)
            messages.success(request, "Event Activity Requests have been updated")
            return redirect('events')

        if 'update_reject' in request.POST:
            id_list = request.POST.getlist('boxes2')
            activities.update(rejected=False)
            activities.filter(id__in=id_list).update(rejected=True)
            messages.success(request, "Event Activity Requests have been updated")
            return redirect('adminNotifications')

        if 'update_posts' in request.POST:
            id_list = request.POST.getlist('boxes')
            posts.update(approved=False)
            posts.filter(id__in=id_list).update(approved=True)
            messages.success(request, "Event Post Requests have been updated")
            return redirect('clubs')

        if 'update_reject_post' in request.POST:
            id_list = request.POST.getlist('boxes2')
            posts.update(rejected=False)
            posts.filter(id__in=id_list).update(rejected=True)
            messages.success(request, "Event Post Requests have been updated")
            return redirect('adminNotifications')


        reason = request.POST.get('reason')
        selected_posts = request.POST.getlist('boxes2')
        for post_id in selected_posts:
            try:
                post = Post.objects.get(id=post_id)
                rejection = Rejections(reason=reason, post=post)
                rejection.save()
            except Post.DoesNotExist:
                pass

        selected_activities = request.POST.getlist('boxes2')
        for activity_id in selected_activities:
            try:
                activity = EventActivity.objects.get(id=activity_id)
                rejection = Rejections(reason=reason, event_activity=activity)
                rejection.save()
            except EventActivity.DoesNotExist:
                pass

        messages.success(request, "Rejection reasons for both posts and activities have been saved")
        return redirect('adminNotifications')

    context = {
        'posts': posts,
        'activities': activities,
    }

    return render(request, 'pages/sks-admin-interface/admin-notifications.html', context)

# manager Interface:

#@allowed_users(allowed_roles=['manager'])
def eventActivityForm(request): 
    if request.method == 'POST':
        # Retrieve form data
        clubmanager = request.POST.get('clubmanager')
        clubvicemanager = request.POST['clubvicemanager']
        clubname = request.POST.get('clubname')
        email = request.POST['email']
        eventtitle = request.POST['eventtitle']
        categories = request.POST['categories']
        date = request.POST['date']
        time = request.POST['time']
        location = request.POST['location']
        phonenumber = request.POST['phonenumber']
        description = request.POST['description']
        event_image = None  # Initialize event_image as None

        if 'event_image' in request.FILES:  # Check if event_image file is uploaded
            event_image = request.FILES['event_image']
        
        manager = get_or_create_user_by_username(clubmanager)
        club_instance, created = createclub.objects.get_or_create(clubname=clubname)
        # Create EventActivity object
        event_activity = EventActivity(
            clubmanager=manager,
            clubvicemanager=clubvicemanager,
            clubname=club_instance,
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

#@allowed_users(allowed_roles=['manager'])
def eventPostForm(request):
     if request.method == 'POST':   
            clubname = request.POST.get('clubname')
            clubmanager = request.POST.get('clubmanager')
            postdescription = request.POST['postdescription']
            eventtitle = request.POST['eventtitle']
            image = request.FILES['post_image']

            manager = get_or_create_user_by_username(clubmanager)
            club_instance, created = createclub.objects.get_or_create(clubname=clubname)
            
            new_post = Post.objects.create(
            clubname=club_instance,
            clubmanager=manager,
            image=image,
            postdescription=postdescription,
            eventtitle=eventtitle
             )
            new_post.save()
            return redirect('eventPostForm')
     else:
            return render(request, 'pages/club-manager-interface/event-post.html')

 
#@allowed_users(allowed_roles=['manager'])
def managerNotifications(request):
    posts = Post.objects.all().order_by('-pk')

    activities = EventActivity.objects.all().order_by('-pk')
    rejected_activities_with_reason = EventActivity.objects.filter(rejected=True).prefetch_related('rejection_reason')
    rejected_posts_with_reason = Post.objects.filter(rejected=True).prefetch_related('rejection_reason')

    context = {
        'posts': posts,
        'activities': activities,
        'rejected_activities_with_reason': rejected_activities_with_reason,
        'rejected_posts_with_reason': rejected_posts_with_reason,
    }  
    return render(request, 'pages/club-manager-interface/manager-notifications.html',context)
