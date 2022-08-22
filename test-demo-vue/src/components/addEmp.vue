<template>
<div>
<ul class="form-style-1">
    <h1> STAFF INFO </h1>
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
        <button class="btn" @click="insertData()">Submit</button>
    </li>
    
</ul>
<br>
<br>
</div>
</template>
<script>
import axios from "axios";
import dateformat from "dateformat";
export default ({
name : 'addEmp',

data()
{ return{instance :null,
  allDetails:[],
  id:"",
  name:"",
  dob:"",
  doj:"",
  email:"",
  phone:"",
  department_id:"",
  searchText:"",
  deptArray:[],

  config : {
        headers : {
          AppKey : 'noBcfkQ27IzIHBatVV6HGXuF69gMiC4A'
        }
      }} 
},

async mounted () {

    this.instance =  axios.create({ baseURL: "http://127.0.0.1:3333" , headers:{
    'Content-type' : "application/json",
      'AppKey' : "noBcfkQ27IzIHBatVV6HGXuF69gMiC4A",
      }})

    const result = await this.instance.get('/selectallEmp', this.config)
    this.allDetails = result.data
    const deptdata = await this.instance.get('/selectallDept', this.config)
    this.deptArray = deptdata.data
    
  },

methods:{

    async insertData()
    {
        const dobdate = this.dob;
        const dojdate = this.doj;
        const formatdob = dateformat(dobdate , "yyyy-mm-dd")
        const formatdoj = dateformat(dojdate , "yyyy-mm-dd")
        const empDetails = { 
            name: this.name, 
            dob: formatdob,
            doj: formatdoj,
            email: this.email,
            phone: this.phone,
            department_id: this.department_id}

       
        if( this.name != "" && this.dob != "" && this.doj!= "" && this.email !="" && this.phone!= "" && this.department_id !="" )
        {   
            if(/^[6-9]\d{9}$/.test(this.phone))
          {
            if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email) ) 
             {
                
                await this.instance.post('/insertEmp', empDetails ,this.config)
                alert("Data Inserted Successfully")
                this.clearform()
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

    
clearform() {
      this.id = "";
      this.name = "";
      this.dob = "";
      this.doj="";
      this.email="";
      this.phone="";
      this.department_id="";
    },

  
  }


})

</script>

<style type="text/css">
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
.btn, .form-style-1 input[type=submit], .form-style-1 input[type=button]{
	background: #4B99AD;
	padding: 8px 15px 8px 15px;
	border: none;
	color: #fff;
}
.btn, .form-style-1 input[type=submit]:hover, .form-style-1 input[type=button]:hover{
	background: #4691A4;
	box-shadow:none;
	-moz-box-shadow:none;
	-webkit-box-shadow:none;
}
.form-style-1 .required{
	color:red;
}
.btn1 {
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
</style>