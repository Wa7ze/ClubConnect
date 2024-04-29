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
    clubvision = models.TextField()
    clubdescription = models.TextField()
    
    def __str__(self):
        return self.clubname

class Rejections(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    reason=models.TextField()    
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

    def __str__(self):
        return self.eventtitle
      
