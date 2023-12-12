from django.contrib import admin
from api.models import Blog, CustomUser
from django.contrib.auth.admin import UserAdmin

class UserModelAdmin(UserAdmin):
  list_display = ('id', 'email', 'name', 'is_admin')
  list_filter = ('is_admin',)
  fieldsets = (
      ('User Credentials', {'fields': ('email', 'password')}),
      ('Personal info', {'fields': ('name',)}),
      ('Permissions', {'fields': ('is_admin',)}),
  )
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'name', 'password'),
      }),
  )
  search_fields = ('email',)
  ordering = ('email', 'id')
  filter_horizontal = ()

admin.site.register(CustomUser, UserModelAdmin)
admin.site.register(Blog)