from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
import uuid
from datetime import datetime

User = get_user_model()
# Create your models here.

class createclub(models.Model):
    profileimg = models.ImageField(upload_to='profile_images', default='blank-profile-picture.png')  
    profileimg2 = models.ImageField(upload_to='profile_images2', default='blank-profile-picture.png')
    clubname =models.CharField(max_length=100)
    headline = models.CharField(max_length=300)
    location = models.CharField(max_length=100)
    clubmanager =models.ForeignKey(User, on_delete=models.CASCADE, related_name='managed_clubs')
    clubvicemanager = models.CharField(max_length=100)
    phonenumber1 = models.IntegerField()
    phonenumber2 = models.IntegerField()
    email = models.EmailField()
    category = models.CharField(max_length=100, choices=[('sport', 'Sport'), ('gaming', 'Gaming'), ('technology', 'Technology'), ('society', 'Society'), ('programming', 'Programming'), ('art', 'Art')])
    clubvision = models.TextField()
    clubdescription = models.TextField()

    def _str_(self):
        return self.clubname.username

class Post(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    clubmanager= models.CharField(max_length=100)
    clubvicemanager =models.CharField(max_length=100)
    clubname=models.CharField(max_length=100)
    phonenumber1 =models.IntegerField()
    eventtitle=models.CharField(max_length=100)
    image=models.ImageField(upload_to='post_images')
    postdescription=models.TextField()
    created_at=models.DateTimeField(default=datetime.now)
    
    def __str__(self):
        return self.eventtitle
    
class EventActivity(models.Model):
    clubmanager= models.CharField(max_length=100)
    clubvicemanager = models.CharField(max_length=100)
    clubname = models.CharField(max_length=100)
    email = models.EmailField()
    eventtitle = models.CharField(max_length=100)
    categories = models.CharField(max_length=100)
    event_image = models.ImageField(upload_to='event_images')  
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=100)
    phonenumber = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.eventtitle  # Return a meaningful representation of the event title
