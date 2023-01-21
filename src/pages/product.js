import React, { useEffect, useState } from "react";
import LayoutWeb from "./../components/layout/BaseLayout";
import {
  Space,
  Row,
  Col,
  Table,
  Divider,
  Input,
  Layout,
  InputNumber,
  Slider,
  Button,
} from "antd";
import { getProduct } from "./../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import SelectItem from "./../components/product/SelectItem";
import { columnTableProduct } from "./../utils/tableHeader";
const { Search } = Input;
const { Content } = Layout;
export default function Product() {
  const dispatch = useDispatch();
  const getProductResult = useSelector((state) => state.getProduct.result);
  const getProductFilter = useSelector((state) => state.getProduct.filter);
  const getProductLoading = useSelector((state) => state.getProduct.loading);
  const getProductError = useSelector((state) => state.getProduct.error);

  const [filterTable, setFilterTable] = useState([]);
  const [selectedItemsBrand, setSelectedItemsBrand] = useState(null);
  const [selectedItemsCategory, setSelectedItemsCategory] = useState(null);
  const [inputValue, setInputValue] = useState(0);
  const [activeButtonClear, setActiveButtonClear] = useState(false);

  useEffect(() => {
    const data = {
      search: "",
    };
    dispatch(getProduct(data));
    setFilterTable([]);
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
    const data = {
      search: value,
    };
    setFilterTable([]);
    dispatch(getProduct(data));
  };

  const changeFilterBrand = (value) => {
    const productData = getProductResult.products;
    const filterTableBrand = productData.filter((o) =>
      String(o["brand"]).toLowerCase().includes(value.toLowerCase())
    );

    setFilterTable(filterTableBrand);
    setActiveButtonClear(true);
    setSelectedItemsBrand(value);
  };

  const changeFilterCategory = (value) => {
    const productData = getProductResult.products;
    const filterTableCategory = productData.filter((o) =>
      String(o["category"]).toLowerCase().includes(value.toLowerCase())
    );

    setFilterTable(filterTableCategory);
    setActiveButtonClear(true);
    setSelectedItemsCategory(value);
  };

  const changeFilterPrice = (value) => {
    const productData = getProductResult.products;
    const filterTablePrice = productData.filter(
      (o) => String(o["price"]) >= value
    );

    setFilterTable(filterTablePrice);
    setActiveButtonClear(true);
    setInputValue(value);
  };

  const clearFilter = () => {
    setFilterTable([]);
    setSelectedItemsBrand(null);
    setSelectedItemsCategory(null);
    setActiveButtonClear(false);
  };
  return (
    <LayoutWeb className="layout-page" keys={"product"}>
      <Content>
        <Divider orientation="left">Product</Divider>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Row>
            <Col flex={4}></Col>
            <Col flex={1}>
              <Search
                style={{ width: "100%" }}
                placeholder="Search By Product Name"
                onSearch={onSearch}
                enterButton="Search"
              />
            </Col>
          </Row>
          <Divider orientation="right" style={{ fontSize: "12px" }}>
            Filter Product
          </Divider>
          <Row gutter={[8, 16]}>
            <Col flex={1}>
              <Button
                disabled={!activeButtonClear}
                type="primary"
                onClick={clearFilter}
              >
                Clear Filter
              </Button>
            </Col>
            <Col flex={1}>
              <Row>
                <Col span={12}>
                  <Slider
                    min={0}
                    max={
                      getProductFilter.length === 0
                        ? []
                        : getProductFilter.priceMax
                    }
                    onChange={changeFilterPrice}
                    value={typeof inputValue === "number" ? inputValue : 0}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={0}
                    max={
                      getProductFilter.length === 0
                        ? []
                        : getProductFilter.price
                    }
                    style={{
                      margin: "0 16px",
                      width: "100%",
                    }}
                    value={inputValue}
                    onChange={changeFilterPrice}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}></Row>
            </Col>
            <Col flex={1}>
              <SelectItem
                disabled={selectedItemsCategory !== null ? true : false}
                value={selectedItemsBrand}
                onChange={changeFilterBrand}
                title={"Brand"}
                data={
                  getProductFilter.length === 0 ? [] : getProductFilter.brand
                }
              />
            </Col>
            <Col flex={1}>
              <SelectItem
                disabled={selectedItemsBrand !== null ? true : false}
                value={selectedItemsCategory}
                onChange={changeFilterCategory}
                title={"Category"}
                data={
                  getProductFilter.length === 0 ? [] : getProductFilter.category
                }
              />
            </Col>
          </Row>
        </Space>
      </Content>
      <Divider />
      <Table
        loading={getProductLoading}
        rowKey={(record) => record.id}
        dataSource={
          getProductResult === null
            ? []
            : filterTable.length !== 0
            ? filterTable
            : getProductResult.products
        }
        columns={columnTableProduct}
        scroll={{
          x: 800,
          y: 1200,
        }}
      />
      <Divider />
    </LayoutWeb>
  );
}
