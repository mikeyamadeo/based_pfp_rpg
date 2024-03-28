
// const base = require('airtable').base('appvpByy0nxsAUufY');
const Airtable = require('airtable')
const API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY

Airtable.configure({
  apiKey: API_KEY
})

const PFP_BASE_KEY = 'appFDNR16okaUqzUx'
const Base = Airtable.base(PFP_BASE_KEY)

const noop = _ => _
const tables = ['Traits', 'Players'].reduce(
  (bases, name) => ({
    ...bases,
    [name]: Base.table(name)
  }),
  {}
)

const toFilter = {
  strCompare: (key, op, str) => '{' + key + '} ' + op + ' "' + str + '"',
  numCompare: (key, op, num) => '{' + key + '} ' + op + ' ' + num,
  boolCompare: (key, op, isTrue) =>
    '{' + key + '} ' + op + ' ' + (isTrue ? 'TRUE()' : 'FALSE()')
}

export const filterUtils = {
  FIELD: (key) => `{${key}}`,
  STR_EQUALS: (key, val) => toFilter.strCompare(key, '=', val),
  NUM_EQUALS: (key, val) => toFilter.numCompare(key, '=', val),
  IS_TRUTHY: (key) => toFilter.boolCompare(key, '=', true),
  IS_FALSEY: (key) => toFilter.boolCompare(key, '=', false),
  IS_BEFORE: (val, deadline) => `IS_BEFORE(${val}, ${deadline})`,
  IS_AFTER: (val, start) => `IS_AFTER(${val}, ${start})`,
  TODAY: () => 'TODAY()',
  NOW: () => 'NOW()',
  OR: (...conditions) => `OR(${conditions.join(', ')})`,
  AND: (...conditions) => `AND(${conditions.join(', ')})`,
  ADD_DAYS: (datetime, days) => `DATEADD(${datetime}, ${days}, 'days')`,
  ADD_HOURS: (datetime, hrs) => `DATEADD(${datetime}, ${hrs}, 'hours')`
}

const filterFns = {
  AND: 'AND',
  OR: 'OR'
}
const createFilter = (filters, fn = filterFns.AND) => filterUtils[fn](filters)

const x = _ => _.fields
const init = ({ tableName }) => {
  const table = tables[tableName]

  const find = async ({ filters, sort }, transform) => {
    const record = (await findAll({ filters, sort }, transform))[0]
    return record
  }

  const findAll = async (
    { filters = [], filterFn = filterFns.AND, sort = [] } = {},
    transform = _ => _
  ) => {
    let records = []
    const processPage = (partialRecords, fetchNexPage) => {
      records = [...records, ...partialRecords]
      fetchNexPage()
    }
    return new Promise((resolve, reject) =>
      table
        .select({ filterByFormula: createFilter(filters, filterFn), sort })
        .eachPage(processPage, (err) => {
          if (err) {
            // log.tag({ table: table.name }).tag({ fn: 'findAll' }).alert(err)
            console.log(err)
            reject(err)
          }
          const normalized = records.map(x)
          resolve(transform ? normalized.map(transform) : normalized)
        })
    )
  }

  const add = async ({ record }, transform = noop) => {
    return table
      .create(record)
      .then((record) => transform(x(record)))
      .catch((err) => {
        // log.tag({ table: table.name }).tag({ fn: 'add' }).alert(err)
        throw new Error(err)
      })
  }

  return {
    add,
    find,
    findAll
  }
}

export default init
