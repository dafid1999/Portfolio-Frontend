import { Navbar } from "react-bootstrap";
import {Box, Dialog, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import { CustomButton } from "../assets/CustomButton";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import { BaseUrl, UserInfo, UserType} from "../../services/ApiCalls";
import {Navigate} from "react-router";

const LoginNegativeMessage = () => (
  <Typography>
    Podano nieprawidłowy adres e-mail lub hasło.
  </Typography>
);

const RegisterPositiveMessage = () => (
  <Typography>
    Twoje konto zostało utworzone.
  </Typography>
);

const RegisterNegativeMessage = () => (
  <Typography>
    Wygląda na to, że Twoje konto zostało już utworzone.
  </Typography>
);

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Niepoprawny e-mail!")
    .required("E-mail jest wymagany!"),

  password: Yup.string().required("Hasło jest wymagane!"),
});

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("Imię jest wymagane!"),

  last_name: Yup.string().required("Nazwisko jest wymagane!"),

  email: Yup.string()
    .email("Niepoprawny e-mail!")
    .required("E-mail jest wymagany!"),

  password1: Yup.string()
    .required("Hasło jest wymagane!")
    .min(8, "Hasło musi zawierać minimum 8 znaków.")
    .matches(/^.*(?=.*\d).*$/, "Hasło musi zawierać przynajmniej jedną cyfrę.")
    .matches(
      /^.*((?=.*[A-Z])).*$/,
      "Hasło musi zawierać przynajmniej jedną wielką literę."
    ),

  password2: Yup.string()
    .required("Pole jest wymagane!")
    .oneOf([Yup.ref("password1")], "Podane hasła nie są identyczne"),
});


