import init, { filterUtils } from './airtable'

const traits = (() => {
  const table = init({ tableName: 'Traits' })
  const xTrait = (record) => ({
    type: record.Type,
    rarity: record.Rarity,
    name: record.Name,
    img: record.Image ? record.Image[0] : null,
    collection: record.Collection,
    url: record.Image ? record.Image[0].url : null,
    id: record.id
  })
  return {
    load: async () => {
      const results = await table.findAll(
        {
          // filters: [filterUtils.IS_TRUTHY('Complete')]
        },
        xTrait
      )

      return results
    },
    find: async ids => {
      const filters = ids.map(id => filterUtils.STR_EQUALS('id', id))
      const result = await table.findAll({
        filters,
        filterFn: 'OR'
      },
      xTrait
      )
      return result
    }

  }
})()

const destruct = (record, fields) => {
  if (!record) return record
  const values = {}
  fields.forEach((f) => {
    const field = record[f]
    if (field) {
      values[f] = field[0]
    }
  })

  return {
    ...record,
    ...values
  }
}

const team = (() => {
  const table = init({ tableName: 'Players' })
  const xUser = ($) => {
    const record = destruct($, [
      'Shirts',
      'Hats',
      'Faces',
      'Heads',
      'Shirt Image',
      'Hat Image',
      'Face Image',
      'Base Image'
    ])
    return ({
      id: record.userId,
      firstName: record.First,
      lastName: record.Last,
      title: record.Title,
      // shirtId: record.Shirts,
      // hatId: record.Hats,
      // faceId: record.Faces,
      // headId: record.Heads,
      hatIds: $.Hats,
      shirtIds: $.Shirts,
      faceIds: $.Faces,

      tenure: record['Time Milestones'] || [],
      shirt: record['Shirt Image'],
      hat: record['Hat Image'],
      base: record['Base Image'],
      face: record['Face Image'],
      start: record['Start Date'],
      isContractor: record.isContractor
    })
  }

  return {
    load: async () => {
      const results = await table.findAll(
        {
          // filters: [filterUtils.IS_TRUTHY('Current')]
        },
        xUser
      )

      return results
    },
    find: async ({ userId }) => {
      console.log(userId, filterUtils.STR_EQUALS('userId', userId))
      const result = await table.find({
        filters: [
          filterUtils.STR_EQUALS('userId', userId)
          // filterUtils.STR_EQUALS('userId', userId)
        ]
      },
      xUser
      )
      return result
    }
  }
})()

export default {
  traits,
  team
}
