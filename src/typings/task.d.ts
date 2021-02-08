type TaskSolution = NodeLink[]

interface Task {
  id: ID
  title: string
  description: string
  blocks: NodeBlock[]
  etalon: TaskSolution
}

type TaskCreate = Omit<Task, 'id'>

interface TaskResult {
  id: ID
  userId: ID
  taskId: ID
  mark: number
  solution: TaskSolution
}

type TaskResultCreate = Omit<TaskResult, 'id'>
