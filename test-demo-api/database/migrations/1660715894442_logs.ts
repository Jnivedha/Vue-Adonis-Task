import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('action')
      table.timestamp('performed_at')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
     
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
