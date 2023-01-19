from django.shortcuts import render

# Create your views here.


def index(request):
    if request.method == 'POST':
        username = request.POST['username']
        room_name = request.POST['room_name']
        return render(request, 'room.html', {'username': username, 'room_name': room_name})
    else:
        return render(request, 'index.html')
