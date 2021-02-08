import React, { useCallback, useEffect, useRef } from 'react'
import * as go from 'gojs'
import clsx from 'clsx'
import { ReactDiagram } from 'gojs-react'

import { DraggingTool } from './parts/DraggingTool'

import { mergeRefs } from '@services/ref'

import styles from './styles.module.scss'

interface Props {
  nodeDataArray: go.ObjectData[]
  linkDataArray: go.ObjectData[]
  modelData: go.ObjectData
  skipsDiagramUpdate: boolean
  onDiagramEvent: (e: go.DiagramEvent) => void
  onModelChange: (e: go.IncrementalData) => void

  className?: string
}

const Diagram = (
  {
    nodeDataArray,
    linkDataArray,
    modelData,
    skipsDiagramUpdate,
    onDiagramEvent,
    onModelChange,
    className,
  }: Props,
  ref: React.Ref<ReactDiagram>
) => {
  const diagramRef = useRef<ReactDiagram>(null)

  useEffect(() => {
    if (!diagramRef.current) return
    const diagram = diagramRef.current.getDiagram()
    if (diagram instanceof go.Diagram) {
      diagram.addDiagramListener('ChangedSelection', onDiagramEvent)
    }
    return () => {
      if (!diagramRef.current) return
      const diagram = diagramRef.current.getDiagram()
      if (diagram instanceof go.Diagram) {
        diagram.removeDiagramListener('ChangedSelection', onDiagramEvent)
      }
    }
  })

  const initDiagram = useCallback((): go.Diagram => {
    const $ = go.GraphObject.make
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      'clickCreatingTool.archetypeNodeData': {
        text: 'new node',
        color: 'lightblue',
      },
      draggingTool: new DraggingTool(), // defined in GuidedDraggingTool.ts
      'draggingTool.horizontalGuidelineColor': 'blue',
      'draggingTool.verticalGuidelineColor': 'blue',
      'draggingTool.centerGuidelineColor': 'green',
      'draggingTool.guidelineWidth': 1,
      layout: $(go.ForceDirectedLayout),
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        // positive keys for nodes
        makeUniqueKeyFunction: (m: go.Model, data: go.ObjectData) => {
          let k = data.key || 1
          while (m.findNodeDataForKey(k)) k++
          data.key = k
          return k
        },
        // negative keys for links
        makeUniqueLinkKeyFunction: (
          m: go.GraphLinksModel,
          data: go.ObjectData
        ) => {
          let k = data.key || -1
          while (m.findLinkDataForKey(k)) k--
          data.key = k
          return k
        },
      }),
    })

    // define a simple Node template
    diagram.nodeTemplate = $(
      go.Node,
      'Auto', // the Shape will go around the TextBlock
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        'RoundedRectangle',
        {
          name: 'SHAPE',
          fill: 'white',
          strokeWidth: 0,
          // set the port properties:
          portId: '',
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer',
        },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')
      ),
      $(
        go.TextBlock,
        { margin: 8, editable: true, font: '400 .875rem Roboto, sans-serif' }, // some room around the text
        new go.Binding('text').makeTwoWay()
      )
    )

    // relinking depends on modelData
    diagram.linkTemplate = $(
      go.Link,
      new go.Binding('relinkableFrom', 'canRelink').ofModel(),
      new go.Binding('relinkableTo', 'canRelink').ofModel(),
      $(go.Shape),
      $(go.Shape, { toArrow: 'Standard' })
    )

    return diagram
  }, [])

  return (
    <ReactDiagram
      divClassName={clsx(styles['diagram'], className)}
      initDiagram={initDiagram}
      nodeDataArray={nodeDataArray}
      linkDataArray={linkDataArray}
      onModelChange={onModelChange}
      skipsDiagramUpdate={skipsDiagramUpdate}
      modelData={modelData}
      ref={mergeRefs(diagramRef, ref)}
    />
  )
}

export default React.forwardRef(Diagram) as React.FC<React.PropsWithRef<Props>>
