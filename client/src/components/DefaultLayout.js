import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import "../resources/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

function DefaultLayout(props) {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.rootReducer);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && (
        <div className="spinner">
            <div class="spinner-border" role="status">
            </div>
        </div>
        
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h3>POS</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LoginOutlined />} onClick={()=> {
              localStorage.removeItem('userData');
              navigate('/login');
          } }>
            Logout
          </Menu.Item>
        </Menu>
        {/*<Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'Home',
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: 'Bills',
              },
              {
                key: '3',
                icon: <UserOutlined />,
                label: 'Items',
              },
              {
                key: '4',
                icon: <UserOutlined />,
                label: 'Customers',
              },
              {
                key: '5',
                icon: <UserOutlined />,
                label: 'Logout',
              }
            ]}
          /> */}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 10,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div
            className="cart-count d-flex align-items-center"
            onClick={() => navigate("/cart")}
          >
            <b>
              <p className="mt-3 mr-2">{cartItems.length}</p>
            </b>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "10px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
