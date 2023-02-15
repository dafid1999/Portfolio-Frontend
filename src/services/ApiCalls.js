export const BaseUrl = 'http://localhost:8000/'

export const AuthUser = async () => {
  return await fetch("".concat(`${BaseUrl}`, 'auth/user'), {
     headers: {
       "Content-Type": "application/json",
     },
     credentials: "include",
   });
}

export const UserInfo = async () => {
   const response = await fetch("".concat(`${BaseUrl}`, 'auth/user'),  {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
   })
   return await response.json();
}

export const UserType = async (id) => {
  const response = await fetch("".concat(`${BaseUrl}`, "users/", `${id}`), {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  return await response.json();
}

export const Logout = async () => {
  return await fetch("".concat(`${BaseUrl}`, 'auth/logout/'), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export const UserPortfolio = async (id) => {
   const response = await fetch("".concat(`${BaseUrl}`, 'portfolio/portfolio/', `${id}`),  {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
   })
   return await response.json();
}

export const EditUserPortfolio = async (id) => {
   const response = await fetch("".concat(`${BaseUrl}`, 'portfolio/portfolio/', `${id}`),  {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
   })
   return await response.json();
}

