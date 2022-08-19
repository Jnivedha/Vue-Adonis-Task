import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StaffValidator {
  constructor(protected ctx: HttpContextContract) {}
public schema = schema.create({

      name : schema.string(),
      dob: schema.date(),
      doj: schema.date(),
      email:schema.string(),
      phone : schema.string([ rules.mobile({ locale : ['en-IN']}) ]),
      department_id : schema.number([ rules.exists({table : 'depts', column : 'id'}) ])

  })

  public messages: CustomMessages = {}
}
