import React from "react";
import { Modal, Space, Table } from "antd";

export default function ModalView({ visible, onCancel, data }) {
  const columnTable = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 60,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 60,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 60,
    },
    {
      title: "Discount Price",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      width: 60,
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      width: 60,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 60,
    },
  ];
  return (
    <Modal
      centered
      visible={visible}
      onCancel={onCancel}
      width={"80%"}
      footer={null}
    >
      <div>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Table
            rowKey={(record) => record.id}
            dataSource={data.length === 0 ? [] : data.products}
            columns={columnTable}
          />
        </Space>
      </div>
    </Modal>
  );
}
