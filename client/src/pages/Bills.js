import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Button, Modal } from "antd";
import "../resources/items.css";
import { useReactToPrint } from 'react-to-print';

function Bills(props) {
    const dispatch = useDispatch();
    const componentRef = useRef();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [allBillsData, setAllBillsData] = useState([]);
    const [printBillModalVisibility, setPrintBillModalVisibility] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [selectedBill, setSelectedBill] = useState(null);
  
    const getAllBills = () => {
      dispatch({ type: "showLoading" });
      axios
        .get("/api/bills/get-all-bills", { headers: {
          'Authorization': 'Bearer ' + userData.token
        }})
        .then((response) => {
          //console.log(response.data);
          dispatch({ type: "hideLoading" });
          const data = response.data;
          data.reverse();
          setAllBillsData(data);
          //console.log(allItemsData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const mapAllCartItems = (cartItems) => {

        

        const dataSource = [];

        cartItems.map( item => {
            const newItem = {...item.item, quantity: item.quantity}
            dataSource.push(newItem);
        })

        console.log(dataSource);

        return dataSource;
    }

    
    useEffect(() => {
      if (allBillsData.length <= 0) {
        getAllBills();
      }
    }, [allBillsData]);
  
    const columns = [
      {
        title: "ID",
        dataIndex: "_id",
        key: "id",
      },
      {
        title: "Customer Name",
        dataIndex: "customerName",
        key: "customerName",
      },
      {
        title: "Sub Total",
        dataIndex: "subTotal",
        key: "subTotal",
      },
      {
        title: "Tax",
        dataIndex: "tax",
        key: "tax",
      },
      {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "totalAmount",
      },
      {
        title: "Actions",
        dataIndex: "_id",
        render: (id, record) => (
          <div className="d-flex">
            <EyeOutlined className="mx-2" onClick={() => {
                setSelectedBill(record)
                setPrintBillModalVisibility(true)
            }}/>
          </div>
        ),
      },
    ];
  
    const cartColumns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Quantity",
          dataIndex:"quantity",
          render: (id, record) => <div><b>{record.quantity}</b></div>
        },
        {
            title: "Amount",
            dataIndex:"amount",
            render: (id, record) => <div><b>{record.quantity * record.price}</b></div>
          },
        
      ];
    
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

  
    return (
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Bills</h3>
        </div>
        <Table dataSource={allBillsData} columns={columns} bordered />
  
        {printBillModalVisibility && (
          <Modal
            onCancel={() => {
              setEditingItem(null);
              setPrintBillModalVisibility(false);
            }}
            visible={printBillModalVisibility}
            title='Bill Details'
            footer={false}
            width={800}
          >
          <div className="bill-model p-3" ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
                <div>
                    <h1><b>STORE</b></h1>
                </div>
                <div> 
                    <p>City Name</p>
                    <p>Area Name</p>
                    <p>Phone</p>
                </div>
            </div>
            <div className="bill-customer-details my-2">
                <p><b>Name</b> : {selectedBill.customerName}</p>
                <p><b>Phone</b> : {selectedBill.customerPhoneNumber}</p>
                <p><b>Date</b> : {selectedBill.createdAt.toString().substring(0,10)}</p>
            </div>
            
            <Table dataSource={mapAllCartItems(selectedBill.cartItems)} columns={cartColumns} pagination={false}/>

            <div className="dotted-border">
                <p><b>Sub Total</b> : {selectedBill.subTotal}</p>
                <p><b>Tax</b> : {selectedBill.tax}</p>
            </div>
            <div>
                <h2><b>GRAND TOTAL : {selectedBill.totalAmount}</b></h2>
            </div>
            <div className="dotted-border"></div>
            <div className="text-center">
                <p>Thanks</p>
                <p>Visit Again!</p>
            </div>
          </div>

          <div className="d-flex justify-content-end">
                <Button type="primary" onClick={handlePrint}>Print Bill</Button>
          </div>
          </Modal>
        )}
      </DefaultLayout>
    );
}

export default Bills