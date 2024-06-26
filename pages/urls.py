from django.urls import path
from . import views
import uuid

urlpatterns = [
    path('', views.userType, name = 'usertype'),
    path('login-admin', views.adminLogin, name = 'adminLogin'),
    path('login-manager', views.managerLogin, name = 'managerLogin'),
    path('login-student', views.studentLogin, name = 'studentLogin'),
    path('signup-student', views.studentSignup, name = 'studentSignup'),
    path('logout', views.LogoutUser, name = 'logout'),
    path('dashboard', views.adminBoard, name = 'adminBoard'),
    path('event-activity-form', views.eventActivityForm, name = 'eventActivityForm'),
    path('event-post-form', views.eventPostForm, name = 'eventPostForm'),
    path('home', views.homePage, name = 'homePage'),
    path('events', views.events, name = 'events'),
    path('clubs', views.clubs, name = 'clubs'),
    path('my-list', views.myList, name = 'myList'),
    path('club Profile/<uuid:pk>', views.clubProfile, name = 'clubProfile'),
    path('create a new club', views.createNewClub, name = 'createNewClub'),
    path('admin-notifications', views.adminNotifications, name = 'adminNotifications'),
    path('manager-notifications', views.managerNotifications, name = 'managerNotifications'),
    path('event-page/<uuid:pk>', views.eventPage, name = 'eventPage'),
   
]