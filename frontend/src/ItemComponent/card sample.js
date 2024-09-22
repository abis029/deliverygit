import React, { useEffect, useState } from 'react';
import { Card as AntCard, Row, Col, Button as AntButton, Input, message, Checkbox, Modal, Form, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from 'antd';
import styled from 'styled-components';
import LayoutNew from '../Layout';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  StockOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import EditForm from './EditItem';
import AddressList from './Address';

import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';
const { Title } = Typography;
const { Meta } = AntCard;

function ItemDetails() {
  const [showDiscounts, setShowDiscounts] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null); // Track selected card ID
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
  const [editingItem, setEditingItem] = useState(null); // Track item being edited
  const [form] = Form.useForm(); // Form for editing item details
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const { subtotal, discount, total } = location.state || {}; // Access the values
  const [isNewModalVisible, setIsNewModalVisible] = useState(false); // New modal state


  const getFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8020/api/items/item');
      if (response.data.success) {
        setShowDiscounts(response.data.data);
      }
    } catch (error) {
      message.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8020/api/items/item_delete/${id}`);
      if (response.data.success) {
        getFetchData();
        message.success('Item deleted successfully!');
      }
    } catch (error) {
      message.error('Failed to delete item');
    }
  };

  const filterData = (searchKey) => {
    const filteredData = showDiscounts.filter((item) =>
      item && item.emaill.toLowerCase().includes(searchKey.toLowerCase())
    );
    setShowDiscounts(filteredData);
  };

  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to be edited
    form.setFieldsValue(item); // Populate the form with item details
    setIsModalVisible(true); // Show the modal
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(`http://localhost:8020/api/items/item_update`, {
        ...values,
        id: editingItem._id, // Include the ID for the update
      });
      if (response.data.success) {
        message.success('Item updated successfully!');
        setIsModalVisible(false);
        getFetchData();
      }
    } catch (error) {
      message.error('Failed to update item');
    }
  };

   // New modal handler
   const handleNewModalOpen = () => {
    setIsNewModalVisible(true);
  };
  

  return (
    <LayoutNew>
      <Space
        style={{
          background: '#001529',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <Space>
          <StockOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
          <Title level={2} style={{ fontSize: '24px', marginTop: '8px', color: 'white' }}>
            Delivery Details
          </Title>
        </Space>
      </Space>

      <div
        style={{
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
      
      </div>
     
      <AntButton
                        type="primary"
                        style={{ marginRight: '20px',backgroundColor:'blue',color:'black' }}
                        onClick={handleNewModalOpen}
                        
                      >
                        <EditOutlined  />qwerty
                      </AntButton>

      <Container>       
        <ContentContainer>
          <CardsContainer>
              {/* Search input */}
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchKey(e.target.value)}
          style={{ marginRight: '8px', marginBottom:'10px' }}
          onPressEnter={() => filterData(searchKey)} // Trigger search on Enter

        />

            <Row gutter={[16, 16]}>
              {showDiscounts.map((item) => (
                <Col key={item._id} xs={24}>
                  <StyledCard hoverable>
                    <CardHeader>
                      <Checkbox
                        checked={selectedCardId === item._id}
                        onChange={() => setSelectedCardId(item._id)}
                        style={{ transform: 'scale(1.5)', marginRight: '10px' }} // Increase size and add spacing
                      />
                      <ItemTitle>{item.emaill}</ItemTitle>
                      <AntButton
                        type="primary"
                        style={{ marginRight: '20px',backgroundColor:'white',color:'black' }}
                        onClick={() => handleEdit(item)}
                        
                      >
                        <EditOutlined  />
                      </AntButton>
                    </CardHeader>
                    <Meta
                      description={
                        <ItemDescription>
                          <div>Name: {item.fnamee} {item.lnamee}</div>
                          <div>Address: {item.address}</div>
                          <div>Phone: {item.p_nbb}</div>
                          <div>Zip Code: {item.zipcode}</div>
                        </ItemDescription>
                      }
                    />
                    <CardFooter>
                      <Button danger
                        type="primary"
                        style={{
                          color: 'white',
                          marginRight: '20px',
                          marginBottom: '10px', // Move button upwards
                        }}
                        onClick={() => handleDelete(item._id)}
                      >
                        <DeleteOutlined /> Delete
                      </Button>
                    </CardFooter>
                  </StyledCard>
                </Col>
              ))}
            </Row>
            <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => navigate('/')} 
                style={{marginBottom:'12px'}}
              >
                Add New Delivery Address
              </Button>
            </div>
          </CardsContainer>

          <RightBox>
              <h3>Order Summary</h3>
              <p>Subtotal: ${subtotal?.toFixed(2)}</p>
              <p>Discount: ${discount?.toFixed(2)}</p>
              <p>Total: ${total?.toFixed(2)}</p>
            <AntButton type="primary" style={{ width: '100%' }}>
              Proceed
            </AntButton>
          </RightBox>

        </ContentContainer>

        {/* Modal for Editing Item */}
        <Modal
          title="Edit Item"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null} // Remove default footer
          width={800} // Set the width to 800px or any desired value
        >
          <EditForm form={form} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <AntButton
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    handleUpdate(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
              }}
            >
              Submit
            </AntButton>
          </div>
        </Modal>

             {/* New Modal */}

<Modal
  title="New Modal"
  open={isNewModalVisible}
  onCancel={() => setIsNewModalVisible(false)}
  footer={null}
>
  <AddressList
    items={showDiscounts}
    onEdit={handleEdit}
    onDelete={handleDelete}
    selectedCardId={selectedCardId}
    setSelectedCardId={setSelectedCardId}
  />
  <AntButton onClick={() => setIsNewModalVisible(false)}>Close</AntButton>
</Modal>

      </Container>
    </LayoutNew>
  );
}

const Container = styled.div`
  padding: 10px;
  background-color: #CADABF;
  border-radius: 8px;
  margin-left: 20px;
  display: flex;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1; /* Allow it to take the remaining space */
  margin-top: 20px;
  width: 500px;
`;

const CardsContainer = styled.div`
  width: auto; /* Set this to the desired width (e.g., 100%, 80%, etc.) */
  overflow-y: auto; /* Enable vertical scrolling */
  flex-grow: 1; /* Allow cards to take the remaining space */
  max-height: 80vh; /* Set a max height for the scrollable area */
`;

const StyledCard = styled(AntCard)`
  background-color: #F3EEEA;
  height: 210px; /* Fixed height for each card */
  width: auto; /* Full width of the column */

  .ant-card-body {
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Ensures footer is at the bottom */
    text-align: left; /* Aligns text to the left */
    margin-left: 25px;
    height: 100%; /* Allow footer to be positioned correctly */
  }
`;

const CardHeader = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Centers items vertically */
`;

const ItemDescription = styled.span`
  font-weight: bold;
`;

const ItemTitle = styled.span`
  font-weight: bold;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end; /* Aligns footer content to the right */
  margin-top: auto; /* Pushes footer to the bottom of the card */
`;

const RightBox = styled.div`
  width: 550px; /* Width for the rectangle box */
  height: auto; /* Height is auto to fit content */
  background-color: #ffffff; /* White background */
  border-radius: 8px;
  padding: 10px; /* Reduce padding */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  margin-left: 15px;
  margin-right: 15px;

  /* Optional: Add a bit of space between the items */
  & > p, h3 { 
    margin-bottom: 5px; /* Adjust margin between elements */
  }
`;


export default ItemDetails;
