from rest_framework import pagination


class SpendingPaginator(pagination.PageNumberPagination):
    page_size = 20
