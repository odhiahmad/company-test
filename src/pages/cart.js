import React, { useState, useEffect } from "react";
import LayoutWeb from "./../components/layout/BaseLayout";
import ModalView from "./../components/cart/ModalView";
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
import { getCart } from "./../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, FolderOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Search } = Input;
const { Content } = Layout;
export default function Cart() {
  const dispatch = useDispatch();

  const getCartResult = useSelector((state) => state.getCart.result);
  const getCartLoading = useSelector((state) => state.getCart.loading);
  const getCartError = useSelector((state) => state.getCart.error);

  const [modalView, setModalView] = useState(false);
  const [dataView, setDataView] = useState(null);

  useEffect(() => {
    const data = {
      search: "",
    };
    dispatch(getCart(data));
    if (getCartError && getCartError !== null) {
      Swal.fire({
        title: "Gagal",
        text: `${getCartError.message}`,
        icon: "error",
      });
      dispatch(getCart({ reset: true }));
    }
  }, [dispatch, getCartError]);

  const onSearch = (value) => {
    console.log(value);
    const data = {
      search: value,
    };
    dispatch(getCart(data));
  };

  const handleTableChange = () => {};

  const openModalView = (value) => {
    setModalView(true);
    setDataView(value);
  };

  const closeModalView = () => {
    setDataView(null);
    setModalView(false);
  };

  const columnTable = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      width: 60,
    },
    {
      title: "Total Products",
      dataIndex: "totalProducts",
      key: "totalProducts",
      width: 60,
    },
    {
      title: "Total Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      width: 60,
    },
    {
      title: "Discount Total",
      dataIndex: "discountedTotal",
      key: "discountedTotal",
      width: 60,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 60,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 160,
      render: (text, record) => (
        <Row>
          <Space size="small" align="center">
            <Button
              className="btn-primary"
              type="primary"
              onClick={() => openModalView(record)}
              icon={<FolderOutlined />}
            >
              View
            </Button>
          </Space>
        </Row>
      ),
    },
  ];
  return (
    <LayoutWeb className="layout-page" keys={'cart'}>
      <Content>
        <div className="custom-divider">
          <Divider orientation="left">Cart</Divider>
        </div>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Row>
            <Col flex={4}>2 / 5</Col>
            <Col flex={1}>
              <Search
                style={{ width: "100%" }}
                placeholder="Search By Cart Name"
                onSearch={onSearch}
                enterButton="Search"
              />
            </Col>
          </Row>
        </Space>
      </Content>
      <Divider />
      <Table
        loading={getCartLoading}
        rowKey={(record) => record.id}
        dataSource={getCartResult === null ? [] : getCartResult.carts}
        columns={columnTable}
        //   pagination={{ pageSize: this.state.count }}
        //   onChange={this.handleTableChange}
      />
      <ModalView
        visible={modalView}
        data={dataView}
        onCancel={closeModalView}
      />
    </LayoutWeb>
  );
}
