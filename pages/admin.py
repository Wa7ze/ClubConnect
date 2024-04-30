from django.contrib import admin
from .models import createclub,Post,EventActivity,Rejections,EditEventActivity

# Register your models here.
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['eventtitle','clubname','date','time','location','categories']
    search_fields = ['eventtitle']
    list_filter = ['categories']

class PostAdmin(admin.ModelAdmin):
    list_display = ['eventtitle','clubname','id','created_at']
    search_fields = ['eventtitle']


admin.site.register(createclub)
admin.site.register(Post,PostAdmin)
admin.site.register(EventActivity,ActivityAdmin)
admin.site.register(Rejections)
admin.site.register(EditEventActivity)

admin.site.site_header = 'ClubConnect'
admin.site.site_title = 'ClubConnect'