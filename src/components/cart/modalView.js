import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Button,
  Collapse,
  Space,
  Card,
  Checkbox,
} from "antd";

export default function ModalView({ visible, onCancel, data }) {
  return (
    <Modal
      centered
      title={"View"}
      visible={visible}
      onCancel={onCancel}
      width={"50%"}
      footer={null}
    >
      <div>
        <Space
          direction="vertical"
          size="middle"
          style={{ display: "flex" }}
        ></Space>
      </div>
    </Modal>
  );
}
