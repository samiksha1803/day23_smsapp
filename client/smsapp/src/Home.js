import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [info, setInfo] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    let url = "https://smsapp-jsmern-day23.onrender.com/gs";
    axios
      .get(url)
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        toast.error("Issue: " + err, { autoClose: 1000 });
      });
  }, []);

  const delStu = (r) => {
  let url = `https://smsapp-jsmern-day23.onrender.com/ds?rno=${r}`;
  axios
    .delete(url)
    .then((res) => {
      toast.info("Record deleted", { autoClose: 1000 });
      window.location.reload();
    })
    .catch((err) => {
      toast.error("Issue: " + err, { autoClose: 1000 });
    });
};

  const upStu = (r, n, m) => {
    nav("/update", { state: { r, n, m } });
  };

  return (
    <>
      <ToastContainer />
      <h1>Home Page</h1>
      <table border={5}>
        <thead>
          <tr>
            <th>Rno</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {info.map((e) => (
            <tr key={e.rno}>
              <td>{e.rno}</td>
              <td>{e.name}</td>
              <td>{e.marks}</td>
              <td>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure?")) delStu(e.rno);
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => upStu(e.rno, e.name, e.marks)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;
