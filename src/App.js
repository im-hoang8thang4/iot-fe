import { Switch } from "@material-tailwind/react";
import axios from "axios";
import { useState,useEffect } from "react";
import bg from "./assets/iot-bg2.jpg";
function App() {
  const [light, setLight] = useState([])
  const [autoLight, setAutoLight] = useState(false);
  const getLight = async () =>{
    const res = await axios.get('http://iot.tuiladat.ml/light')
    setLight(res.data)
  }
  useEffect(()=>{
    getLight()
  },[])
  const handletoggleLight = async (l) => {
    console.log(l.lightName)
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
    setLight(light.map(m=>{
      if(l.lightName === m.lightName){
        return{
          ...l, enabled: !l.enabled
        }

      }
      else{
        return m
      }
    }))
   
  };
  console.log(light)
  const handleautoLight = async () => {
    setAutoLight(!autoLight);
    await axios.patch(
      "http://iot.tuiladat.ml/light/LIGHT_02",
      {
        mode: 0,
        enabled: !autoLight,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <img src={bg} className="w-full h-full object-cover" />
      <div className="flex flex-col absolute gap-3 right-[20%] top-[20%]">
        {
          light.map(l =>(
            <div className="flex gap-2 items-center">
            <Switch
              id={l.id}
              ripple={true}
              checked={l.enabled}
              onChange={()=>handletoggleLight(l)}
            />
            <span className="text-lg font-semibold text-white">
             {l.lightName}
            </span>
          </div>
          ))
        }
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
