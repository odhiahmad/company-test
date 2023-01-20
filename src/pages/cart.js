import React, { useState, useEffect } from "react";
import LayoutWeb from "./../components/layout/BaseLayout";
import ModalView from "./../components/cart/ModalView";
import { Table, Divider } from "antd";
import { getCart } from "./../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { columnTableCart } from "./../utils/tableHeader";
import Swal from "sweetalert2";

export default function Cart() {
  const dispatch = useDispatch();
  const getCartResult = useSelector((state) => state.getCart.result);
  const getCartLoading = useSelector((state) => state.getCart.loading);
  const getCartError = useSelector((state) => state.getCart.error);

  const [modalView, setModalView] = useState(false);
  const [dataView, setDataView] = useState([]);

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

  const openModalView = (value) => {
    setModalView(true);
    setDataView(value);
  };

  const closeModalView = () => {
    setDataView([]);
    setModalView(false);
  };

  return (
    <LayoutWeb className="layout-page" keys={"cart"}>
      <Divider orientation="left">Cart</Divider>
      <Table
        loading={getCartLoading}
        rowKey={(record) => record.id}
        dataSource={getCartResult === null ? [] : getCartResult.carts}
        columns={columnTableCart(openModalView)}
      />
      <ModalView
        visible={modalView}
        data={dataView}
        onCancel={closeModalView}
      />
    </LayoutWeb>
  );
}
