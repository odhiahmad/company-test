import { Button } from "antd";
import { FolderOutlined } from "@ant-design/icons";

export const columnTableProduct = [
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

export const columnTableCart = (openModalView) => [
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
      <Button
        className="btn-primary"
        type="primary"
        onClick={() => openModalView(record)}
        icon={<FolderOutlined />}
      >
        View
      </Button>
    ),
  },
];
