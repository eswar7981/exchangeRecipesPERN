import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Following = () => {
  const [following, setFollowing] = useState();
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/user/following`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.following);
        setFollowing(res.following);
      });
  }, []);

  const backButton = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="">

<div className="mt-10 fixed top-1/3 ">
        <button
          onClick={backButton}
          className="bg-black  text-white px-2 py-2 text-2xl hover:px-3   shadow-[rgba(0,_0,_3,_2)_3px_2px_5px_-12px]"
        >
          🡰
        </button>
      </div>
      <div className="mt-10 fixed top-1/3 ">
        <button
          onClick={backButton}
          className="bg-black  text-white px-2 py-2 text-2xl hover:px-3   shadow-[rgba(0,_0,_3,_2)_3px_2px_5px_-12px]"
        >
          🡰
        </button>
      </div>

      <div className="bg-black mt-20 min-w-20 text-white">
        {following &&
          following.map((author) => (
            <div className="flex max-auto-max flex items-center">
              <p></p>
              <p className="p-5 bg-red-500 border rounded-lg">{author.userName}</p>
              <p className="p-5 bg-red-500 border rounded-lg">{author.followers}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Following;
