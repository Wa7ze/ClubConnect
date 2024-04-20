from django.contrib import admin
from .models import createclub,Post,EventActivity

# Register your models here.
admin.site.register(createclub)
admin.site.register(Post)
admin.site.register(EventActivity)