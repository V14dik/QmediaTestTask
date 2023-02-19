import {
  Button,
  OutlinedInput,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import "./App.css";

function App() {
  const [seminars, setSeminars] = useState([
    "Выбрать",
    "First",
    "Second",
    "Third",
  ]);

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

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [seminar, setSeminar] = useState(seminars[0]);

  const [isFormValid, setValidationStatus] = useState(false);

  const [isEmailValid, setEmailValidationStatus] = useState(true);
  const [isNameValid, setNameValidationStatus] = useState(true);
  const [isSeminarSelected, setIsSeminarSelected] = useState(
    seminar !== "Выбрать"
  );

  const submitHandler = (event) => {
    event.preventDefault();
    checkEmail();
    checkName();
    setValidationStatus(isEmailValid && isNameValid && isSeminarSelected);
  };

  return (
    <div className="app">
      <main>
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
                    checkName();
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
                    checkEmail();
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
                disabled={!(isEmailValid && isNameValid && isSeminarSelected)}
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
