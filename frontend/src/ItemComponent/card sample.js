import React, { useEffect, useState, useRef } from 'react';
import { Card as AntCard, Row, Col, Button as AntButton, Input, message, Checkbox, Modal, Form } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import LayoutNew from '../Layout';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; 
import EditForm from './EditItem'
const { Meta } = AntCard;

function ItemDetails() {
    const [showDiscounts, setShowDiscounts] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [selectedCardId, setSelectedCardId] = useState(null); // Track selected card ID
    const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
    const [editingItem, setEditingItem] = useState(null); // Track item being edited
    const [form] = Form.useForm(); // Form for editing item details

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
        const filteredData = showDiscounts.filter(item =>
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
                id: editingItem._id // Include the ID for the update
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
    
    return (
        <LayoutNew>
            <SearchContainer>
                <Input
                    type="search"
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder='First Name'
                    style={{ width: '200px', marginRight: '10px' }}
                />
                <AntButton onClick={() => filterData(searchKey)}>Search</AntButton>
            </SearchContainer>
            <Container>
                <ContentContainer>
                    <CardsContainer>
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
                                                style={{ marginRight: '20px' }} 
                                                onClick={() => handleEdit(item)}
                                            >
                                                <EditOutlined />   
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
    <AntButton 
        type="primary" 
        style={{ 
            color: 'white', 
            backgroundColor: 'red',  
            marginRight: '20px', 
            marginBottom: '10px'  // Move button upwards
        }} 
        onClick={() => handleDelete(item._id)}
    >
        <DeleteOutlined /> Delete
    </AntButton>
</CardFooter>

                                    </StyledCard>
                                </Col>
                            ))}
                        </Row>
                    </CardsContainer>
                    <RightBox>
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


            </Container>
        </LayoutNew>
    );
}

const Container = styled.div`
    padding: 20px;
    background-color: #CADABF;
    border-radius: 8px;
    margin-left: 25px;
    display: flex;
`;

const SearchContainer = styled.div`
    margin-bottom: 20px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-grow: 1; /* Allow it to take the remaining space */
    margin-top: 20px;
`;

const CardsContainer = styled.div`
    width: 100%; /* Set this to the desired width (e.g., 100%, 80%, etc.) */
    overflow-y: auto; /* Enable vertical scrolling */
    flex-grow: 1; /* Allow cards to take the remaining space */
    max-height: 80vh; /* Set a max height for the scrollable area */
`;


const StyledCard = styled(AntCard)`
    background-color: #F3EEEA;
    height: 210px; /* Fixed height for each card */
    width: 100%; /* Full width of the column */

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
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center; /* Center the button */
    margin-left: 15px;
    margin-right: 15px;
`;

export default ItemDetails;
