import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Dept from './Dept'

export default class Emp extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public dob: Date

  @column()
  public doj: Date

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  @hasOne(() => Dept)
  public department_id : HasOne <typeof  Dept> 
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
