import React from "react";

function Textarea({
  label,
  name,
  onChange,
  value,
  disabled,
  rows,
  placeholder,
  requiredStar,
}) {
  return (
    <label className="block relative mb-4">
      <span className="block text-[16px] text-[#0b1c48] font-[20px] opacity-80">
        {label} {<span style={{ color: "red" }}>*</span>}
      </span>

      <textarea
        className="mt-1 block w-full pl-3 pr-3 py-2 bg-white border border-slate-300 rounded-md text-[#0b1c48] text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-[#0b1c48] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[20px]"
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        rows={rows}
        placeholder={placeholder}
      />
    </label>
  );
}

export default Textarea;
