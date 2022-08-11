import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table} from "antd";
import "../resources/items.css";


function Customers(props) {
  const dispatch = useDispatch();
  const [allBillsData, setAllBillsData] = useState([]);

  const userData = JSON.parse(localStorage.getItem('userData'));

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


  useEffect(() => {
    if (allBillsData.length <= 0) {
      getAllBills();
    }
  }, [allBillsData]);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => <span>{value.toString().substring(0, 10)}</span>,
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customer</h3>
      </div>
      <Table dataSource={allBillsData} columns={columns} bordered />
    </DefaultLayout>
  );
}

export default Customers;
