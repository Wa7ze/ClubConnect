from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

User = get_user_model()
# Create your models here.

class clubProfile(models.Model):
    profileimg = models.ImageField(upload_to='profile_images', default='blank-profile-picture.png')  
    profileimg2 = models.ImageField(upload_to='profile_images2', default='blank-profile-picture.png')
    id_user = models.IntegerField()
    clubname = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profile_as_clubname')
    headline = models.CharField(max_length=300)
    location = models.CharField(max_length=100, blank=True)
    clubmanager =models.CharField(max_length=100)
    clubvicemanager = models.CharField(max_length=100)
    phonenumber1 = models.IntegerField()
    phonenumber2 = models.IntegerField()
    email = models.EmailField()
    category = models.CharField(max_length=100)
    clubvision = models.TextField()
    clubdescription = models.TextField()

    def _str_(self):
        return self.clubname.username
