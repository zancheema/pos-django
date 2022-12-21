from operator import indexOf
from base.models import Category, Item, InvoiceItem
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from numpy.linalg import svd


def sales():
    print('sales()')
    invoice_items = InvoiceItem.objects.select_related('invoice')
    dates = [x.invoice.created_at.year for x in invoice_items]
    dates = [str(x).split()[0].split("-")[0] for x in dates]
    quantities = [x.quantity for x in invoice_items]

    data = {'dates': dates, 'quantities': quantities}
    df = pd.DataFrame(data)

    grouped_data = df.groupby(['dates']).sum()
    grouped_data_dict = grouped_data.to_dict()['quantities']

    result = [
        {'date': x, 'quantity': grouped_data_dict[x]}
        for x in grouped_data_dict.keys()
    ]
    print('sales() processed.')

    return result


def most_bought_items(invoice_items, max_length=3):
    item_ids = [x.stock.item.item_code for x in invoice_items]
    quantities = [x.quantity for x in invoice_items]
    data = {'item_id': item_ids, 'qty': quantities}
    df = pd.DataFrame(data=data)

    grouped_data = df.groupby(['item_id']).sum()
    grouped_data = grouped_data.sort_values('qty', ascending=False)
    print(f'grouped_data: {grouped_data}')
    grouped_data_dict = grouped_data.to_dict()['qty']
    # print(f'grouped_data_dict: {grouped_data_dict}')

    result = list(map(
        lambda x: {
            'item_id': x,
            'quantity': grouped_data_dict[x]
        },
        grouped_data_dict.keys()
    ))
    result = result[:max_length]
    for object in result:
        item = Item.objects.filter(pk=object['item_id']).first()
        object['item_name'] = item.name

    if result.__len__() > max_length:
        result = result[:max_length]

    return result[:max_length]


def category_distribution():
    invoice_items = InvoiceItem.objects.select_related('stock__item__category')
    category_ids = [x.stock.item.category.id for x in invoice_items]
    quantities = [x.quantity for x in invoice_items]

    data = {'category_id': category_ids, 'qty': quantities}
    df = pd.DataFrame(data=data)

    grouped_data = df.groupby(['category_id']).sum()
    grouped_data_dict = grouped_data.to_dict()['qty']

    result = list(map(
        lambda x: {
            'category_id': x,
            'quantity': grouped_data_dict[x]
        },
        grouped_data_dict.keys()
    ))
    categories = Category.objects.all()
    for object in result:
        category = categories.filter(id=object['category_id']).first()
        object['category_name'] = category.name

    return result


def recommendations(item_code, customer_code, quantity, item_name, ):
    data = pd.DataFrame({
        'item_code': item_code,
        'customer_code': customer_code,
        'quantity': quantity
    })

    grouped_data = data.groupby(['customer_code', 'item_code']).sum()

    customer_id = [x[0] for x in grouped_data.index]
    customer_id.sort()
    customer_id = np.unique(customer_id)
    stock_code = [x[1] for x in grouped_data.index]
    stock_code.sort()
    stock_code = np.unique(stock_code)

    rating = pd.DataFrame(index=customer_id, columns=stock_code)
    rating = rating.fillna(0)

    for index in grouped_data.index:
        cid = index[0]  # customer id
        sc = index[1]  # stock code
        rating.loc[cid][sc] = grouped_data.loc[index]

    encoder = LabelEncoder()
    enc_rating = rating.copy()
    enc_rating.index = encoder.fit_transform(rating.index)
    enc_rating.columns = encoder.fit_transform(rating.columns)

    scaler = MinMaxScaler()
    scaler.fit(enc_rating)
    normalized_rating = scaler.transform(enc_rating)

    U, sigma, Vt = svd(normalized_rating)

    drop_percentage = 20  # drop last 20%
    # number of rows/columns to drop
    drop_size = int(drop_percentage * sigma.size / 100)
    size_to_keep = sigma.size - drop_size

    U = [row[:size_to_keep] for row in U]  # drop last 20% columns
    sigma = sigma[:size_to_keep]
    Vt = Vt[:size_to_keep]  # drop last 20% rows

    # convert sigma from vector to diognal matrix
    sigma = np.diag(sigma)

    reconstructed_matrix = np.dot(np.dot(U, sigma), Vt)

    drop_zeros(reconstructed_matrix)

    recommended_items_size = min(reconstructed_matrix[0].__len__(), 5)

    recomended_products = []
    for row in reconstructed_matrix:
        recomended_products.append(
            get_max_elements_indices(row, recommended_items_size))


    recomended_product_ids = []
    product_ids = rating.columns.copy()
    for i in range(recomended_products.__len__()):
        recomended_product_ids.append([])
        for j in range(recomended_products[i].__len__()):
            product_id_index = recomended_products[i][j]
            product_id = product_ids[product_id_index]
            recomended_product_ids[i].append(product_id)

    description = pd.DataFrame(
        {'item_code': item_code, 'item_name': item_name})
    description = description.groupby('item_code').first()['item_name']
    # description.index = description.index.astype(str)

    size = 10
    top_purchase_ids = []

    for i in range(rating.__len__()):
        elements = get_max_elements_indices(
            rating.iloc[i], recommended_items_size).values
        top_purchase_ids.append(elements)

    # DataFrame representing product descriptions for top purchases
    top_purchase_descriptions = []
    for i in range(top_purchase_ids.__len__()):
        top_purchase_descriptions.append([])
        for j in range(top_purchase_ids[i].__len__()):
            pid = top_purchase_ids[i][j]
            product = description[pid]
            top_purchase_descriptions[i].append(product)

    # DataFrame representing product descriptions for recomended products
    recomended_product_descriptions = recomended_product_ids.copy()
    for i in range(recomended_product_ids.__len__()):
        for j in range(recomended_product_ids[i].__len__()):
            pid = recomended_product_ids[i][j]
            product = description[pid]
            recomended_product_descriptions[i][j] = product

    # phone_number_index = np.where(customer_id == phone_number)[0][0]
    # print(f'phone_number_index: {phone_number_index}')

    return recomended_product_descriptions


# number of non-zero values (greater than 0)
# this is a debug function and can be removed from actural code

def non_zeros_count(two_d_matrix):
    count = 0
    for i in range(two_d_matrix.__len__()):
        for j in range(two_d_matrix[i].__len__()):
            if two_d_matrix[i][j] > 0:
                count = count + 1
    return count


# convert zero values of reconstructed matrix to 0 that are belo 0.1
def drop_zeros(two_d_matrix):
    for i in range(two_d_matrix.__len__()):
        for j in range(two_d_matrix[i].__len__()):
            if two_d_matrix[i][j] < 0.1:
                two_d_matrix[i][j] = 0


# get maximum 5 entries from each row of matrix
# these 5 entries will be the recomended items to the user
def get_max_elements_indices(arr, n):
    return np.argpartition(arr, -n)[-n:]
