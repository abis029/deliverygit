import { useState } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import LayoutNew from '../Layout';
import { Layout} from "antd";
function Product() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        emaill: "",
        fnamee: "",
        lnamee: "",
        habitual_residence: "",
        address: "",
        p_nbb: "",
        zipcode: "",
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        if ((name === "p_nbb" || name === "zipcode") && value && isNaN(value)) {
            setErrors((prev) => ({
                ...prev,
                [name]: `${name === "p_nbb" ? "Phone number" : "Zip code"} must be numeric.`,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
            setOrder((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!order.emaill) {
            newErrors.emaill = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(order.emaill)) {
            newErrors.emaill = "Email address is invalid.";
        }

        if (!order.fnamee) newErrors.fnamee = "First name is required.";
        if (!order.lnamee) newErrors.lnamee = "Last name is required.";
        if (!order.habitual_residence) newErrors.habitual_residence = "Habitual residence is required.";
        if (!order.address) newErrors.address = "Address is required.";
        if (!order.p_nbb) {
            newErrors.p_nbb = "Phone number is required.";
        } else if (isNaN(order.p_nbb)) {
            newErrors.p_nbb = "Phone number must be numeric.";
        } else if (order.p_nbb.length < 10) {
            newErrors.p_nbb = "Phone number must be at least 10 digits long.";
        }

        if (!order.zipcode) {
            newErrors.zipcode = "Zip code is required.";
        } else if (isNaN(order.zipcode)) {
            newErrors.zipcode = "Zip code must be numeric.";
        } else if (order.zipcode.length < 5) {
            newErrors.zipcode = "Zip code must be at least 5 digits long.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8020/item_create", order);
            console.log(response.data);
            alert("Successfully added!");
            navigate("/itemdetails");
            setOrder({
                emaill: "",
                fnamee: "",
                lnamee: "",
                habitual_residence: "",
                address: "",
                p_nbb: "",
                zipcode: "",
            });
            setErrors({});
        } catch (error) {
            console.error("There was an error adding the item:", error);
        }
    };

    const containerStyle = {
        width: '60%',
        margin: '0 auto',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#333',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
        marginBottom: '10px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#1E2A5E',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <LayoutNew>
            <Layout>
                <div style={containerStyle}>
                    <h2 style={{ textAlign: 'center', color: '#1E2A5E' }}>User</h2>
                    <form onSubmit={handleSubmit}>
                        <label style={labelStyle}>Email:</label>
                        <input
                            type="text"
                            id="emaill"
                            name="emaill"
                            value={order.emaill}
                            onChange={handleOnChange}
                            style={inputStyle}
                        />
                        {errors.emaill && <span style={errorStyle}>{errors.emaill}</span>}

                        <label style={labelStyle}>First Name:</label>
                        <input
                            type="text"
                            id="fnamee"
                            name="fnamee"
                            value={order.fnamee}
                            onChange={handleOnChange}
                            style={inputStyle}
                        />
                        {errors.fnamee && <span style={errorStyle}>{errors.fnamee}</span>}

                        <label style={labelStyle}>Last Name:</label>
                        <input
                            type="text"
                            id="lnamee"
                            name="lnamee"
                            value={order.lnamee}
                            onChange={handleOnChange}
                            style={inputStyle}
                        />
                        {errors.lnamee && <span style={errorStyle}>{errors.lnamee}</span>}

                        <label style={labelStyle}>Habitual Residence:</label>
                        <input
                            type="text"
                            id="habitual_residence"
                            name="habitual_residence"
                            value={order.habitual_residence}
                            onChange={handleOnChange}
                            style={inputStyle}
                        />
                        {errors.habitual_residence && <span style={errorStyle}>{errors.habitual_residence}</span>}

                        <label style={labelStyle}>Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={order.address}
                            onChange={handleOnChange}
                            style={inputStyle}
                        />
                        {errors.address && <span style={errorStyle}>{errors.address}</span>}

                        <label style={labelStyle}>Phone Number:</label>
                        <input
                            type="text"
                            id="p_nbb"
                            name="p_nbb"
                            value={order.p_nbb}
                            onChange={handleOnChange}
                            style={inputStyle}
                        />
                        {errors.p_nbb && <span style={errorStyle}>{errors.p_nbb}</span>}

                        <label style={labelStyle}>Zip Code:</label>
                        <input
                            type="text"
                            id="zipcode"
                            name="zipcode"
                            value={order.zipcode}
                            onChange={handleOnChange}
                            style={inputStyle}
                        />
                        {errors.zipcode && <span style={errorStyle}>{errors.zipcode}</span>}

                        <button type="submit" style={buttonStyle}>Submit</button>
                    </form>
                    <div id='footer'>
                        <p>Ant Design @2024 Created by Ant UED</p>
                    </div>
                </div>
            </Layout>
        </LayoutNew>
    );
}

export default Product;

