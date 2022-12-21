import pandas as pd

from base.models import *

raw_data = pd.read_csv("sampledata/sales-data.csv")
raw_data = raw_data.dropna()
raw_data = raw_data.sample(10000)
print(f"raw_data: {raw_data.head()}")
print(f'\ndescription: {raw_data.describe()}')

# delete if exists
InvoiceItem.objects.all().delete()
Invoice.objects.all().delete()
Stock.objects.all().delete()
Item.objects.all().delete()
Brand.objects.all().delete()
Category.objects.all().delete()
Customer.objects.all().delete()
print("\ndatabase cleared")

# create category and brand to meet map data
category = Category(name='Spare Parts')
category.save()
brand = Brand(name='Honda')
brand.save()
print(f'\ncreated {category}, {brand}')

# insert items
items_data = raw_data[['item-code', 'item-name', 'sale-amount']]
items_data = items_data.drop_duplicates('item-code')
for index, row in items_data.iterrows():
    Item(item_code=row[0], name=row[1], category=category, brand=brand,
         purchase_price=row[2], retail_price=row[2]).save()
print(f'{items_data.__len__()} items saved.')

# insert stock
stocks_data = raw_data[['item-code', 'qty']]
stocks_data = stocks_data.drop_duplicates('item-code')
for index, row in stocks_data.iterrows():
    Stock(
        item=Item.objects.filter(pk=row[0]).first(),
        batch_no=1,
        quantity=row[1],
    ).save()
print(f'{stocks_data.__len__()} stocks saved.')

# insert customers
customers_data = raw_data[['cust-code']]
customers_data = customers_data.drop_duplicates('cust-code')
for index, row in customers_data.iterrows():
    Customer(customer_code=row[0],
             phone_number=row[0]).save()
print(f'{customers_data.__len__()} customers saved.')

# save invoices
invoices_data = raw_data[['invoice-no', 'invoice-date', 'cust-code']]
invoices_data = invoices_data.drop_duplicates('invoice-no')
for index, row in invoices_data.iterrows():
    day, month, year = row[1].replace('/', '-').split('-')
    date_str = f'{year}-{month}-{day}'
    Invoice(
        invoice_no=row[0],
        created_at=date_str,
        customer=Customer.objects.filter(pk=row[2]).first(),
    ).save()
print(f'{invoices_data.__len__()} invoices saved.')

# save invoice items
invoice_items_data = raw_data[['invoice-no', 'item-code', 'qty']]
for index, row in invoice_items_data.iterrows():
    invoice = Invoice.objects.filter(pk=row[0]).first()
    item = Item.objects.filter(pk=row[1]).first()
    stock = Stock.objects.filter(item=item).first()
    quantity = row[2]
    InvoiceItem(invoice=invoice, stock=stock, quantity=quantity).save()
print(f'{invoice_items_data.__len__()} invoice items saved.')
