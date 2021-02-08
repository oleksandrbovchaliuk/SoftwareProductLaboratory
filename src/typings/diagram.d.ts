interface NodeBlock extends import('gojs').ObjectData {
  key: number
  text: string
  color: string
  loc: string
}

interface NodeLink extends import('gojs').ObjectData {
  key: number
  from: number
  to: number
}
