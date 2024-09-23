import React from "react";
import { Form, Row, Col, Input, Button } from "antd";

const EditItem = ({ form, onFinish }) => {
  const containerStyle = {
    width: '90%',
    margin: '0 auto',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#1E2A5E' }}>User</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          {['emaill', 'fnamee', 'lnamee', 'address', 'p_nbb', 'zipcode'].map((field, index) => (
            <Col span={8} key={field}>
              <Form.Item
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                rules={[{ required: true, message: `Please input your ${field}!` }]}
              >
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditItem;
