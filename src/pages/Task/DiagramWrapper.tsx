import React from 'react'
import * as go from 'gojs'
import { produce } from 'immer'

import Diagram from '@components/Diagram'

import styles from './styles.module.scss'

interface Props {
  nodeDataArray: NodeBlock[]
  links?: React.Ref<NodeLink[]>
}

interface State {
  nodeDataArray: go.ObjectData[]
  linkDataArray: go.ObjectData[]
  modelData: go.ObjectData
  selectedData: go.ObjectData | null
  skipsDiagramUpdate: boolean
}

class DiagramWrapper extends React.Component<Props, State> {
  private mapNodeKeyIdx: Map<go.Key, number>
  private mapLinkKeyIdx: Map<go.Key, number>

  constructor(props: Props) {
    super(props)
    this.state = {
      nodeDataArray: props.nodeDataArray,
      linkDataArray: [],
      modelData: {
        canRelink: true,
      },
      selectedData: null,
      skipsDiagramUpdate: false,
    }

    this.mapNodeKeyIdx = new Map<go.Key, number>()
    this.mapLinkKeyIdx = new Map<go.Key, number>()
    this.refreshNodeIndex(this.state.nodeDataArray)
    this.refreshLinkIndex(this.state.linkDataArray)
  }

  updateLinks = () => {
    const {
      props: { links },
      state: { linkDataArray },
    } = this
    if (typeof links === 'function') {
      links(linkDataArray as NodeLink[])
    } else if (links !== null && !!links) {
      ;(links as React.MutableRefObject<
        go.ObjectData[]
      >).current = linkDataArray
    }
  }

  componentDidMount() {
    this.updateLinks()
  }

  componentDidUpdate() {
    this.updateLinks()
  }

  private refreshNodeIndex = (nodeArr: Array<go.ObjectData>) => {
    this.mapNodeKeyIdx.clear()
    nodeArr.forEach((n: go.ObjectData, idx: number) => {
      this.mapNodeKeyIdx.set(n.key, idx)
    })
  }

  private refreshLinkIndex = (linkArr: Array<go.ObjectData>) => {
    this.mapLinkKeyIdx.clear()
    linkArr.forEach((l: go.ObjectData, idx: number) => {
      this.mapLinkKeyIdx.set(l.key, idx)
    })
  }

  public handleDiagramEvent = (e: go.DiagramEvent) => {
    const name = e.name
    switch (name) {
      case 'ChangedSelection': {
        const sel = e.subject.first()
        this.setState(
          produce((draft: State) => {
            if (sel) {
              if (sel instanceof go.Node) {
                const idx = this.mapNodeKeyIdx.get(sel.key)
                if (idx !== undefined && idx >= 0) {
                  const nd = draft.nodeDataArray[idx]
                  draft.selectedData = nd
                }
              } else if (sel instanceof go.Link) {
                const idx = this.mapLinkKeyIdx.get(sel.key)
                if (idx !== undefined && idx >= 0) {
                  const ld = draft.linkDataArray[idx]
                  draft.selectedData = ld
                }
              }
            } else {
              draft.selectedData = null
            }
          })
        )
        break
      }
      default:
        break
    }
  }

  public handleModelChange = (obj: go.IncrementalData) => {
    const insertedNodeKeys = obj.insertedNodeKeys
    const modifiedNodeData = obj.modifiedNodeData
    const removedNodeKeys = obj.removedNodeKeys
    const insertedLinkKeys = obj.insertedLinkKeys
    const modifiedLinkData = obj.modifiedLinkData
    const removedLinkKeys = obj.removedLinkKeys
    const modifiedModelData = obj.modelData

    const modifiedNodeMap = new Map<go.Key, go.ObjectData>()
    const modifiedLinkMap = new Map<go.Key, go.ObjectData>()

    this.setState(
      produce((draft: State) => {
        let narr = draft.nodeDataArray
        if (modifiedNodeData) {
          modifiedNodeData.forEach((nd: go.ObjectData) => {
            modifiedNodeMap.set(nd.key, nd)
            const idx = this.mapNodeKeyIdx.get(nd.key)
            if (idx !== undefined && idx >= 0) {
              narr[idx] = nd
              if (draft.selectedData && draft.selectedData.key === nd.key) {
                draft.selectedData = nd
              }
            }
          })
        }
        if (insertedNodeKeys) {
          insertedNodeKeys.forEach((key: go.Key) => {
            const nd = modifiedNodeMap.get(key)
            const idx = this.mapNodeKeyIdx.get(key)
            if (nd && idx === undefined) {
              this.mapNodeKeyIdx.set(nd.key, narr.length)
              narr.push(nd)
            }
          })
        }
        if (removedNodeKeys) {
          narr = narr.filter((nd: go.ObjectData) => {
            if (removedNodeKeys.includes(nd.key)) {
              return false
            }
            return true
          })
          draft.nodeDataArray = narr
          this.refreshNodeIndex(narr)
        }

        let larr = draft.linkDataArray
        if (modifiedLinkData) {
          modifiedLinkData.forEach((ld: go.ObjectData) => {
            modifiedLinkMap.set(ld.key, ld)
            const idx = this.mapLinkKeyIdx.get(ld.key)
            if (idx !== undefined && idx >= 0) {
              larr[idx] = ld
              if (draft.selectedData && draft.selectedData.key === ld.key) {
                draft.selectedData = ld
              }
            }
          })
        }
        if (insertedLinkKeys) {
          insertedLinkKeys.forEach((key: go.Key) => {
            const ld = modifiedLinkMap.get(key)
            const idx = this.mapLinkKeyIdx.get(key)
            if (ld && idx === undefined) {
              this.mapLinkKeyIdx.set(ld.key, larr.length)
              larr.push(ld)
            }
          })
        }
        if (removedLinkKeys) {
          larr = larr.filter((ld: go.ObjectData) => {
            if (removedLinkKeys.includes(ld.key)) {
              return false
            }
            return true
          })
          draft.linkDataArray = larr
          this.refreshLinkIndex(larr)
        }
        if (modifiedModelData) {
          draft.modelData = modifiedModelData
        }
        draft.skipsDiagramUpdate = true
      })
    )
  }

  public render() {
    return (
      <Diagram
        nodeDataArray={this.state.nodeDataArray}
        linkDataArray={this.state.linkDataArray}
        modelData={this.state.modelData}
        skipsDiagramUpdate={this.state.skipsDiagramUpdate}
        onDiagramEvent={this.handleDiagramEvent}
        onModelChange={this.handleModelChange}
        className={styles['diagram']}
      />
    )
  }
}

export default DiagramWrapper
