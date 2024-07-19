"use client";
import React, { useEffect, useState } from "react";
import styles from "./TextComponent.module.css";

const TextComponent = ({
  heading,
  Text,
}: {
  heading: string;
  Text: string;
}) => {
  const [caption, SetCaption] = useState("");
  
  useEffect(() => {
    SetCaption(Text);
  }, [Text]);
  
  return (
    <div className={`${styles.boxHeight} w-full p-4 font-inter `}>
      <h3>{heading}</h3>
      <div className={`${styles.textBox} w-full rounded-md p-4`}>
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default React.memo(TextComponent);
