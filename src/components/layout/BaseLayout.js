import { Layout, Menu } from "antd";
import React from "react";
import Link from "next/link";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;
function LayoutWeb({ children, title, keys }) {
  const year = new Date().getFullYear();

  const itemsMenu = [
    {
      label: <Link href="/product">Product</Link>,
      key: "product",
      icon: <ShoppingOutlined />,
    },
    {
      label: <Link href="/cart">Cart</Link>,
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },
  ];

  return (
    <Layout>
      <Sider>
        <Menu
          defaultSelectedKeys={"product"}
          defaultOpenKeys={["product"]}
          selectedKeys={keys}
          mode="inline"
          style={{
            height: "100%",
          }}
          items={itemsMenu}
          // theme="dark"
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div
            className="site-layout-background"
            style={{
              minHeight: 800,
              padding: "20px 20px",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Company Test ©{year}
        </Footer>
      </Layout>
    </Layout>
  );
}
export default LayoutWeb;
