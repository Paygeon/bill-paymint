import React, { useState } from 'react';
import DatePickerComponent from './DatePickerComponent';
import { v4 as uuidv4 } from 'uuid';
import './styles.css';

interface FormData {
  invoice_id: string;
  invoice_amount: string;
  invoice_date: Date | null;
  due_date: Date | null;
  merchant_name: string;
}

interface ManualInputComponentProps {
  handleSubmit: (formData: FormData) => void;
}

const ManualInputComponent: React.FC<ManualInputComponentProps> = ({ handleSubmit }) => {
  const initialFormData: FormData = {
    invoice_id: uuidv4(),
    invoice_amount: '',
    invoice_date: null,
    due_date: null,
    merchant_name: ''
  };

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData(initialFormData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInvoiceDateChange = (date: Date | null) => {
    setFormData({ ...formData, invoice_date: date });
  };

  const handleDueDateChange = (date: Date | null) => {
    setFormData({ ...formData, due_date: date });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.merchant_name != '' && formData.invoice_amount != '' && formData.invoice_date && formData.due_date) {
      handleSubmit(formData);
      handleCloseForm();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <button onClick={handleOpenForm} className='custom-button' disabled={showForm}>
        Add manually
      </button>

      {showForm && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-25 z-index-1000'>
          <div className='bg-black p-4 rounded shadow-md w-[23em] z-index-1001'>
            <h2 className='text-2xl font-bold mb-4 text-center'>New Invoice</h2>
            <hr className='separating-line' style={{ width: '100%', margin: '0px', marginBottom: '10px' }} />
            <form onSubmit={onSubmit}>
              <div className='mb-4'>
                <label htmlFor='merchant_name' className='block mb-2'>
                  Merchant Name
                </label>
                <input
                  type='text'
                  id='merchant_name'
                  name='merchant_name'
                  value={formData.merchant_name}
                  onChange={handleInputChange}
                  className='rounded border leading-tight w-full py-2 px-3 text-gray-700 focus:outline-none'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='invoice_amount' className='block mb-2'>
                  Amount (in USD)
                </label>
                <input
                  type='number'
                  id='invoice_amount'
                  name='invoice_amount'
                  value={formData.invoice_amount}
                  onChange={handleInputChange}
                  className='rounded border leading-tight w-full py-2 px-3 text-gray-700 focus:outline-none'
                />
              </div>
              <DatePickerComponent
                id='invoice_date'
                selectedDate={formData.invoice_date}
                onChange={handleInvoiceDateChange}
                maxDate={new Date()}
                label='Invoice Date'
              />
              <DatePickerComponent
                id='due_date'
                selectedDate={formData.due_date}
                onChange={handleDueDateChange}
                minDate={new Date()}
                label='Due Date'
              />
              <div style={{ display: 'flex', width: '100%' }}>
                <button type='submit' className='form-button save-button'>
                  Save
                </button>
                <button type='button' onClick={handleCloseForm} className='form-button cancel-button'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualInputComponent;