import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { useState } from "react";

const Input = ({
  label,
  type,
  name,
  value,
  showPw,
  setShowPw,
  onChange,
  disabled,
  pattern,
  autocomplete,
  search,
  required,
  inputRef,
  typePassword,
  requiredStar,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full">
      <label className="block relative">
        <span className="block text-[16px] text-[#0b1c48] font-[20px] opacity-80">
          {label} {requiredStar && <span style={{ color: "red" }}>*</span>}
        </span>

        <input
          type={typePassword ? (show ? "text" : "password") : type}
          className={`mt-1 block w-full pl-3 ${
            name === "password" ? "pr-8" : "pr-3"
          } py-2 bg-white border border-slate-300  text-[#0b1c48] text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-[#0b1c48]
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
       ${
         search
           ? "rounded-[100px] mb-0 max-w-[300px] w-full mr-[20px] "
           : "rounded - md  mb-[20px]"
       }`}
          name={name}
          onChange={onChange}
          value={value}
          disabled={disabled}
          pattern={pattern}
          autoComplete={autocomplete}
          required={required}
          placeholder={`${search ? "Search" : ""}`}
          ref={inputRef}
        />
        {(name === "password" || typePassword) && (
          <span
            className="absolute top-[34px] right-[8px] cursor-pointer "
            onClick={() => {
              if (typePassword) {
                setShow(!show);
              } else {
                setShowPw(!show);
              }
            }}
          >
            {typePassword ? (
              show ? (
                <VisibilityOff style={{ color: "#0b1c48", fontSize: "18px" }} />
              ) : (
                <Visibility style={{ color: "#0b1c48", fontSize: "18px" }} />
              )
            ) : showPw ? (
              <VisibilityOff style={{ color: "#0b1c48", fontSize: "18px" }} />
            ) : (
              <Visibility style={{ color: "#0b1c48", fontSize: "18px" }} />
            )}
          </span>
        )}
      </label>
    </div>
  );
};

export default Input;
