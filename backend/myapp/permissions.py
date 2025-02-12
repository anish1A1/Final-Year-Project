from rest_framework.permissions import BasePermission

class HasRole(BasePermission):
    def has_permission(self, request, view):
        required_role = getattr(view, 'required_role', None)
        if required_role:
            return request.user.user_roles.filter(role__name =required_role)
        return False
    
    # HasRole will check if the user has the required role specified in the required_role

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user            
    #This will check if the user the object is belonging to is equal to the user making the request. 
    # This is used to ensure that only the owner of an object can access it.


class IsEquipmentOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.equipment.user == request.user
