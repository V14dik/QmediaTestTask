import {
  Button,
  OutlinedInput,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [seminars, setSeminars] = useState([
    "Выбрать",
    "First",
    "Second",
    "Third",
  ]);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [seminar, setSeminar] = useState(seminars[0]);

  const checkEmail = () => {
    if (
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        email
      )
    ) {
      setEmailValidationStatus(true);
    } else setEmailValidationStatus(false);
  };

  const checkName = () => {
    if (/^[a-zA-ZА-ЯЁа-яё]+ [a-zA-ZА-ЯЁа-яё]+$/.test(userName.trim())) {
      setNameValidationStatus(true);
    } else setNameValidationStatus(false);
  };

  const [isFormValid, setValidationStatus] = useState(false);

  const [isEmailValid, setEmailValidationStatus] = useState(true);
  const [isNameValid, setNameValidationStatus] = useState(true);
  const [isSeminarSelected, setIsSeminarSelected] = useState(
    seminar !== "Выбрать"
  );

  const submitHandler = (event) => {
    event.preventDefault();
    sendToEmail();
  };

  const sendToEmail = () => {
    console.log("email");
    emailjs.send(
      "service_dvgd7n6",
      "template_blvlimi",
      {
        name: userName,
        seminar: seminar,
      },
      "SUzwqr6UVdCtHPKAV"
    );
    toast.success(
      "Ваша заявка успешно отправлена и находится в обработке. Ожидайте email с подтверждением бронирования.",
      { position: toast.POSITION.TOP_CENTER, theme: "colored" }
    );
  };

  useEffect(() => {
    email && checkEmail();
    userName && checkName();
    setValidationStatus(!(isEmailValid && isNameValid && isSeminarSelected));
  }, [email, userName, isEmailValid, isNameValid, isSeminarSelected]);

  return (
    <div className="app">
      <main>
        <ToastContainer />
        <div className="container">
          <h1>Отправить заявку на участие в семинаре</h1>
          <p>
            Организаторы свяжутся с вами для подтверждения записи.
            <br /> Участие в семинаре <ins>бесплатное</ins>.
          </p>
          <form className="form" onSubmit={submitHandler}>
            <div className="input-container">
              <label htmlFor="name">Ваше имя:</label>
              <FormControl>
                <OutlinedInput
                  id={"name"}
                  maxRows={1}
                  placeholder="Иванов Алексей"
                  color="secondary"
                  type="text"
                  value={userName}
                  sx={{
                    fontSize: {
                      xs: "15px",
                      sm: "20px",
                    },
                  }}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  error={!isNameValid ? true : false}
                />
                {!isNameValid && (
                  <FormHelperText error>
                    {"Пожалуйста, введите ваше полное имя"}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="input-container">
              <label htmlFor="email">Контактный email:</label>
              <FormControl>
                <OutlinedInput
                  maxRows={1}
                  placeholder="example@mail.com"
                  color="secondary"
                  type="text"
                  id={"email"}
                  value={email}
                  variant={"outlined"}
                  sx={{
                    fontSize: {
                      xs: "15px",
                      sm: "20px",
                    },
                  }}
                  error={!isEmailValid ? true : false}
                  onChange={(e) => {
                    setEmail(e.target.value.trim());
                  }}
                />
                {!isEmailValid && (
                  <FormHelperText error id="accountId-error">
                    {"Некоректный email"}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="input-container">
              <label>Интересующий семинар:</label>
              <FormControl>
                <Select
                  value={seminar}
                  color={"secondary"}
                  onChange={(e) => {
                    setSeminar(e.target.value);
                    setSeminars(
                      seminars.filter((sem) => {
                        return sem !== "Выбрать";
                      })
                    );
                    setIsSeminarSelected(true);
                  }}
                  sx={{
                    fontSize: {
                      xs: "15px",
                      sm: "20px",
                    },
                  }}
                >
                  {seminars.map((seminar, index) => (
                    <MenuItem
                      key={seminar + index}
                      value={seminar}
                      color={"secondary"}
                    >
                      {seminar}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="form-footer">
              <span className="form-description">
                Все поля обязательны для заполнения.
                <br />
                Отправляя заявку, вы соглашаетесь с договором публичной оферты и
                политикой обработки данных.
              </span>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                disabled={isFormValid}
              >
                Отправить
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
