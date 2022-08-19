import employees from "App/Models/Emp"
import EmpValidator from 'App/Validators/EmpValidator'

export default class EmpTablesController {
    
    // Insert to the database
    public async insertEmp ({request})
    {
        await request.validate(EmpValidator)
        try {
            const newRow = new employees()
            //newRow.id = request.input('id')
            newRow.name = request.input('name')
            newRow.dob = request.input('dob')
            newRow.doj = request.input('doj')
            newRow.email = request.input('email')
            newRow.phone = request.input('phone')
            newRow.department_id = request.input('department_id')
            await newRow.save()   
            return ' Successfully Inserted !'
        }
        catch {
            return("Incorrect Values")
        }
        
        
    }
    
    // Select All
    public async selectallEmp() { 
        try
        {   const all = await employees.all()
            return all.reverse()
        }
        catch 
        {return("No Data To Display")}
    }
  
    // Update 
    public async updateRowEmp ({request}) 
    { 
        try
        {
            const update = await employees.findOrFail(request.input('id'))
            update.name =  request.input('name')
            update.dob = request.input('dob')
            update.doj = request.input('doj')
            update.email = request.input('email')
            update.phone = request.input('phone')
            update.department_id = request.input('department_id')
            await update.save()
            return update
        }
        catch
        {
            return("Error during Update")
        }
            
    }
    
    // Delete
    public async deleteRowEmp ({request}) 
    {
        try
        {
            const deletedRow = await employees.findOrFail(request.input('id'))
            await deletedRow.delete()
            return deletedRow
        }
        catch
        {
            return("Data not avaliable")
        }
    }

}