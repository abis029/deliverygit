import React, { useState } from 'react';
import LayoutNew from '../Layout';

import {Layout, theme, Cascader, Button, message, Form, Input, Steps, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;

// Residences data for the form
const residences = [
  {
    value: 'central',
    label: 'Central',
    children: [
      { value: 'kandy', label: 'Kandy' },
      { value: 'matale', label: 'Matale' },
      { value: 'nuwaraEliya', label: 'Nuwara Eliya' }
    ],
  },
  {
    value: 'eastern',
    label: 'Eastern',
    children: [
      { value: 'batticaloa', label: 'Batticaloa' },
      { value: 'ampara', label: 'Ampara' },
      { value: 'trincomalee', label: 'Trincomalee' }
    ],
  },
  {
    value: 'northern',
    label: 'Northern',
    children: [
      { value: 'jaffna', label: 'Jaffna' },
      { value: 'kilinochchi', label: 'Kilinochchi' },
      { value: 'mannar', label: 'Mannar' },
      { value: 'mullaitivu', label: 'Mullaitivu' },
      { value: 'vavuniya', label: 'Vavuniya' }
    ],
  },
  {
    value: 'northCentral',
    label: 'North Central',
    children: [
      { value: 'anuradhapura', label: 'Anuradhapura' },
      { value: 'polonnaruwa', label: 'Polonnaruwa' }
    ],
  },
  {
    value: 'northWestern',
    label: 'North Western',
    children: [
      { value: 'kurunegala', label: 'Kurunegala' },
      { value: 'puttalam', label: 'Puttalam' }
    ],
  },
  {
    value: 'sabaragamuwa',
    label: 'Sabaragamuwa',
    children: [
      { value: 'ratnapura', label: 'Ratnapura' },
      { value: 'kegalle', label: 'Kegalle' }
    ],
  },
  {
    value: 'southern',
    label: 'Southern',
    children: [
      { value: 'galle', label: 'Galle' },
      { value: 'matara', label: 'Matara' },
      { value: 'hambantota', label: 'Hambantota' }
    ],
  },
  {
    value: 'uva',
    label: 'Uva',
    children: [
      { value: 'badulla', label: 'Badulla' },
      { value: 'moneragala', label: 'Moneragala' }
    ],
  },
  {
    value: 'western',
    label: 'Western',
    children: [
      { value: 'colombo', label: 'Colombo' },
      { value: 'gampaha', label: 'Gampaha' },
      { value: 'kalutara', label: 'Kalutara' }
    ],
  }


];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const DeliveryDetails = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { confirm, ...formData } = values;

    try {
      console.log('Entered details:', formData);
      const response = await axios.post('http://localhost:8020/api/items/item_create', formData);

      console.log('Form data saved:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error saving form data:', error.response ? error.response.data : error.message);
      message.error('Submit failed. Please try again.');
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="94">+94</Option>
      </Select>
    </Form.Item>
  );

  return (
    
  <LayoutNew>
    <Layout>
  <div 
  className='border' 
  style={{
    marginLeft:'70px',
    width:'1100px',
    padding:'20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#EDE8DC',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'

  }}
>
      {/* Steps Component */}
      <Steps
        size="small"
        current={1}
        items={[
          { title: 'Login' },
          { title: 'Delivery' },
          { title: 'Payment' }
        ]}
        style={{ marginBottom: '20px' }}
      />

      {/* Form */}
      <Form
  {...formItemLayout}
  form={form}
  name="register"
  onFinish={onFinish}
  style={{
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#EDE8DC', // Change this to your desired background color
    padding: '20px', // Optional: add padding for better spacing
    borderRadius: '8px', // Optional: maintain border radius
    color: '#333', // Change text color if needed
  }}
  scrollToFirstError
>

        <Form.Item
          name="emaill"
          label="E-mail"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="firstname"
          label="First Name"
          rules={[{ required: true, message: 'Please input your First Name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your Last Name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[{ type: 'array', required: true, message: 'Please select your habitual residence!' }]}
        >
          <Cascader options={residences} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input your address!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            {
              pattern: /^\d{10}$/, 
              message: 'Phone number must start with +94 and be followed by exactly 10 digits!'
            }
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%', backgroundColor:'#ffffff'}} />
        </Form.Item>

        <Form.Item
          name="zipcode"
          label="Zip Code"
          rules={[
            { required: true, message: 'Please input your Zip Code!' },
            {
              pattern: /^\d{5}$/, 
              message: 'Zip Code must be exactly 5 digits!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    </Layout>
  </LayoutNew>


  );
};


export default DeliveryDetails;


