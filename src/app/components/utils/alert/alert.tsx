"use client";
import React, { useEffect, useState } from "react";
import style from "./alert.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { GoIssueClosed } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { setAlert } from "@/app/redux/utils/message";

export default function Alert() {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    color: "",
    bgcolor: "",
    border: "",
    icon: <GoIssueClosed size={20} />,
  });
  const data = useSelector((state: RootState) => state.message.data);

  const handler = () => {
    if (data.type == "success") {
      setDetails({
        color: "#2a3e2c",
        bgcolor: "#a8f1c6",
        border: "#1c8149",
        icon: <GoIssueClosed size={20} />,
      });
      const timeoutId = setTimeout(() => {
        showHandler();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }

    if (data.type == "error") {
      setDetails({
        color: "#2a3e2c",
        bgcolor: "#f6a7a3",
        border: "#741d1d",
        icon: <IoIosCloseCircleOutline size={20} />,
      });
      const timeoutId = setTimeout(() => {
        showHandler();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }

    if (data.type == "info") {
      setDetails({
        color: "#111",
        bgcolor: "#f4f4f4",
        border: "#741d1d",
        icon: <IoIosCloseCircleOutline size={20} />,
      });
      const timeoutId = setTimeout(() => {
        showHandler();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  };

  const showHandler = () => {
    
    dispatch(setAlert({ data: { message: "", type: "", show: false } }));
  };
  useEffect(() => {
    handler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
 
  return (
    <div
      className={style.main}
      style={{
        display: `${data.show ? "flex" : "none"}`,
        backgroundColor: `${details.bgcolor}`,
        borderLeft: `5px solid ${details.border}`,
      }}
    >
      <p style={{ color: `${details.color}` }}>
        {" "}
        <span>{details.icon}</span> {data.message ?? "message"}
      </p>
      <span onClick={showHandler}>
        <AiOutlineClose size={20} />
      </span>
    </div>
  );
}
