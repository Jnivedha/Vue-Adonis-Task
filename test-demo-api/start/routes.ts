/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => 
{
   Route.post('/insertDept','DeptTablesController.insertDept')
   Route.get('/selectallDept','DeptTablesController.selectallDept')
   Route.patch('/updateRowDept','DeptTablesController.updateRowDept')
   Route.delete('/deleteRowDept','DeptTablesController.deleteRowDept')
}).middleware('auth')

Route.group(() => 
{
  Route.post('/insertEmp','EmpTablesController.insertEmp')
  Route.get('/selectallEmp','EmpTablesController.selectallEmp')
  Route.patch('/updateRowEmp','EmpTablesController.updateRowEmp')
  Route.delete('/deleteRowEmp','EmpTablesController.deleteRowEmp')
}).middleware('auth')
  


