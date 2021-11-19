import { v4 as uuid } from 'uuid'

const createSampleBoard = () => ({
  id: uuid(),
  name: 'Sample Board',
  desc: 'Sample board to get you started',
  lists: [
    {
      id: uuid(),
      name: 'To Dos',
      items: [
        { id: uuid(), content: 'Fifth task' },
        {
          id: uuid(),
          content: 'Sixth task',
        },
        {
          id: uuid(),
          content: 'Seventh task',
        },
      ],
    },
    {
      id: uuid(),
      name: 'In Progress',
      items: [
        {
          id: uuid(),
          content: 'Third task',
        },
        {
          id: uuid(),
          content: 'Fourth task',
        },
      ],
    },
    {
      id: uuid(),
      name: 'Completed',
      items: [
        {
          id: uuid(),
          content: 'First task',
        },
        {
          id: uuid(),
          content: 'Second task',
        },
      ],
    },
  ],
})

const createNewBoard = (name, desc) => ({
  id: uuid(),
  name,
  desc,
  lists: [
    {
      id: uuid(),
      name: 'To Dos',
      items: [],
    },
    {
      id: uuid(),
      name: 'In Progress',
      items: [],
    },
    {
      id: uuid(),
      name: 'Completed',
      items: [],
    },
  ],
})

export { createSampleBoard, createNewBoard }
