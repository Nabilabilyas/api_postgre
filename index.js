const express 	= require('express');
const bodyParser= require('body-parser');
const pg 		= require('pg');
const app		= express();

app.use(bodyParser.json());

const {Client} = require('pg')
const client = new Client({
	user: 'postgres',
	password: '1234',
	host: 'localhost',
	port:5432,
	database:'nodejs_postgre'
});
client.connect((err)=>{
	if(err) throw err;
	console.log('Connected Successfully...');
});
// ambil semua data tabel
app.get('/api/siswa',(req,res)=> {
	let sql = "SELECT id, nama_lengkap, to_char(tanggal_lahir,'yyyy-mm-dd') as tanggal_lahir, alamat FROM siswa";
	let query = client.query(sql,(err,results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"response":results.rows}));// ini untuk mengambil respon rows
	});
});

app.get('/api/siswa/:id',(req,res)=> {
	let sql="SELECT * FROM siswa WHERE id="+req.params.id;
	let query = client.query(sql,(err,results)=>{
		if (err) throw err;
		res.send(JSON.stringify({"response":results.rows}));
	});
});

app.post('/api/siswa',(req,res)=> {
	let sql = "insert into siswa (nama_lengkap,tanggal_lahir,alamat) Values ('"+req.body.nama_lengkap+"','"+req.body.tanggal_lahir+"','"+req.body.alamat+"');";
	let query = client.query(sql,(err,results)=>{
		if (err) throw err;
		res.send("Tambah Data Berhasil :"+sql);
	});
});

app.put('/api/siswa/:id',(req,res)=> {
	let sql="UPDATE siswa SET nama_lengkap='"+req.body.nama_lengkap+"', tanggal_lahir='"+req.body.tanggal_lahir+"' , alamat='"+req.body.alamat+"' WHERE id="+req.params.id;
	let query = client.query(sql,(err,results)=>{
		if (err) throw err;
		res.send("Update Data Berhasil : "+sql);
	});
});

app.delete('/api/siswa/:id',(req,res)=> {
	let sql="DELETE FROM siswa WHERE id="+req.params.id;
	let query = client.query(sql,(err,results)=>{
		if (err) throw err;
		res.send("Delete Berhasil : " +sql);
	});
});

app.listen(8000,() => {
	console.log('Server is running at port 8000');
});