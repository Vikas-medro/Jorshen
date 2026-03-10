import axios from "axios";

// Host options:
// Android Emulator  → http://10.0.2.2:3000/api/v1
// iOS Simulator     → http://localhost:3000/api/v1
// Physical Device   → http://<YOUR_LAN_IP>:3000/api/v1
export const API = axios.create({
  baseURL: "http://10.0.2.2:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});