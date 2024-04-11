from django.shortcuts import render

# registration:

def userType(request):
    return render(request, 'pages/registration-form/userType.html')

def adminLogin(request):
    return render(request, 'pages/registration-form/admin-login.html')

def managerLogin(request):
    return render(request, 'pages/registration-form/manager-login.html')

def studentLogin(request):
    return render(request, 'pages/registration-form/student-login.html')

def studentSignup(request):
    return render(request, 'pages/registration-form/student-signup.html')



# admin Interface:

def adminBoard(request):
    return render(request, 'pages/sks-admin-interface/admin-board.html')

def clubProfile(request):
    return render(request, 'pages/sks-admin-interface/club-profile.html')

def createNewClub(request):
    return render(request, 'pages/sks-admin-interface/create-club-form.html')

# manager Interface:

def eventActivityForm(request):
    return render(request, 'pages/club-manager-interface/event-activity.html')

def eventPostForm(request):
    return render(request, 'pages/club-manager-interface/event-post.html')

#student-interface

def homePage(request):
    return render(request, 'pages/student-interface/homepage.html')

def events(request):
    return render(request, 'pages/student-interface/events.html')

def clubs(request):
    return render(request, 'pages/student-interface/clubs.html')

def myList(request):
    return render(request, 'pages/student-interface/my-list.html')



