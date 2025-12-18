from rest_framework import permissions

class IsQuizCreatorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow creators of a quiz to edit or delete it.
    Read-only is allowed for everyone.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the creator
        return obj.creator == request.user
