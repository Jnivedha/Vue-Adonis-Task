<template>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<div v-if="ishidden==true" v-on:click="ishidden==false" class="container-xl">
    <div class="table-responsive">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8"><h2><b>EMPLOYEE DETAILS</b></h2></div>
                    <div class="col-sm-4">
                        <div class="search-box">
                            <select class="dropdownStyle" name="item" id="item" v-model="value" @change ="filterval()">
                            <option value="" disabled hidden>Select Value</option>
                            <option :value="null" > ALL </option>
                            <option :value="0"> DESC : EMPLOYEE ID </option>
                            <option v-for="item in deptArray" v-bind:value="item.id"  v-bind:key="item.name"> {{item.id}} :  {{ item.name }} </option>
                            
                            </select>
                        </div>
                        <br>
                        <button class="btn btn-info add-new"><i class="fa fa-plus"></i> <router-link to="/addEmp">  Add New !! </router-link></button>
                    </div>
                </div>
            </div>
            <table id="myTable" class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Date Of Birth</th>
                      <th>Date of Joining</th>
                      <th>Email Id</th>
                      <th>Phone Number</th>
                      <th>Department Id</th>
                      <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,i) in allDetails" :key = "i">
                        <td>{{user.id}}</td>
                        <td>{{user.name}}</td>
                        <td>{{format(user.dob)}}</td>
                        <td>{{format(user.doj)}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.phone}}</td>
                        <td>{{user.department_id}}</td>
                        <td>
                            <a href="#" class="edit" title="Edit" data-toggle="tooltip" @click ="editButton(user)"><i class="material-icons">&#xE254;</i></a>
                            <a href="#" class="delete" title="Delete" data-toggle="tooltip" @click ="deleteData(user.id)"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>        
                </tbody>
            </table>
        </div>
    </div>  
</div> 
<div v-else v-on:click="ishidden == !ishidden">
<ul class="form-style-1">
    <h1> EMPLOYEE UPDATE </h1>
    <li>
        <label>EMPLOYEE ID<span class="required">*</span></label>
        <input type="number" name="field3" class="field-long" v-model="id"/>
    </li>
    <li>
        <label>EMPLOYEE NAME<span class="required">*</span></label>
        <input type="text" name="field3" class="field-long" v-model="name"/>
    </li>
    <li>
        <label>DATE OF BIRTH<span class="required">*</span></label>
        <input type="date" name="field3" class="field-long" v-model="dob"/>
    </li>
    <li>
        <label>DATE OF JOINING<span class="required">*</span></label>
        <input type="date" name="field3" class="field-long" v-model="doj"/>
    </li>
    <li>
        <label>EMAIL ID<span class="required">*</span></label>
        <input type="email" name="field3" class="field-long" v-model="email"/>
    </li>
    <li>
        <label>PHONE NUMBER<span class="required">*</span></label>
        <input type="text" name="field3" class="field-long" v-model="phone"/>
    </li>
    <li>
        <label>DEPARTMENT NAME</label>
        <select name="field4" class="field-select" v-model="department_id">
        <option value="" disabled hidden>Select Department</option>
        <option v-for="dept in deptArray" v-bind:key="dept.name" v-bind:value="dept.id"> {{ dept.name }}</option>
        </select>
    </li>
    <li>
        <input type=button class="btn2" value="Update" @click="updateData()">
    </li>
    
</ul>
<br>
<br>
</div>

