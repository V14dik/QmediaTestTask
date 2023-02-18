import { Button, OutlinedInput, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import "./App.css";

function App() {
  const seminars = ["First", "Second", "Third"];

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [seminar, setSeminar] = useState(seminars[0]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(seminar);
  };

  return (
    <div className="app">
      <main>
        <div className="container">
          <h1>Отправить заявку на участие в семинаре</h1>
          <form className="form" onSubmit={submitHandler}>
            <p>
              Организаторы свяжутся с вами для подтверждения записи.
              <br /> Участие в семинаре <ins>бесплатное</ins>.
            </p>
            <div className="input-container">
              <label htmlFor="name">Ваше имя:</label>
              <OutlinedInput
                id={"name"}
                maxRows={1}
                placeholder="Иванов Алексей"
                color="secondary"
                type="text"
                value={userName}
                sx={{ fontSize: "20px" }}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Контактный email:</label>
              <OutlinedInput
                maxRows={1}
                placeholder="example@mail.com"
                color="secondary"
                type="text"
                id={"email"}
                value={email}
                variant={"outlined"}
                sx={{ fontSize: "20px" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Интересующий семинар:</label>
              <Select
                value={seminar}
                color={"secondary"}
                onChange={(e) => {
                  setSeminar(e.target.value);
                }}
                sx={{ fontSize: "20px" }}
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
