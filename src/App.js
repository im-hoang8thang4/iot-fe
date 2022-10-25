import { Switch } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import bg from "./assets/iot-bg2.jpg";
function App() {
  const [toggleLight, setToggleLight] = useState(false);
  const [autoLight, setAutoLight] = useState(false);
  const handletoggleLight = async () => {
    console.log("toggleLight");
      await axios.patch("http://iot.tuiladat.ml/light/LIGHT_01", {
      mode: "manual",
      enabled: !toggleLight,
    });
    setToggleLight(!toggleLight);
  };
  const handleautoLight = async () => {
    setAutoLight(!autoLight);
    await axios.patch("http://iot.tuiladat.ml/light/LIGHT_02", {
      mode: "auto",
      enabled: !autoLight,
    });
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <img src={bg} className="w-full h-full object-cover" />
      <div className="flex flex-col absolute gap-3 right-[20%] top-[20%]">
        <div className="flex gap-2 items-center">
          <Switch
            id="toggleLight"
            ripple={true}
            checked={toggleLight}
            onClick={handletoggleLight}
          />
          <span className="text-lg font-semibold text-white">
            Điều khiển bật tắt bóng đèn
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Switch
            id="autoLight"
            ripple={true}
            checked={autoLight}
            onClick={handleautoLight}
          />
          <span className="text-lg font-semibold text-white">
            Tự động bật tắt đèn khi môi trường sáng thay đổi
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
