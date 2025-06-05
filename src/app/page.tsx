import axios from "axios"
const Home =async()=>{
  const url = "http://localhost:8080/programmers"
  const res = await  axios.get(url)
  return
  <div>
    home
  </div>

}