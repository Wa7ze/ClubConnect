from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.backends import ModelBackend
import uuid
from datetime import datetime

User = get_user_model()

# Create your models here.

class createclub(models.Model):

    id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    profileimg = models.ImageField(upload_to='profile_images', default='blank-profile-picture.png')  
    bgimg = models.ImageField(upload_to='bg_image', default='blank-profile-picture.png')
    clubname =models.CharField(max_length=100)
    headline = models.CharField(max_length=300)
    location = models.CharField(max_length=100)
    clubmanager =models.ForeignKey(User, on_delete=models.CASCADE, related_name='managed_clubs')
    clubvicemanager = models.CharField(max_length=100)
    phonenumber1 = models.CharField(max_length=300)
    phonenumber2 = models.CharField(max_length=300)
    email = models.EmailField()
    category = models.CharField(max_length=100, choices=[('sport', 'Sport'), ('gaming', 'Gaming'), ('technology', 'Technology'), ('society', 'Society'), ('programming', 'Programming'), ('art', 'Art')])
    number_of_members = models.IntegerField(default=0)
    club_achievement1 = models.CharField(max_length=200, blank=True, null=True)
    club_achievement2 = models.CharField(max_length=200, blank=True, null=True)
    club_achievement3 = models.CharField(max_length=200, blank=True, null=True)
    club_achievement4 = models.CharField(max_length=200, blank=True, null=True)
    club_achievement5 = models.CharField(max_length=200, blank=True, null=True)
    clubvision = models.TextField()
    clubdescription = models.TextField()
    
    def __str__(self):
        return self.clubname

class Rejections(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    reason=models.TextField()    
    event_activity = models.ForeignKey('EventActivity', related_name='rejection_reason', on_delete=models.CASCADE, null=True, blank=True)
    # ForeignKey relationship with Post
    post = models.ForeignKey('Post', related_name='rejection_reason', on_delete=models.CASCADE, null=True, blank=True)
    edit_event = models.ForeignKey('EditEventActivity', related_name='rejection_reason', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.reason)


class Post(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    clubname=models.ForeignKey(createclub, on_delete=models.CASCADE, related_name='posts')
    clubmanager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts_managed', default=None)
    eventtitle=models.CharField(max_length=100)
    image=models.ImageField(upload_to='post_images')
    postdescription=models.TextField()
    created_at=models.DateTimeField(default=datetime.now)
    approved=models.BooleanField('Approved',default=False)
    rejected=models.BooleanField('Rejected',default=False)

    def __str__(self):
        return self.eventtitle
    
class EventActivity(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    clubmanager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='activites_managed', default=None)
    clubvicemanager = models.CharField(max_length=100)
    clubname = models.ForeignKey(createclub, on_delete=models.CASCADE, related_name='activities')
    email = models.EmailField()
    eventtitle = models.CharField(max_length=100)
    categories = models.CharField(max_length=100)
    event_image = models.ImageField(upload_to='event_images')  
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=100)
    phonenumber = models.CharField(max_length=100)
    description = models.TextField()
    approved=models.BooleanField('Approved',default=False)
    rejected=models.BooleanField('Rejected',default=False)
    edit_event = models.ForeignKey('EditEventActivity', on_delete=models.SET_NULL, null=True, blank=True, related_name='original_event')


    def __str__(self):
        return self.eventtitle
      
class EditEventActivity(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    clubmanager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='activites_managed_edit', default=None)
    clubvicemanager = models.CharField(max_length=100)
    clubname = models.ForeignKey(createclub, on_delete=models.CASCADE, related_name='activities_Edit')
    email = models.EmailField()
    eventtitle = models.CharField(max_length=100)
    categories = models.CharField(max_length=100)
    event_image = models.ImageField(upload_to='event_images')  
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=100)
    phonenumber = models.CharField(max_length=100)
    description = models.TextField()
    approved=models.BooleanField('Approved',default=False)
    rejected=models.BooleanField('Rejected',default=False)

    def __str__(self):
        return self.eventtitle
      