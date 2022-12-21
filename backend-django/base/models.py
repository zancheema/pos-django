from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser, BaseUserManager


class Category(models.Model):
    name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)


class Brand(models.Model):
    name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)


class Item(models.Model):
    item_code = models.CharField(
        max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    purchase_price = models.FloatField(default=0)
    retail_price = models.FloatField(default=0)
    category = models.ForeignKey(
        Category, null=True, on_delete=models.RESTRICT)
    brand = models.ForeignKey(Brand, null=True, on_delete=models.RESTRICT)
    is_active = models.BooleanField(default=True)


class Stock(models.Model):
    item = models.ForeignKey(Item, null=True, on_delete=models.RESTRICT)
    batch_no = models.PositiveBigIntegerField()
    quantity = models.PositiveIntegerField()


class Customer(models.Model):
    customer_code = models.CharField(
        max_length=50, primary_key=True)
    phone_number = models.CharField(max_length=15)


class Invoice(models.Model):
    invoice_no = models.CharField(
        max_length=50, primary_key=True)
    created_at = models.DateField(default=timezone.now().date())
    customer = models.ForeignKey(
        Customer, null=True, on_delete=models.RESTRICT)


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, null=True, on_delete=models.RESTRICT)
    stock = models.ForeignKey(Stock, null=True, on_delete=models.RESTRICT)
    quantity = models.PositiveIntegerField()


class Activity(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.TextField()

################ USERS #################


class UserManager(BaseUserManager):
    def create_user(self, username, password, email):
        if not username:
            raise ValueError('UserName Required')

        if not password:
            raise ValueError('Password Required')

        if not email:
            raise ValueError('Email Required')

        user = self.model(
            username=username,
            email=email
        )
        user.set_password(password)
        user.is_active = True
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, email):
        if not username:
            raise ValueError('UserName Required')

        if not password:
            raise ValueError('Password Required')

        if not email:
            raise ValueError('Email Required')

        user = self.model(
            username=username,
            email=email
        )
        print(user)
        user.set_password = password
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractUser):

    class Meta:
        db_table = 'auth_user'
    fields = '__all__'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password', 'email']

    object = UserManager()

    def __str__(self):
        return self.username
