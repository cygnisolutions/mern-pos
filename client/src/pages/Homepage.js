import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Divider, Row, message } from "antd";
import Item from "../components/Item";
import '../resources/items.css';
import {useDispatch } from 'react-redux'; 

function Homepage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('userData'));

  const [allItemsData, setAllItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('fruits');
  const categories = [
    {
      name: 'fruits',
      imageURL: 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4',
    },
    {
      name: 'vegetables',
      imageURL: 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg',
    },
    {
      name: 'meat',
      imageURL: 'https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg',
    }
  ]

  const getAllItems = () => {

    //console.log(userData.token);
    dispatch({type: 'showLoading'})
    axios
      .get("/api/items/get-all-items", { headers: {
        'Authorization': 'Bearer ' + userData.token
      }})
      .then((response) => {
        //console.log(response.data);
        dispatch({type: 'hideLoading'})
        setAllItemsData(response.data);
        //console.log(allItemsData);
      })
      .catch((error) => {
        dispatch({type: 'hideLoading'})
        message.error("Failed To Load Data");
        localStorage.removeItem('userData');
        navigate('/login');
      });
  };

  useEffect(() => {
    if(allItemsData.length <= 0){
      getAllItems();
    }
    
  }, [allItemsData]);

  return (
    <DefaultLayout>

      <div className="d-flex categories">
        {categories.map(category => {
          return <div 
          onClick={()=>setSelectedCategory(category.name)}
          className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
              <h4>{category.name}</h4>
              <img src={category.imageURL} height='60' width='80' alt=''/>
          </div>
        })}
      </div>

      <Row gutter={20}>
        {allItemsData.filter((i) => i.category===selectedCategory).map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );

          //.log(item.price);

        })} 
      </Row>
    </DefaultLayout>
  );
}

export default Homepage;
