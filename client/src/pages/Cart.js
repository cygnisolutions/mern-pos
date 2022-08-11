import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined
} from "@ant-design/icons";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart(props) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [subTotal, setSubTotal] = useState(0);
  const [billChargeModal, setBillChargeModal] = useState(false);
  const navigate = useNavigate();

  //console.log(cartItems);
  
  const dataSource = [];

  //dataSource.push(item.item)

  cartItems.map(item => {
    const newItem = {...item.item, quantity: item.quantity}
    dataSource.push(newItem);
    return newItem;
  });
  
  //console.log(dataSource);

  const increaseQuantity = (record) => {
    ///console.log('quantity clicked');
    //console.log(record.quantity);
    dispatch({type:'updateCart' , payload: {...record, quantity: record.quantity + 1}})
  }

  const decreaseQuantity = (record) => {
    ///console.log('quantity clicked');
    //console.log(record.quantity);
    if(record.quantity !== 1){
      dispatch({type:'updateCart' , payload: {...record, quantity: record.quantity - 1}})
    }
    
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <img src={image} alt="" height={60} width={60} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex:"quantity",
      render: (id, record) => <div><PlusCircleOutlined className="mx-3" onClick={() => increaseQuantity(record)} /><b>{record.quantity}</b><MinusCircleOutlined className="mx-3" onClick={() => decreaseQuantity(record)}/></div>
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => <DeleteOutlined onClick={()=> dispatch({type:'deleteFromCart', payload: record})}/>
    }
  ];

  useEffect(() => {

    let temp = 0;
    cartItems.forEach((item) => {
      //console.log(item.item.price);
      //console.log(item.quantity);
      temp = temp + (item.item.price * item.quantity);
      //console.log(temp);

    })

    setSubTotal(temp);

  }, [cartItems])
  
  const onFinishHandler = (values) => {
    //console.log(values);

    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAmount: Number(subTotal + Number(((subTotal / 100) * 10).toFixed(2))),
      userId: localStorage.getItem('userId')
     }

     //console.log(reqObject);
     dispatch({ type: "showLoading" });
     axios
     .post("/api/bills/charge-bill", reqObject).then(result => {
        dispatch({ type: "hideLoading" });
        message.success('Bill Charged Successfully')
        navigate('/bills');
      }).catch( error => {
        dispatch({ type: "hideLoading" });
        message.error('Something Went Wrong')
      })

  }


  return (
    <DefaultLayout>
      <h3>Cart</h3>
      <Table dataSource={dataSource} columns={columns} bordered pagination={false}/>
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal">
          <h3>SUB TOTAL: $<b>{subTotal}</b></h3>
        </div>
        <Button type="primary" onClick={() => setBillChargeModal(true)}>CHARGE BILL</Button>
      </div>

      <Modal onCancel={() => setBillChargeModal(false)} title='Charge Bill' visible={billChargeModal} footer={false}>
      <Form
            layout="vertical"
            onFinish={onFinishHandler}
           
          >
            <Form.Item
              label="Customer Name"
              name="customerName"
              rules={[{ required: true, message: "Please input name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="customerPhoneNumber"
              rules={[{ required: true, message: "Please input image" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Payment Mode"
              name="paymentMode"
              rules={[{ required: true, message: "Please input category" }]}
            >
              <Select>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="card">Card</Select.Option>
              </Select>
            </Form.Item>

            <div className="charge-bill-amount">
              <h5>SubTotal: $<b>{subTotal}</b></h5>
              <h5>Tax: $<b>{((subTotal / 100) * 10).toFixed(2)}</b></h5>

              <hr />

              <h2>Grand Total: $<b>{subTotal + ((subTotal / 100) * 10).toFixed(2)}</b></h2>

            </div>

            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                GENERATE BILL
              </Button>
            </div>
          </Form>
      </Modal>

    </DefaultLayout>
  );
}

export default Cart;
