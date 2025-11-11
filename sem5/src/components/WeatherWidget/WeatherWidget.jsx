import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import WaterDropIcon from '@mui/icons-material/Opacity';

export default function WeatherWidget(){
  const data = {
    city: "Москва",
    temp: 18,
    condition: "Переменная облачность",
    humidity: 62,
    wind: 4.5,
    forecast: [
      {day:"Вт", t:18, icon:"cloud"},
      {day:"Ср", t:20, icon:"sun"},
      {day:"Чт", t:16, icon:"cloud"},
    ]
  };

  const icon = data.temp > 20 ? <WbSunnyIcon /> : <CloudIcon />;

  return (
    <Card elevation={3} sx={{borderRadius:3}}>
      <CardContent>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div>
            <Typography variant="subtitle2" color="text.secondary">{data.city}</Typography>
            <Typography variant="h4" sx={{fontWeight:700}}>{data.temp}°C</Typography>
            <Typography variant="body2" color="text.secondary">{data.condition}</Typography>
          </div>

          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <IconButton size="large">{icon}</IconButton>
            <Typography variant="caption">ветер {data.wind} м/с</Typography>
          </div>
        </div>

        <div style={{display:"flex", gap:12, marginTop:16}}>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <WaterDropIcon fontSize="small" />
            <Typography variant="body2">{data.humidity}% влажность</Typography>
          </div>
        </div>

        <div style={{display:"flex", gap:12, marginTop:16}}>
          {data.forecast.map((f,i)=>(
            <div key={i} style={{textAlign:"center", minWidth:48}}>
              <div style={{
                background:"#f1f5f9", padding:8, borderRadius:10, marginBottom:6
              }}>{f.icon==="sun" ? "☀️" : "☁️"}</div>
              <div style={{fontSize:13}}>{f.day}</div>
              <div style={{fontWeight:600}}>{f.t}°</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
