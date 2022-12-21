import json
import h5py
import numpy as np

from base.models import InvoiceItem, Customer
from base.util.ml import recommendations
from base.util.util import h5_data_path


def save_model():
    data = InvoiceItem.objects.all().select_related('invoice__customer', 'stock__item').values_list(
        'stock__item__item_code',
        'invoice__customer__customer_code',
        'quantity',
        'stock__item__name',
        'invoice__customer__phone_number',
    )
    data = np.array(data, dtype=object)
    hf = h5py.File(h5_data_path(), 'w')

    item_codes = [x[0] for x in data]
    customer_codes = [x[1] for x in data]
    quantities = [x[2] for x in data]
    item_names = [x[3] for x in data]
    phone_numbers = [x[4] for x in data]
    phone_numbers = np.unique(phone_numbers)
    string_dt = h5py.special_dtype(vlen=str)

    data = recommendations(item_codes, customer_codes, quantities, item_names)
    data = np.array(data)

    for index in range(phone_numbers.__len__()):
        # print(f'{phone_numbers[index]}, {data[index]}')
        p = phone_numbers[index]
        d = np.array(data[index], dtype=string_dt)
        hf.create_dataset(p, data=d)

    hf.close()

    # from base.util.cache import *
    # 02-009-010836


def get_model_data(phone_number):
    hf = h5py.File(h5_data_path(), 'r')
    data = np.array(hf.get(phone_number))
    return data.tolist()
