"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Input from "@/Components/Input/Input";
import Button from "@/Components/Button/Button";
import { urls } from "@/app/constants/constants";
import makeHttpRequest from "@/app/services/apiCall";
import { useAuth } from "@/contexts/AuthContext";
import { CircularIndeterminate } from "@/Components/Loaders/Loaders";
import { Alert, Snackbar } from "@mui/material";

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toastStatus, setToastStatus] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { login, logout } = useAuth();

  const pattern = /[^@s]+@[^@s]+.[^@s]+/;

  const submit = async (e) => {
    e.preventDefault();
    setDisabledBtn(true);
    setLoading(true);
    const submitObj = {
      email: e.target.email.value,
      password: e.target.password.value,
      isAdmin: true,
    };
    const response = await makeHttpRequest(urls.login, "post", submitObj);
    if (response.data.status) {
      setDisabledBtn(false);
      setLoading(false);
      setToastStatus({
        open: true,
        message: "Loggedin successfully",
        severity: "success",
      });
      login();
    } else {
      setDisabledBtn(false);
      setLoading(false);
      setToastStatus({
        open: true,
        message: response.data.message || "Error while logging in",
        severity: "error",
      });
    }
  };

  const onChange = (e) => {
    setCredentials((prev) => {
      const newCredentials = { ...prev, [e.target.name]: e.target.value };
      return newCredentials;
    });
  };

  useEffect(() => {
    const isEmailValid = credentials.email !== "";
    const isPasswordValid = credentials.password !== "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailFormatValid = emailPattern.test(credentials.email);
    setDisabledBtn(!(isEmailValid && isPasswordValid && isEmailFormatValid));
  }, [credentials]);

  return (
    <div className="flex items-center justify-center h-[100dvh]">
      <div
        className="sm:relative absolute sm:top-0 sm:right-0 sm:left-0 sm:right-0 flex flex-col sm:rounded-[12px] p-[25px] sm:min-h-[250px] sm:min-w-[250px] sm:max-h-[520px] sm:max-w-[520px] h-full w-full items-center justify-center bg-white min-w-500 sm:rounded-2.5 shadow-md "
        style={{ height: "100dvh" }}
      >
        <Image
          src={require("/src/assets/Images/Rayab.png")}
          alt="Logo"
          loading="lazy"
          placeholder="blur"
          width={200}
          className="mb-[40px]"
        />
        <form className="min-w-[180px] max-w-[320px] w-full" onSubmit={submit}>
          <Input
            label={"Email Id"}
            type={"text"}
            name={"email"}
            onChange={onChange}
            value={credentials.email}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          />
          <Input
            label={"Password"}
            type={showPw ? "text" : "password"}
            name={"password"}
            showPw={showPw}
            setShowPw={setShowPw}
            onChange={onChange}
            value={credentials.password}
            autocomplete="off"
          />

          <Button
            type={"submit"}
            name={
              loading ? (
                <CircularIndeterminate size={30} color={"#e47e52"} />
              ) : (
                "Login"
              )
            }
            disabled={disabledBtn}
          />
        </form>
      </div>
      <Snackbar
        open={toastStatus.open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={()=>{
          setToastStatus({
            open:false,
            severity:'',
            message:''
          })
        }}
      >
        <Alert severity={toastStatus.severity} sx={{ width: "100%" }}>
          {toastStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