function RightSideOfHomeNavbar() {
  const [id, setId] = useState();
  const [openLogin, setOpenLogin] = useState(false);
  const [userType, setUserType] = useState();
  const [openRegister, setOpenRegister] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  const handleOpenRegister = () => {
    setOpenRegister(true);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const loginDisplayMessage = () => {
    if (responseStatus === 400) {
      return <LoginNegativeMessage />;
    } else if (userType === 1) {
      return <Navigate to="/AdminMainPage" />;
    } else if (userType === 2) {
      return <Navigate to="/UserMainPage" />;
    }
    else if (userType === 3) {
      return <Navigate to="/VIPMainPage" />;
    }
  };

  const registerDisplayMessage = () => {
  if (responseStatus === 201) {
    return <RegisterPositiveMessage />;
  } else if (responseStatus === 400) {
    return <RegisterNegativeMessage />;
  }
  };

  useEffect(() => {
    UserInfo().then((r) => setId(r.pk));

    if (id) {
      UserType(id).then((r) => {setUserType(r.user_type)});
    }
  });

  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      let resStatus = 0;
      await fetch("".concat(`${BaseUrl}`, "auth/login/"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        resStatus = res.status;
        setResponseStatus(resStatus);
      });
    },
  });

  const register = useFormik({
    initialValues:{
      email: "",
      password1: "",
      password2: "",
      first_name: "",
      last_name: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      let resStatus = 0;
      await fetch("".concat(`${BaseUrl}`, "auth/registration/"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        resStatus = res.status;
        setResponseStatus(resStatus);
      });
    }
  });

  return (
      <>
        <Box
          sx={{
            minWidth: '90vh',
            minHeight: '9vh',
            pt: '0.5vh',
          }}
        >
          <Navbar.Collapse className="justify-content-end">
            <CustomButton
                buttonSize="btn--small"
                buttonStyle="btn--login"
                onClick={handleOpenLogin}
            >
              Zaloguj sie
            </CustomButton>{' '}
            <Dialog
                open={openLogin}
                onClose={handleCloseLogin}
                maxWidth={'sm'}
                fullWidth={1}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <DialogTitle
                  sx={{
                    color: '#28F506',
                    fontSize: '32px',
                    fontFamily: 'Exo',
                    fontStyle: 'normal',
                    lineHeight: 0.1,
                    pt: '7vh',
                  }}
                >
                  Zaloguj się do Twoje Portfolio
                </DialogTitle>
                <DialogContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      color: '#535353',
                      fontSize: '16px',
                      fontFamily: 'Exo',
                      fontStyle: 'normal',
                      pb: '2vh',
                    }}
                  >
                    <Typography  mr={0.5}> Jesteś nowym użytkownikem?  </Typography>
                    <Typography sx={{textDecoration: 'underline'}} onClick={ () => {handleCloseLogin(); handleOpenRegister();}}>
                      Załóż konto.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "45vh",
                    }}
                  >
                    <form onSubmit={login.handleSubmit}>
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        placeholder="Adres e-mail"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={login.values.email}
                        onChange={login.handleChange}
                        error={login.touched.email && Boolean(login.errors.email)}
                        helperText={login.touched.email && login.errors.email}
                      />
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        placeholder="Hasło"
                        type="password"
                        variant="outlined"
                        value={login.values.password}
                        onChange={login.handleChange}
                        error={login.touched.password && Boolean(login.errors.password)}
                        helperText={login.touched.password && login.errors.password}
                      />
                      <Typography fontSize={16} color='#535353' textAlign='right'>
                        Nie pamiętasz hasła?
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <CustomButton
                            buttonSize="btn--medium"
                            buttonStyle="btn--primary"
                            type="submit"
                        >
                          ZALOGUJ SIE
                        </CustomButton>
                      </Box>
                    </form>
                    {loginDisplayMessage()}
                  </Box>
                </DialogContent>
              </Box>
            </Dialog>
            <CustomButton
                buttonSize="btn--small"
                buttonStyle="btn--register"
                onClick={handleOpenRegister}
            >
              Zarejestruj sie
            </CustomButton>{' '}
            <Dialog
                open={openRegister}
                onClose={handleCloseRegister}
                maxWidth={'sm'}
                fullWidth={1}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <DialogTitle
                  sx={{
                    color: '#28F506',
                    fontSize: '32px',
                    fontFamily: 'Exo',
                    fontStyle: 'normal',
                    lineHeight: 0.1,
                    pt: '7vh',
                  }}
                >
                  Zarejestruj się do Twoje Portfolio
                </DialogTitle>
                <DialogContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      color: '#535353',
                      fontSize: '16px',
                      fontFamily: 'Exo',
                      fontStyle: 'normal',
                      pb: '2vh',
                    }}
                  >
                    <Typography  mr={0.5}> Masz już konto?  </Typography>
                    <Typography sx={{textDecoration: 'underline'}} onClick={ () => {handleCloseRegister(); handleOpenLogin();}}>
                      Zaloguj sie.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "35vh",
                    }}
                  >
                    <form onSubmit={register.handleSubmit}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id="first_name"
                        name="first_name"
                        placeholder="Imię"
                        type="text"
                        value={register.values.first_name}
                        onChange={register.handleChange}
                        error={register.touched.first_name && Boolean(register.errors.first_name)}
                        helperText={register.touched.first_name && register.errors.first_name}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id="last_name"
                        name="last_name"
                        placeholder="Nazwisko"
                        type="text"
                        value={register.values.last_name}
                        onChange={register.handleChange}
                        error={register.touched.last_name && Boolean(register.errors.last_name)}
                        helperText={register.touched.last_name && register.errors.last_name}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id="email"
                        name="email"
                        placeholder="Adres e-mail"
                        type="email"
                        value={register.values.email}
                        onChange={register.handleChange}
                        error={register.touched.email && Boolean(register.errors.email)}
                        helperText={register.touched.email && register.errors.email}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id="password1"
                        name="password1"
                        placeholder="Hasło"
                        type="password"
                        value={register.values.password1}
                        onChange={register.handleChange}
                        error={register.touched.password1 && Boolean(register.errors.password1)}
                        helperText={register.touched.password1 && register.errors.password1}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id="password2"
                        name="password2"
                        placeholder="Powtórz hasło"
                        type="password"
                        value={register.values.password2}
                        onChange={register.handleChange}
                        error={register.touched.password2 && Boolean(register.errors.password2)}
                        helperText={register.touched.password2 && register.errors.password2}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: "center",
                          fontSize: 16,
                          color: '#535353'
                        }}
                      >
                        <Typography
                          sx={{
                            textDecoration: 'underline',
                            whiteSpace: "pre-line",
                          }}
                        >
                          {'Rejestrując się akceptujesz regulamin\n'}
                          {'Twoje Portfolio i Politykę Prywatności'}
                        </Typography>

                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <CustomButton
                            buttonStyle="btn--primary"
                            buttonSize="btn--medium"
                            type="submit"
                        >
                          Utwórz konto
                        </CustomButton>
                      </Box>
                    </form>
                  {registerDisplayMessage()}
                  </Box>
                </DialogContent>
              </Box>
            </Dialog>
          </Navbar.Collapse>
        </Box>
      </>
    );
}

export default RightSideOfHomeNavbar;