</html> 
</template>
<script>
import axios from "axios";
import moment from "moment";
export default ({
name : 'empData',

data()
{ return{instance :null,
  allDetails: [],
  quotes:[],
  data:[],
  id:"",
  name:"",
  dob:"",
  doj:"",
  email:"",
  phone:"",
  department_id:"",
  searchText:"",
  deptArray:[],
  ishidden:true,
  config : {
        headers : {
          AppKey : 'noBcfkQ27IzIHBatVV6HGXuF69gMiC4A'
        }
      }} 
},

mounted: async function () {

    this.instance =  axios.create({ baseURL: "http://127.0.0.1:3333" , headers:{
    'Content-type' : "application/json",
      'AppKey' : "noBcfkQ27IzIHBatVV6HGXuF69gMiC4A",
      }})

    const all = await this.instance.get('/selectallEmp', this.config)
    this.allDetails = all.data

    const deptdata = await this.instance.get('/selectallDept', this.config)
    this.deptArray = deptdata.data
    console.log(this.deptArray)
    
    },

methods : {

    format(date)
    {
         if (date)
          {
              return moment(String(date)).format('MMMM DD, YYYY')
          }
    },

    async select()
    {
        const all = await this.instance.get('/selectallEmp', this.config)
        this.allDetails = all.data
    },

    async deleteData(staffid)
    {
      if(confirm("Are you sure on Deletion ?")== true)
      {
        await this.instance.delete('/deleteRowEmp', { data: { id: staffid } }, this.config)
        alert("Deleted Successfully")
        this.select()
      }   
    
    },
    
    editButton(user)
    {
        this.id = user.id
        this.name = user.name
        const fdob = moment.utc(user.dob).format('YYYY-MM-DD')
        this.dob = fdob
        const fdoj = moment.utc(user.doj).format('YYYY-MM-DD')
        this.doj = fdoj
        this.email = user.email
        this.phone = user.phone
        this.department_id = user.department_id
        this.ishidden = false
    },  

    async updateData()
  {     
        const data = { 
            id: this.id,
            name: this.name, 
            dob: this.dob,
            doj: this.doj,
            email: this.email,
            phone: this.phone,
            department_id: this.department_id}

        if( this.id!="" && this.name != "" && this.dob != "" && this.doj!= "" && this.email !="" && this.phone!= "" && this.department_id !="" )
        {   
            if(/^[6-9]\d{9}$/.test(this.phone))
          {
            if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email) )
             {
                
                await this.instance.patch('/updateRowEmp', data, this.config)
                alert("Updated Successfully")
                
                this.select()
                this.clearform()
                this.ishidden = true
             }
             else
             {
                alert("Invalid Email Address")
             }
         }
         else
         {
           alert("Invalid Phone Number");
         }
             
        }
        else
        {
            alert("Please Enter all the Details")
        }
      
  },

  async filterval(){
    const tableDetails = await this.instance.get("/selectallEmp",this.config)
    
    if(this.value == null)
    {
        this.allDetails =  tableDetails.data
    }
    else if(this.value == 0)
    {
        this.allDetails = tableDetails.data.reverse()
    }
    else
    {
        this.allDetails = tableDetails.data.filter(el =>
        {
             return  el.department_id == this.value;
        })
    }

},

  clearform() {
        this.id = ""
        this.name = ""
        this.dob = ""
        this.doj = ""
        this.email = ""
        this.phone = ""
        this.department_id = ""
      
    },

}
})

</script>

