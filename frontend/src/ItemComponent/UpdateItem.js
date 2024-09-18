import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LayoutNew from '../Layout';
import { Layout} from "antd";


function UpdateItem() {
    const { id } = useParams();
    const [updateorder, setupdateorder] = useState({
        emaill: "",
        fnamee: "",
        lnamee: "",
        habitual_residence: "",
        address: "",
        p_nbb: "",
        zipcode: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8020/item_order/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setupdateorder(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const validate = () => {
        const newErrors = {};

        // Email validation
        if (!updateorder.emaill) {
            newErrors.emaill = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(updateorder.emaill)) {
            newErrors.emaill = "Email is invalid.";
        }

        // First name validation
        if (!updateorder.fnamee) {
            newErrors.fnamee = "First name is required.";
        }

        // Last name validation
        if (!updateorder.lnamee) {
            newErrors.lnamee = "Last name is required.";
        }

        // Habitual residence validation
        if (!updateorder.habitual_residence) {
            newErrors.habitual_residence = "Habitual residence is required.";
        }

        // Address validation
        if (!updateorder.address) {
            newErrors.address = "Address is required.";
        }

        // Phone number validation (must be a number and of specific length)
        if (!updateorder.p_nbb) {
            newErrors.p_nbb = "Phone number is required.";
        } else if (!/^\d{10}$/.test(updateorder.p_nbb)) {
            newErrors.p_nbb = "Phone number must be 10 digits.";
        }

        // Zipcode validation (must be numeric)
        if (!updateorder.zipcode) {
            newErrors.zipcode = "Zipcode is required.";
        } else if (isNaN(updateorder.zipcode)) {
            newErrors.zipcode = "Zipcode must be a number.";
        }

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update state
        setupdateorder((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear individual field errors on change
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleUpdate = async () => {
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8020/item_update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updateorder._id,
                    ...updateorder,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Item updated successfully");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className='item-update'>
        <LayoutNew>
        <Layout>
        
            <label>Email:</label>
            <input
                type="text"
                id="emaill"
                name="emaill"
                onChange={handleInputChange} 
                value={updateorder?.emaill} 
            />
            {errors.emaill && <span className="error">{errors.emaill}</span>}
            <br />

            <label>First Name:</label>
            <input
                type="text"
                id="fnamee"
                name="fnamee"
                onChange={handleInputChange} 
                value={updateorder?.fnamee} 
            />
            {errors.fnamee && <span className="error">{errors.fnamee}</span>}
            <br />

            <label>Last Name:</label>
            <input
                type="text"
                id="lnamee"
                name="lnamee"
                onChange={handleInputChange} 
                value={updateorder?.lnamee} 
            />
            {errors.lnamee && <span className="error">{errors.lnamee}</span>}
            <br />

            <label>Habitual Residence:</label>
            <input
                type="text"
                id="habitual_residence"
                name="habitual_residence"
                onChange={handleInputChange} 
                value={updateorder?.habitual_residence} 
            />
            {errors.habitual_residence && <span className="error">{errors.habitual_residence}</span>}
            <br />

            <label>Address:</label>
            <input
                type="text"
                id="address"
                name="address"
                onChange={handleInputChange} 
                value={updateorder?.address} 
            />
            {errors.address && <span className="error">{errors.address}</span>}
            <br />

            <label>Phone Number:</label>
            <input
                type="text"
                id="p_nbb"
                name="p_nbb"
                onChange={handleInputChange} 
                value={updateorder?.p_nbb} 
            />
            {errors.p_nbb && <span className="error">{errors.p_nbb}</span>}
            <br />

            <label>Zip Code:</label>
            <input
                type="text"
                id="zipcode"
                name="zipcode"
                onChange={handleInputChange} 
                value={updateorder?.zipcode} 
            />
            {errors.zipcode && <span className="error">{errors.zipcode}</span>}
            <br />
           
            <button onClick={handleUpdate}>Update</button>
            </Layout>
            </LayoutNew>
        </div>
    );
}

export default UpdateItem;
