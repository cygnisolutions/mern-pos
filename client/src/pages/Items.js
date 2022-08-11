import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import "../resources/items.css";

function Items(props) {
  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem('userData'));

  const [allItemsData, setAllItemsData] = useState([]);
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items", { headers: {
        'Authorization': 'Bearer ' + userData.token
      }})
      .then((response) => {
        //console.log(response.data);
        dispatch({ type: "hideLoading" });
        setAllItemsData(response.data);
        //console.log(allItemsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .delete("/api/items/delete-item/" + record._id, { headers: {
        'Authorization': 'Bearer ' + userData.token
      }})
      .then((response) => {
        //console.log(response.data);
        dispatch({ type: "hideLoading" });
        //setAllItemsData(response.data);
        message.success('Item Deleted Successfully');
        //console.log(allItemsData);
        getAllItems();
      })
      .catch((error) => {
        message.success('Something Went Wrong');
        console.log(error);
      });
  };

  useEffect(() => {
    if (allItemsData.length <= 0) {
      getAllItems();
    }
  }, [allItemsData]);

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
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalOpen(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => deleteItem(record)} />
        </div>
      ),
    },
  ];

 

  const onFinishHandler = (values) => {
    //console.log(values);
    dispatch({ type: "showLoading" });

    if (editingItem === null) {
      axios
        .post("/api/items/add-item", values, { headers: {
          'Authorization': 'Bearer ' + userData.token
        }})
        .then((response) => {
          //console.log(response.data);
          dispatch({ type: "hideLoading" });
          message.success("Item added succesfully");
          setAddEditModalOpen(false);
          getAllItems();
        })
        .catch((error) => {
          message.error("Something Went Wrong");
          console.log(error);
        });
    } else {
      axios
        .post("/api/items/update-item", { ...values, itemId: editingItem._id }, { headers: {
          'Authorization': 'Bearer ' + userData.token
        }})
        .then((response) => {
          //console.log(response.data);
          dispatch({ type: "hideLoading" });
          message.success("Item updated succesfully");
          setEditingItem(null);
          setAddEditModalOpen(false);
          getAllItems();
        })
        .catch((error) => {
          message.error("Something Went Wrong");
          console.log(error);
        });
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={() => setAddEditModalOpen(true)}>
          Add Item
        </Button>
      </div>
      <Table dataSource={allItemsData} columns={columns} bordered />

      {addEditModalOpen && (
        <Modal
          onCancel={() => {
            setEditingItem(null);
            setAddEditModalOpen(false);
          }}
          visible={addEditModalOpen}
          title={editingItem != null ? "Edit Item" : "Add New Item"}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            initialValues={editingItem}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Image URL"
              name="image"
              rules={[{ required: true, message: "Please input image" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input price" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please input category" }]}
            >
              <Select>
                <Select.Option value="vegetables">Vegetables</Select.Option>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="meat">Meat</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Items;