<style>
body {
    color: #566787;
    background: #f5f5f5;
    font-family: 'Roboto', sans-serif;
}
.table-responsive {
    margin: 30px 0;
}
.table-wrapper {
    min-width: 1000px;
    background: #fff;
    padding: 50px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {
    padding-bottom: 10px;
    margin: 0 0 10px;
    min-width: 100%;
}
.table-title h2 {
    margin: 8px 0 0;
    font-size: 50px;
}
.search-box {
    position: relative;        
    float: right;
}
.search-box input {
    height: 34px;
    border-radius: 20px;
    padding-left: 35px;
    border-color: #ddd;
    box-shadow: none;
}
.search-box input:focus {
    border-color: #3FBAE4;
}
.search-box i {
    color: #a0a5b1;
    position: absolute;
    font-size: 19px;
    top: 8px;
    left: 10px;
}
table.table tr th, table.table tr td {
    border-color: #e9e9e9;
}
table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
}
table.table th i {
    font-size: 20px;
    margin: 0 5px;
    cursor: pointer;
}
table.table td:last-child {
    width: 130px;
}
table.table td a {
    color: #a0a5b1;
    display: inline-block;
    margin: 0 5px;
}
table.table td a.view {
    color: #03A9F4;
}
table.table td a.edit {
    color: #FFC107;
}
table.table td a.delete {
    color: #E34724;
}
table.table td i {
    font-size: 19px;
}    
.pagination {
    float: right;
    margin: 0 0 5px;
}
.pagination li a {
    border: none;
    font-size: 95%;
    width: 30px;
    height: 30px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 30px !important;
    text-align: center;
    padding: 0;
}
.pagination li a:hover {
    color: #666;
}	
.pagination li.active a {
    background: #03A9F4;
}
.pagination li.active a:hover {        
    background: #0397d6;
}
.pagination li.disabled i {
    color: #ccc;
}
.pagination li i {
    font-size: 16px;
    padding-top: 6px
}
.hint-text {
    float: left;
    margin-top: 6px;
    font-size: 95%;
} 
.add-new {
    margin-top: 10%;
    margin-right: -48%;
    float: right;
    height: 30px;
    font-weight: bold;
    font-size: 15px;
    text-shadow: none;
    min-width: 100px;
    border-radius: 50px;
    line-height: 13px;
}
.form-style-1 {
	margin:10px auto;
	max-width: 400px;
	padding: 20px 12px 10px 20px;
	font: 13px "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}
.form-style-1 li {
	padding: 0;
	display: block;
	list-style: none;
	margin: 10px 0 0 0;
}
.form-style-1 label{
	margin:0 0 3px 0;
	padding:0px;
	display:block;
	font-weight: bold;
}
.form-style-1 input[type=text], 
.form-style-1 input[type=date],
.form-style-1 input[type=datetime],
.form-style-1 input[type=number],
.form-style-1 input[type=search],
.form-style-1 input[type=time],
.form-style-1 input[type=url],
.form-style-1 input[type=email],
textarea, 
select{
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	border:1px solid #BEBEBE;
	padding: 7px;
	margin:0px;
	outline: none;	
}
.form-style-1 input[type=text]:focus, 
.form-style-1 input[type=date]:focus,
.form-style-1 input[type=datetime]:focus,
.form-style-1 input[type=number]:focus,
.form-style-1 input[type=search]:focus,
.form-style-1 input[type=time]:focus,
.form-style-1 input[type=url]:focus,
.form-style-1 input[type=email]:focus,
.form-style-1 textarea:focus, 
.form-style-1 select:focus{
	-moz-box-shadow: 0 0 8px #88D5E9;
	-webkit-box-shadow: 0 0 8px #88D5E9;
	box-shadow: 0 0 8px #88D5E9;
	border: 1px solid #88D5E9;
}
.form-style-1 .field-divided{
	width: 49%;
}

.form-style-1 .field-long{
	width: 100%;
}
.form-style-1 .field-select{
	width: 100%;
}
.form-style-1 .field-textarea{
	height: 100px;
}
.btnn, .form-style-1 input[type=submit], .form-style-1 input[type=button]{
	background: #4B99AD;
	padding: 8px 15px 8px 15px;
	border: none;
	color: #4B99AD;
}
.btnn, .form-style-1 input[type=submit]:hover, .form-style-1 input[type=button]:hover{
	background: #4691A4;
	box-shadow:none;
	-moz-box-shadow:none;
	-webkit-box-shadow:none;
}
.form-style-1 .required{
	color:red;
}
.btnn {
    margin-top: 1%;
    margin-right: 6%;
    margin-bottom: 5%;
    float: right;
    height: 30px;
    font-weight: bold;
    font-size: 12px;
    text-shadow: none;
    min-width: 100px;
    border-radius: 50px;
    line-height: 13px;
} 

.btn2 {
    margin-top: 2%;
    margin-right: 73%;
    float: right;
    height: 30px;
    font-weight: bold;
    font-size: 12px;
    text-shadow: none;
    min-width: 100px;
    border-radius: 50px;
    line-height: 13px;
}
</style>