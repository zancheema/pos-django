import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from base.models import Brand, Category, Customer, Invoice, InvoiceItem, Item, Stock, User
from base.serializers import AddItemSerializer, BrandSerializer, CategorySerializer, CustomerSerializer, InvoiceItemSerializer, InvoiceSerializer, ItemsSerializer, AddStockSerializer, StocksSerializer, UserSerializer
from base.util.ml import category_distribution, most_bought_items, recommendations, sales
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from base.util.cache import get_model_data


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=201)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        category = Category.objects.filter(pk=request.data['id']).first()
        serializer.update(category, serializer.data)
        return Response(serializer.data)
    return Response(status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_category(request, id):
    category = Category.objects.filter(pk=id).first()
    if category == None:
        return Response(status=404)
    try:
        category.delete()
    except:
        return Response(status=405)
    return Response(status=202)

############################################################


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_brands(request):
    name = request.GET.get('name', '')
    if name == '':
        brands = Brand.objects.all()
        serializer = BrandSerializer(brands, many=True)
    else:
        brand = Brand.objects.filter(name=name).first()
        serializer = BrandSerializer(brand, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_brand(request):
    serializer = BrandSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_brand(request):
    serializer = BrandSerializer(data=request.data)
    if serializer.is_valid():
        brand = Brand.objects.filter(pk=request.data['id']).first()
        serializer.update(brand, serializer.data)
        return Response(serializer.data)
    return Response(status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_brand(request, id):
    brand = Brand.objects.filter(pk=id).first()
    if brand == None:
        return Response(status=404)
    try:
        brand.delete()
    except:
        return Response(status=405)
    return Response(status=202)

############################################################


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_items(request):
    items = Item.objects.select_related('category', 'brand')
    serializer = ItemsSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_item(request):
    print(f'add_item: {request.data}')
    serializer = AddItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_item(request):
    serializer = ItemsSerializer(data=request.data)
    if serializer.is_valid():
        item = Item.objects.filter(pk=request.data['id']).first()
        serializer.update(item, serializer.data)
        return Response(serializer.data)
    return Response(status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_item(request, item_code):
    item = Item.objects.filter(pk=item_code).first()
    if item == None:
        return Response(status=404)
    try:
        item.delete()
    except:
        return Response(status=405)
    return Response(status=202)

############################################################


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_stocks(request):
    print('get_stocks called.')
    stocks = Stock.objects.select_related('item')[:50]
    serializer = StocksSerializer(stocks, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_stock(request):
    serializer = AddStockSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_stock(request):
    serializer = StocksSerializer(data=request.data)
    if serializer.is_valid():
        stock = Stock.objects.filter(pk=request.data['id']).first()
        serializer.update(stock, serializer.data)
        return Response(serializer.data)
    return Response(status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_stock(request, id):
    stock = Stock.objects.filter(pk=id).first()
    if stock == None:
        return Response(status=404)
    stock.delete()
    return Response(status=202)

############################################################


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_customers(request):
    customers = Customer.objects.all()
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def put_customer(request):
    serializer = CustomerSerializer(request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

############################################################


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_invoices(request):
    invoices = Invoice.objects.all()
    serializer = InvoiceSerializer(invoices, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_invoice(request):
    serializer = InvoiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

############################################################


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_invoice_items(request):
    invoice_items = InvoiceItem.objects.all()
    serializer = InvoiceItemSerializer(invoice_items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_invoice_item(request):
    serializer = InvoiceItemSerializer(data=request.data)
    if serializer.is_valid():
        stock = Stock.objects.filter(pk=request.data['stock']).first()
        remaining_stock = stock.quantity - request.data['quantity']
        if remaining_stock < 0:
            return Response(status=405)
        elif remaining_stock == 0:
            stock.delete()
            return Response(request.data)
        stock.quantity = remaining_stock
        stock.save()
        serializer.save()
    return Response(serializer.data)

############################################################


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_most_bought_items(request):
    invoice_items = InvoiceItem.objects.select_related('stock__item')
    items = most_bought_items(invoice_items)

    return JsonResponse(items, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_category_distribution(request):
    dist = category_distribution()
    return JsonResponse(dist, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_sales(request):
    sales_data = sales()
    print(f'returning sales response: {sales_data}')
    return JsonResponse(sales_data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recommendations(request, phone_number):
    return Response(get_model_data(phone_number))


###################### Users #######################

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def add_user(request):
    try:
        data = JSONParser().parse(request)
        print(f'request data: {data}')
        User.object.create_user(
            data['username'], data['password'], data['email'])
        return Response('User Created Successfuly.')
    except Exception as e:  # work on python 2.x
        print('Failed to upload to ftp: ', str(e))
        return Response('User Not Created.')
