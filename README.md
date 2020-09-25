# React DnD TreeView

A draggable / droppable React-based treeview component.  
You can use render props to create each node freely.

## Demo (on CodeSandbox)

- [Full Features](https://google.com/)
- [Minimum (Read only)](https://google.com/)
- [Drag & Drop](https://google.com/)
- [Custom node](https://google.com/)
- [Custom drag preview](https://google.com)

## Getting Started

### Installation

```
$ npm install --save @minoru-okuyama/react-dnd-treeview
```

### Usage

```
import { TemplateItem } from "./TemplateItem";
import { DragPreview } from "./DragPreview";
import { TreeItemModel } from "~/types";
import Sample from "./tree_sample.json";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
  },
  buttonContainer: {
    padding: theme.spacing(3),
  },
  addButton: {
    borderRadius: theme.spacing(2.5),
    boxShadow: "rgba(0,0,0,.12) 0 1px 4px 1px",
    padding: theme.spacing(1, 2),
  },
  tree: {
    boxSizing: "border-box",
    minHeight: "100%",
    paddingBlockEnd: 30,
  },
  container: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  dragOver: {
    background: "#fee",
  },
}));

export const Templates: React.FC = () => {
  const classes = useStyles();
  const [tree, setTree] = useState<NodeModel[]>(Sample as NodeModel[]);
  const [selectedId, setSelectedId] = useState<NodeModel["id"]>(0);
  const [openIds, { handleToggle }] = useOpenIdsHelper(tree);

  const handleChange = (tree: NodeModel[]) => setTree(tree);
  const handleClick = (data: NodeModel) => setSelectedId(data.id);

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Button className={classes.addButton}>
          <AddIcon />
          Add
        </Button>
      </div>
      <div>
        <Tree
          tree={tree}
          onChange={handleChange}
          rootId={0}
          openIds={openIds}
          classes={{
            root: classes.tree,
            container: classes.container,
            dragOver: classes.dragOver,
          }}
          render={(data: NodeModel<TreeItemModel>, depth, isOpen) => (
            <TemplateItem
              data={data}
              depth={depth}
              isOpen={isOpen}
              isSelected={data.id === selectedId}
              onToggle={handleToggle}
            />
          )}
          dragPreviewRender={(
            monitorProps: DragLayerMonitorProps<TreeItemModel>
          ) => <DragPreview monitorProps={monitorProps} />}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

```

## Data Structure

### Basic example

```
const treeData = [
  {
    "id": 1,
    "parent": 0,
    "nodeType": "node",
    "name": "analysis"
  },
  {
    "id": 2,
    "parent": 1,
    "nodeType": "node",
    "name": "users"
  },
  {
    "id": 100,
    "parent": 2,
    "nodeType": "node",
    "name": "hoge"
  },
  {
    "id": 101,
    "parent": 100,
    "nodeType": "leaf",
    "name": "TemplateDammytemplate",
    "data": {
      "templateType": "object"
    }
  },
  {
    "id": 3,
    "parent": 2,
    "nodeType": "leaf",
    "name": "Customers",
    "data": {
      "templateType": "array"
    }
  },
  {
    "id": 4,
    "parent": 2,
    "nodeType": "leaf",
    "name": "Prefectures",
    "data": {
      "templateType": "object"
    }
  },
  {
    "id": 5,
    "parent": 2,
    "nodeType": "leaf",
    "name": "TemplateDammytemplate",
    "data": {
      "templateType": "array"
    }
  },
  {
    "id": 6,
    "parent": 0,
    "nodeType": "node",
    "name": "resource"
  },
  {
    "id": 7,
    "parent": 0,
    "nodeType": "node",
    "name": "prediction"
  },
  {
    "id": 8,
    "parent": 0,
    "nodeType": "leaf",
    "name": "HogeTemplate",
    "data": {
      "templateType": "object"
    }
  }
];
```

### Optional data

```
const treeData = [
  {
    "id": 1,
    "parent": 0,
    "nodeType": "node",
    "name": "analysis"
  },
  {
    "id": 2,
    "parent": 1,
    "nodeType": "node",
    "name": "users"
  },
  {
    "id": 100,
    "parent": 2,
    "nodeType": "node",
    "name": "hoge"
  },
  {
    "id": 101,
    "parent": 100,
    "nodeType": "leaf",
    "name": "TemplateDammytemplate",
    "data": {
      "templateType": "object"
    }
  },
  {
    "id": 3,
    "parent": 2,
    "nodeType": "leaf",
    "name": "Customers",
    "data": {
      "templateType": "array"
    }
  },
  {
    "id": 4,
    "parent": 2,
    "nodeType": "leaf",
    "name": "Prefectures",
    "data": {
      "templateType": "object"
    }
  },
  {
    "id": 5,
    "parent": 2,
    "nodeType": "leaf",
    "name": "TemplateDammytemplate",
    "data": {
      "templateType": "array"
    }
  },
  {
    "id": 6,
    "parent": 0,
    "nodeType": "node",
    "name": "resource"
  },
  {
    "id": 7,
    "parent": 0,
    "nodeType": "node",
    "name": "prediction"
  },
  {
    "id": 8,
    "parent": 0,
    "nodeType": "leaf",
    "name": "HogeTemplate",
    "data": {
      "templateType": "object"
    }
  }
];
```

### Node Properties

#### id `Required`

`number | string`  

Identifier of each node

#### parent `Required`

`number | string`

Parent identifier of each node

#### nodeType `Required`

`string`



#### name `Required`

`string`

#### data `Optional`

`any`

### Component Props



### Render Props


### State Management


## License
MIT.
