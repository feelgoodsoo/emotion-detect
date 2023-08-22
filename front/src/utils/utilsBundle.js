export async function simpleFetch(URL, method, JSONbody, authKey) {
  let response;
  if (JSONbody === "") {
    response = await fetch(URL, {
      method: method, //"POST"
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authKey}`,
      },
    }).then(async (res) => {
      let parsedData = await res.json();
      //console.log("fetch data success in simpleFetch", parsedData);
      return parsedData;
    });
  } else if (authKey === "") {
    response = await fetch(URL, {
      method: method, //"POST"
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONbody,
    }).then(async (res) => {
      let parsedData = await res.json();
      //console.log("fetch data success in simpleFetch", parsedData);
      return parsedData;
    });
  } else if (authKey !== "") {
    response = await fetch(URL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authKey}`,
      },
      body: JSONbody,
    }).then(async (res) => {
      let parsedData = await res.json();
      //console.log("fetch data success in simpleFetch", parsedData);
      return parsedData;
    });
  }
  return response;
}

export const urls = {
  loginPath: "http://127.0.0.1:8000/dj-rest-auth/login/", // AuthPage
  registerPath: "http://127.0.0.1:8000/dj-rest-auth/registration/", // AuthPage
  chatListPath: "http://127.0.0.1:8000/api/chat/list/", // ChatPage
  chatSendPath: "http://127.0.0.1:8000/api/chat/post/", // ChatPage
  boardListPath: "http://127.0.0.1:8000/api/board/get/list/", // BoardHomePage
  boardCreatePath: "http://127.0.0.1:8000/api/board/post/create/", // BoardCreatePage
  boardGetByIdPath: "http://127.0.0.1:8000/api/board/get/", // BoardDetailPage. need to add boardId at the end of url
  boardDeletePath: "http://127.0.0.1:8000/api/board/post/delete/", // BoardDetailPage. need to add boardId at the end of url
  boardGetByWriterPath: "http://127.0.0.1:8000/api/board/get/bywriter/", // BoardMyPostPage
  boardSearchPath: "http://127.0.0.1:8000/api/board/get/searchByKeyword/", // BoardSearchPage. need to add keyword at the end or url
  boardUpdateByIdPath: "http://127.0.0.1:8000/api/board/post/update/", // BoardUpdatePage. need to add boardId at the end or url
  tokenRefreshPath: "http://127.0.0.1:8000/dj-rest-auth/token/refresh/", // Nav
  commentCreatePath: "http://127.0.0.1:8000/api/comment/post/create/", // BoardDetailPage
  commentListPath: "http://127.0.0.1:8000/api/comment/get/list/", //BoardDetailPage. need to add boardId at the end of url
};

export const logoutHandler = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
};

export const RegisterInputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Username",
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character!",
    label: "Username",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  },
  {
    id: 4,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
  {
    id: 5,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    errorMessage: "Passwords don't match!",
    label: "Confirm Password",
    //pattern: values.password,
    required: true,
  },
];

export const LoginInputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Username",
    label: "Username",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "Email",
    required: true,
  },
  {
    id: 3,
    name: "password",
    type: "password",
    placeholder: "Password",
    label: "Password",
    required: true,
  },
];
