const express=require("express");
const cors=require("cors");
const mysql2=require("mysql2");


const app=express();
app.use(cors())
app.use(express.json());

const con=mysql2.createConnection({
	host:"sql12.freesqldatabase.com",
	user:"sql12787168",
	password:"s7sG9vkfDP",
	database:"sql12787168",
});

app.post("/ss",(req,res) =>{
	let sql="insert into student values(?,?,?)";
	let data=[req.body.rno,req.body.name,req.body.marks];
	con.query(sql,data,(error,result) =>{
		if (error)			res.send(error);
		else				res.send(result);
	});
});

app.get("/gs",(req,res) =>{
	let sql="select * from student";
	con.query(sql,(error,result) =>{
		if (error)			res.send(error);
		else				res.send(result);
	});
});


app.put("/us",(req,res) =>{
	let sql="update student set name=?, marks=? where rno=?";
	let data=[req.body.name,req.body.marks,req.body.rno];
	con.query(sql,data,(error,result) =>{
		if (error)			res.send(error);
		else				res.send(result);
	});

});

app.delete("/ds", (req, res) => {
  let rno = req.query.rno; // fetch ?rno=... from URL
  let sql = "delete from student where rno=?";
  con.query(sql, [rno], (error, result) => {
    if (error) res.status(500).send(error);
    else res.send(result);
  });
});

#app.listen(9000, () => {console.log("ready to server @9000"); });