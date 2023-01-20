import React from "react";
import { Select } from "antd";

export default function SelectItem({ disabled, value, onChange, data, title }) {
  return (
    <Select
      disabled={disabled}
      mode="multiple"
      placeholder={title}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
      }}
      options={data.map((item) => ({
        value: item,
        label: item,
      }))}
    />
  );
}
