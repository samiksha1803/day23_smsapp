import { useState, useRef } from "react";
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";

function Create()
{
	const rRno=useRef();
	const rName=useRef();
	const rMarks=useRef();

	const [rno,setRno] = useState("");
	const [name,setName] = useState("");
	const [marks,setMarks]=useState("");
	const [msg,setMsg]=useState("");
	
	const hRno = (event) => {setRno(event.target.value); }
	const hName = (event) => { setName(event.target.value); }
	const hMarks = (event) => {setMarks(event.target.value); }
	
	const save=(event) => {
		event.preventDefault();
		

		if (rno === "")
		{
			toast.error("Roll no should not be empty",{autoClose:1000});
			setMsg("");
			rRno.current.focus();
			return;
		}

		if (name === "")
		{
			toast.error("Name should not be empty",{autoClose:1000});
			setMsg("");
			rName.current.focus();
			return;
		}
		if (marks === "")
		{
			toast.error(" Marks should not be empty",{autoClose:1000});
			setMsg("");
			rMarks.current.focus();
			return;
		}

		let url = "https://smsapp-jsmern-day23.onrender.com/ss";
		let data ={rno,name,marks}

		axios.post(url,data)
		.then(res=>{
			if (res.data.affectedRows ===1)
			{
				toast.success(" Record Created",{autoClose:1000});
				setRno("");
				setName("");
				setMarks("");
				rRno.current.focus();
			}
			else if(res.data.rrno === 1062)
			{
				setMsg(rno+ " already exists");
				setRno("");
				rRno.current.focus();
			}
		})
		.catch(err => {
			setMsg("Issue: "+err);
		});
		
	}

	return(
	<>
		<h1> Create Page </h1>
		<ToastContainer/>
		<form onSubmit={save}>
		<input type="number" placeholder="Enter Roll no" ref={rRno}
onChange={hRno} value={rno} />
		<br/><br/>
		<input type="text" placeholder="Enter Name" ref={rName}
onChange={hName} value={name} />
		<br/><br/>
		<input type="number" placeholder="Enter Marks" ref={rMarks}
onChange={hMarks} value={marks} />
		<br/><br/>
		<input type="Submit" value="Save" />
		<br/><br/>
		</form>
		<h2> { msg } </h2>		
	</>
	);

}
export default Create;