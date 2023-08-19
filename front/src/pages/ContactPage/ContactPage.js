import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { test } from "../../states/atoms";
import { useNavigate } from "react-router-dom";

function ContactPage() {
  const navigate = useNavigate();
  const [isTrue, setIsTrue] = useState(false);
  const [str, setStr] = useRecoilState(test);
  const strInAtom = useRecoilValue(test);

  // useEffect(() => {
  //   console.log(isTrue);
  //   console.log("strInAtom ", strInAtom);
  //   console.log("str: ", str);
  // }, [isTrue, str, strInAtom]);
  return (
    <>
      <button
        onClick={() => {
          navigate("/chat");
        }}
      >
        change
      </button>
      <input
        type="text"
        value={str}
        onChange={(e) => {
          setStr(e.target.value);
        }}
      ></input>
      <div>ContactPage</div>
    </>
  );
}

export default ContactPage;
