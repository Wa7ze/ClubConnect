import logging
from venv import logger
from django.http import Http404, HttpResponseForbidden
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.models import User, auth, Group
from django.contrib.auth import logout,login,authenticate
from django.contrib import messages
from .models import createclub,Post,EventActivity,Rejections,EditEventActivity,EditPost
from django.contrib.auth.decorators import login_required
from pages.authentication_backends import EmailAuthBackend
from .decorators import unauthenticated_user ,allowed_users
from datetime import datetime, timedelta
from django.core.exceptions import ObjectDoesNotExist

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


@login_required(login_url='usertype')   
def LogoutUser(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect('usertype')

# All Users Interface:
#@allowed_users(allowed_roles=['student','admin','manager'])
#@login_required(login_url='usertype') 
#@admin_only
@login_required(login_url='usertype')   
def homePage(request):
    home = createclub.objects.all()
    today = datetime.now().date()
    one_week_from_today = today + timedelta(days=7)

    event = EventActivity.objects.filter(date__range=[today, one_week_from_today])
    edit_activity = EditEventActivity.objects.filter(date__range=[today, one_week_from_today])
    return render(request, 'pages/all-users-interface/homepage.html',{'home':home ,'event':event,'edit_activity':edit_activity})

@login_required(login_url='usertype')
def events(request):
    activity= EventActivity.objects.filter(approved=True)
    edit_activity = EditEventActivity.objects.filter(approved=True)

    return render(request, 'pages/all-users-interface/events.html', {'activity': activity, 'edit_activity': edit_activity})


@login_required(login_url='usertype')   
def clubs(request):
    clubs = createclub.objects.all()
    return render(request, 'pages/all-users-interface/clubs.html',{'clubs': clubs})


@login_required(login_url='usertype')   
def myList(request):
    return render(request, 'pages/all-users-interface/my-list.html')

@login_required(login_url='usertype')   
def clubProfile(request,pk):
    club = get_object_or_404(createclub, pk = pk)
    activity= EventActivity.objects.filter(clubname=club)
    edit_activity= EditEventActivity.objects.filter(clubname=club)
    edit_post= EditPost.objects.filter(clubname=club)
    post=Post.objects.filter(clubname=club)
    
    if request.method == 'POST':   
            clubname = request.POST.get('clubname')
            clubmanager = request.POST.get('clubmanager')
            postdescription = request.POST['postdescription']
            eventtitle = request.POST['eventtitle']
            image = request.FILES['post_image']

            manager, created = User.objects.get_or_create(username=clubmanager)

            if not created:
                # If the user already exists, check if they are the manager of the club
                if club.clubmanager != manager:
                    return HttpResponseForbidden("You are not authorized to perform this action.")

            club_instance, created = createclub.objects.get_or_create(
                clubname=clubname,
                clubmanager=manager
            )

            new_post_edit = EditPost.objects.create(
                clubname=club_instance,
                clubmanager=manager,
                image=image,
                postdescription=postdescription,
                eventtitle=eventtitle
                )
            new_post_edit.save()

            # Update the related Post objects with the new EditPost
            for p in post:
                p.edit_post = new_post_edit
                p.save()
                return redirect('clubProfile', pk=pk)
    else:
         return render(request, 'pages/all-users-interface/club-profile.html', {'activity': activity , 'post':post , 'club':club,'edit_activity':edit_activity, 'edit_post':edit_post})

@login_required(login_url='usertype')   
def delete_club(request,pk):
    club = createclub.objects.get(pk=pk)
    club.delete()
    return redirect('clubs')

@login_required(login_url='usertype')   
def delete_event(request,pk):
    event_activity = EventActivity.objects.get(pk=pk)
    event_activity.delete()
    return redirect('events')


@login_required(login_url='usertype')   
def eventPage(request,pk):
    activity= EventActivity.objects.all()
    edit_activity = EditEventActivity.objects.all()

    try:
        # Try to retrieve an EventActivity with the provided pk
        event_activity = EventActivity.objects.get(pk=pk)
        edit_event_activity = None  # Set edit_event_activity to None as it's not an EditEventActivity
    except EventActivity.DoesNotExist:
        try:
            # If an EventActivity is not found, try to retrieve an EditEventActivity
            edit_event_activity = EditEventActivity.objects.get(pk=pk)
            event_activity = None  # Get the associated EventActivity
        except EditEventActivity.DoesNotExist:
            # If neither EventActivity nor EditEventActivity is found, raise a 404 error
            raise Http404("No EventActivity or EditEventActivity matches the given query.")

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
        event_image = None  

        if 'edit_event_image' in request.FILES:  
            event_image = request.FILES['edit_event_image']
        
        manager = get_or_create_user_by_username(clubmanager)
        club_instance, created = createclub.objects.get_or_create(clubname=clubname)
        

            #Create or update EditEventActivity object
        if edit_event_activity:
            # Update existing EditEventActivity
            edit_event_activity.clubmanager = manager
            edit_event_activity.clubvicemanager = clubvicemanager
            edit_event_activity.clubname = club_instance
            edit_event_activity.email = email
            edit_event_activity.eventtitle = eventtitle
            edit_event_activity.categories = categories
            if event_image:
                edit_event_activity.event_image = event_image
            edit_event_activity.date = date
            edit_event_activity.time = time
            edit_event_activity.location = location
            edit_event_activity.phonenumber = phonenumber
            edit_event_activity.description = description
            edit_event_activity.save()
        else:
            # Create new EditEventActivity
            edit_event_activity = EditEventActivity.objects.create(
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
        event_activity.edit_event = edit_event_activity
        event_activity.save()

        # Redirect to a success page or homepage
        return redirect('events')

    return render(request, 'pages/all-users-interface/event-page.html',{'event_activity': event_activity, 'activity': activity,'edit_event_activity': edit_event_activity,'edit_activity':edit_activity  })

# admin Interface:
@login_required(login_url='usertype') 
@allowed_users(allowed_roles=['admin'])
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
@allowed_users(allowed_roles=['admin'])  
def createNewClub(request):
        if request.method == 'POST':
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

                return redirect('createNewClub')
        else:
                return render(request, 'pages/sks-admin-interface/create-club-form.html')
        
@login_required(login_url='usertype')            
@allowed_users(allowed_roles=['admin'])
def adminNotifications(request):
    posts = Post.objects.all().order_by('-pk')
    events = EventActivity.objects.select_related('edit_event').all()
    post = Post.objects.select_related('edit_post').all()
    activities = EventActivity.objects.all().order_by('-pk')

    context = {
        'posts': posts,        
        'post': post,
        'activities': activities,
        'events': events
    }

    return render(request, 'pages/sks-admin-interface/admin-notifications.html', context)

def approve_or_reject_post(request):
    if request.method == 'POST':
        for post_id in request.POST.getlist('approve'):
            post = get_object_or_404(Post, pk=post_id)
            post.approved = True
            post.rejected = False
            post.save()

        for post_id in request.POST.getlist('reject'):
            post = get_object_or_404(Post, pk=post_id)
            post.rejected = True
            post.approved = False

            reason = request.POST.get(f'reason_{post_id}')
            rejection = Rejections(reason=reason, post=post)
            rejection.save()

            post.save()

    return redirect('adminNotifications')

def approve_or_reject_event(request):
    if request.method == 'POST':

            for event_id in request.POST.getlist('approve'):
                event = get_object_or_404(EventActivity, pk=event_id)
                event.approved = True
                event.rejected = False
                event.save()

            for event_id in request.POST.getlist('reject'):
                event = get_object_or_404(EventActivity, pk=event_id)
                event.rejected = True
                event.approved = False

                reason = request.POST.get(f'reason_{event_id}')
                rejection = Rejections(reason=reason, event_activity=event)
                rejection.save()

                event.save()

    return redirect('adminNotifications')

def approve_or_reject_edited_post(request):
    events = EventActivity.objects.select_related('edit_event').all()
    post = Post.objects.select_related('edit_post').all()

    if request.method == 'POST':
            for pst in post:
                if pst.edit_post and str(pst.edit_post.id) in request.POST.getlist('approve'):
                        pst.edit_post.approved = True
                        pst.edit_post.rejected = False
                        pst.edit_post.save()
                        pst.approved = False
                        pst.rejected= True
                        pst.save()    
            for pst in post:
                if pst.edit_post and str(pst.edit_post.id) in request.POST.getlist('reject'):
                        pst.edit_post.rejected = True
                        pst.edit_post.approved = False
                        pst.edit_post.save()
                        pst.rejected = False
                        pst.approved = True
                        pst.save()
                        reason = request.POST.get(f'reason_{pst.edit_post.id}')
                        if reason:
                             rejection = Rejections(reason=reason, edit_post=pst.edit_post)
                             rejection.save()

            

            for event in events:
                if event.edit_event and str(event.edit_event.id) in request.POST.getlist('approve'):
                        event.edit_event.approved = True
                        event.edit_event.rejected = False
                        event.edit_event.save()
                        event.approved = False
                        event.rejected = True
                        event.save()
            for event in events:
                if event.edit_event and str(event.edit_event.id) in request.POST.getlist('reject'):                        
                        event.edit_event.rejected = True
                        event.edit_event.approved = False
                        event.edit_event.save()
                        event.rejected = False
                        event.approved = True
                        event.save()
                        reason = request.POST.get(f'reason_{event.edit_event.id}')
                        if reason:
                            rejection = Rejections(reason=reason, edit_event=event.edit_event)
                            rejection.save()
               
            

    return redirect('adminNotifications')

# manager Interface:

@login_required(login_url='usertype')   
@allowed_users(allowed_roles=['manager'])
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
        
        manager = request.user

        if manager.username == clubmanager:
            try:
                club_instance = createclub.objects.get(clubname=clubname, clubmanager=manager)
            except createclub.DoesNotExist:
                return HttpResponseForbidden("The club does not exist or is not associated with the logged-in manager.")
                
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
            event_activity.save()
            return redirect('eventActivityForm')
        else:
            return HttpResponseForbidden("You are not authorized to perform this action.")
    else:
        return render(request, 'pages/club-manager-interface/event-activity.html')

@login_required(login_url='usertype')   
@allowed_users(allowed_roles=['manager'])
def eventPostForm(request):
     if request.method == 'POST':   
            clubname = request.POST.get('clubname')
            clubmanager = request.POST.get('clubmanager')
            postdescription = request.POST['postdescription']
            eventtitle = request.POST['eventtitle']
            image = request.FILES['post_image']

            manager = request.user

            if manager.username == clubmanager:
                try:
                    club_instance = createclub.objects.get(clubname=clubname, clubmanager=manager)
                except createclub.DoesNotExist:
                    return HttpResponseForbidden("The club does not exist or is not associated with the logged-in manager.")
                
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
                return HttpResponseForbidden("You are not authorized to perform this action.")
     else:
            return render(request, 'pages/club-manager-interface/event-post.html')

@login_required(login_url='usertype')    
@allowed_users(allowed_roles=['manager'])
def managerNotifications(request):
    club = get_object_or_404(createclub, clubmanager=request.user)    
    activities= EventActivity.objects.filter(clubname=club).order_by('-pk')
    posts=Post.objects.filter(clubname=club).order_by('-pk')
    editedactivities = EditEventActivity.objects.all().order_by('-pk')
    rejected_activities_with_reason = EventActivity.objects.filter(rejected=True).prefetch_related('rejection_reason')
    edited_rejected_activities_with_reason = EditEventActivity.objects.filter(rejected=True).prefetch_related('rejection_reason')
    rejected_posts_with_reason = Post.objects.filter(rejected=True).prefetch_related('rejection_reason')

    context = {
        'posts': posts,
        'club': club,
        'activities': activities,        
        'editedactivities': editedactivities,
        'rejected_activities_with_reason': rejected_activities_with_reason,
        'rejected_posts_with_reason': rejected_posts_with_reason,
        'edited_rejected_activities_with_reason': edited_rejected_activities_with_reason,
    }  
    return render(request, 'pages/club-manager-interface/manager-notifications.html',context)
