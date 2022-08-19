import departments from "App/Models/Dept"
import DeptValidator from "App/Validators/DeptValidator"

export default class DeptTablessController {

    // Insert to the database
    public async insertDept ({request})
    {  
       await request.validate(DeptValidator)
      try {
            const newRow = new departments()
            //newRow.id = request.input('id')
            newRow.name = request.input('name')
            await newRow.save()
            return 'Successfully Inserted !'
        }
        catch {
            return("Incorrect Values. Department Id exists already")
        }
        
    }
 
    // Select all
    public async selectallDept (){
        try { return (await departments.all()).reverse() }
        catch { return ("No data to View")}}
    
    // Update
    public async updateRowDept ({request}) 
    { 
        try
        {
            const update = await departments.findOrFail(request.input('id'))
            //update.id = request.input('id')
            update.name =  request.input('name')
            await update.save()
            return update
        }
        catch
        {
            return("Error during Update")
        }
    }
    
    // Delete
    public async deleteRowDept ({request}) 
    {
        try
        {
            const deletedRow = await departments.findOrFail(request.input('id'))
            await deletedRow.delete()
            return deletedRow
        }
        catch
        {
            return("Data not avaliable")
        }
    }
}    