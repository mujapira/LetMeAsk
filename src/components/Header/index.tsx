import Switch from "react-switch";
import { Button } from "../Button";
import { RoomCode } from "../RoomCode";

import logoImg from "../../assets/images/logo.svg";
import { ref, update } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../services/firebase";
import { ThemeContext } from "styled-components";
import { shade } from "polished";
import { useContext } from "react";
import "./index.scss"

type RoomParams = {
  id: string;
};

interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const navigate = useNavigate();

  async function handleEndRoom() {
    await update(ref(database, `rooms/${roomId}`), {
      endedAt: new Date(),
    });

    navigate("/");
  }

  return (
    <header>
      <div className="content">
        <img src={logoImg} alt="Let me ask logo" />
          <Switch
            onChange={toggleTheme}
            checked={title === "dark"}
            checkedIcon={false}
            uncheckedIcon={false}
            height={20}
            width={40}
            handleDiameter={15}
            offColor={colors.primary}
            onColor={colors.secundary}
            />
          <RoomCode code={roomId!} />
          <Button isOutlined onClick={handleEndRoom}>
            Encerrar sala
          </Button>
            <div>
        </div>
      </div>
    </header>
  );
};
export default Header;
