import React from "react";
import { Select } from "antd";

export default function SelectItem({ disabled, value, onChange, data, title }) {
  return (
    <Select
      disabled={disabled}
      placeholder={title}
      value={value}
      onChange={onChange}
      allowClear={true}
      style={{
        width: "100%",
      }}
      options={data}
    />
  );
}
