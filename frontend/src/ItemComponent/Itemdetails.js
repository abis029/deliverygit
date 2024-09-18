import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { useReactToPrint } from 'react-to-print';

import { Layout, Typography, Space } from "antd";
import LayoutNew from '../Layout';


function ItemDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [searchkey, setsearchkey] = useState('');

    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:8020/item');
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    const handledelete = async (id) => {
        const data = await axios.delete('http://localhost:8020/item_delete/' + id);
        if (data.data.success) {
            getfetchdata();
            alert('Item deleted Successfully!');
        }
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Total Item Report',
        onBeforeGetContent: () => {
            setIsGeneratingPDF(true);
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setIsGeneratingPDF(false);
            alert('Data saved in PDF');
        }
    });

    const handlesearch = () => {
        filterdata(searchkey);
    };

    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter(customer =>
            customer && customer.fnamee && customer.fnamee.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    };

    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    };

    const searchInputStyle = {
        padding: '10px',
        width: '200px',
        borderRadius: '4px',
        marginRight: '10px',
        border: '1px solid #ccc',
    };

    const searchButtonStyle = {
        padding: '10px 15px',
        backgroundColor: '#1E2A5E',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const thTdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    };

    const headerStyle = {
        backgroundColor: '#1E2A5E',
        color: 'white',
    };

    const actionButtonStyle = {
        marginLeft: '10px',
        padding: '5px 10px',
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div>
            <LayoutNew>
                <Layout>
                    <div style={containerStyle}>
                        <input
                            type="search"
                            onChange={(e) => setsearchkey(e.target.value)}
                            placeholder='First Name'
                            style={searchInputStyle}
                        />
                        <button
                            id='search-btn'
                            onClick={(e) => handlesearch(e)}
                            style={searchButtonStyle}
                        >
                            Search
                        </button>

                        <div ref={componentPDF} style={{ width: '100%' }}>
                            <h2>User's List</h2>
                            <table style={tableStyle}>
                                <thead>
                                    <tr style={headerStyle}>
                                        <th style={thTdStyle}>Email</th>
                                        <th style={thTdStyle}>First Name</th>
                                        <th style={thTdStyle}>Last Name</th>
                                        <th style={thTdStyle}>Habitual Residence</th>
                                        <th style={thTdStyle}>Address</th>
                                        <th style={thTdStyle}>Phone Number</th>
                                        <th style={thTdStyle}>Zip Code</th>
                                        {!isGeneratingPDF && <th style={thTdStyle}>Action</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {showdiscounts.map((e1) => (
                                        <tr key={e1._id}>
                                            <td style={thTdStyle}>{e1.emaill}</td>
                                            <td style={thTdStyle}>{e1.fnamee}</td>
                                            <td style={thTdStyle}>{e1.lnamee}</td>
                                            <td style={thTdStyle}>{e1.habitual_residence}</td>
                                            <td style={thTdStyle}>{e1.address}</td>
                                            <td style={thTdStyle}>{e1.p_nbb}</td>
                                            <td style={thTdStyle}>{e1.zipcode}</td>
                                            {!isGeneratingPDF && (
                                                <td style={thTdStyle}>
                                                    <a href={`/itemupdate/${e1._id}`} style={actionButtonStyle}>Edit</a>
                                                    <button onClick={() => handledelete(e1._id)} style={actionButtonStyle}>
                                                        Delete
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button onClick={generatePDF} style={searchButtonStyle}>Generate Report</button>
                        </div>
                    </div>
                </Layout>
            </LayoutNew>
        </div>
    );
}

export default ItemDetails;
