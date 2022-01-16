import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss"

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(`letmeask-33200.web.app/rooms/${props.code}`)
    }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code} </span>
    </button>
  );
}
