import React, { useState, useEffect } from "react";
import LayoutWeb from "./../components/layout/BaseLayout";
import {
  Space,
  Button,
  Row,
  Col,
  Table,
  Divider,
  Input,
  Select,
  DatePicker,
  Layout,
  Pagination,
} from "antd";
import { getProduct } from "./../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, FolderOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Search } = Input;
const { Content } = Layout;
export default function Product() {
  const dispatch = useDispatch();

  const getProductResult = useSelector((state) => state.getProduct.result);
  const getProductLoading = useSelector((state) => state.getProduct.loading);
  const getProductError = useSelector((state) => state.getProduct.error);

  useEffect(() => {
    const data = {
      search: "",
    };
    dispatch(getProduct(data));
    if (getProductError && getProductError !== null) {
      Swal.fire({
        title: "Gagal",
        text: `${getProductError.message}`,
        icon: "error",
      });
      dispatch(getProduct({ reset: true }));
    }
  }, [dispatch, getProductError]);

  const onSearch = (value) => {
    console.log(value);
    const data = {
      search: value,
    };
    dispatch(getProduct(data));
  };

  const handleTableChange = () => {};

  const columnTable = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      width: 60,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 60,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 60,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 60,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 60,
    },
  ];
  return (
    <LayoutWeb className="layout-page" keys={"product"}>
      <Content>
        <div className="custom-divider">
          <Divider orientation="left">Product</Divider>
        </div>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Row>
            <Col flex={4}>2 / 5</Col>
            <Col flex={1}>
              <Search
                style={{ width: "100%" }}
                placeholder="Search By Product Name"
                onSearch={onSearch}
                enterButton="Search"
              />
            </Col>
          </Row>
        </Space>
      </Content>
      <Divider />
      <Table
        loading={getProductLoading}
        rowKey={(record) => record.id}
        dataSource={getProductResult === null ? [] : getProductResult.products}
        columns={columnTable}
        //   pagination={{ pageSize: this.state.count }}
        //   onChange={this.handleTableChange}
        scroll={{
          x: 1600,
          y: 1200,
        }}
      />
      <Divider />
    </LayoutWeb>
  );
}
