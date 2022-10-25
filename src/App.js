import { Switch } from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import bg from "./assets/iot-bg2.jpg";
function App() {
  const [light, setLight] = useState([]);
  const [autoLight, setAutoLight] = useState(false);
  const getLight = async () => {
    const res = await axios.get("http://iot.tuiladat.ml/light");
    setLight(res.data);
  };
  useEffect(() => {
    getLight();
  }, []);
  const handletoggleLight = async (l) => {
    console.log(l.lightName);
    await axios.patch(
      `http://iot.tuiladat.ml/light/${l.lightName}`,
      {
        mode: 1,
        enabled: !l.enabled,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLight(
      light.map((m) => {
        if (l.lightName === m.lightName) {
          return {
            ...l,
            enabled: !l.enabled,
          };
        } else {
          return m;
        }
      })
    );
  };
  console.log(light);
  const handleautoLight = async (l) => {
    await axios.patch(
      `http://iot.tuiladat.ml/light/${l.lightName}`,
      {
        mode: l.mode === 1 ? 0 : 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLight(
      light.map((m) => {
        if (l.lightName === m.lightName) {
          return {
            ...l,
            mode: l.mode === 1 ? 0 : 1,
          };
        } else {
          return m;
        }
      })
    );
  };
  const checked = (mode) => {
    if (mode === 1) {
      return true;
    } else return false;
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <img src={bg} className="w-full h-full object-cover" />
      <div className="flex absolute gap-12 right-[20%] top-[20%]">
        {light.map((l) => (
          <div className="flex flex-col gap-3 p-4 border-[1px] border-solid border-yellow-800">
            <span className="flex justify-center text-xl font-bold text-red-900">
            {l.lightName}
            </span>
            <div className="flex gap-2 items-center">
              <Switch
                id={l.lightName}
                ripple={true}
                checked={checked(l.mode)}
                onChange={() => handleautoLight(l)}
              />
              <span className="text-lg font-semibold text-white">
                Tự động bật tắt đèn
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Switch
                id={l.id}
                ripple={true}
                checked={l.enabled}
                onChange={() => handletoggleLight(l)}
                disabled={checked(l.mode)}
              />
              <span className="text-lg font-semibold text-white">
                {l.enabled ? 'ON' : 'OFF'}
              </span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
