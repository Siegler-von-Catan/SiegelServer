# Structure of Assets

```
assets/
  datasets.json
  dataset_thumbs/
    <dataset-id-1>.png
    <dataset-id-2>.png
    ...
  datasets/
    <dataset-id-1>/
      heightmap/
        1.png
        2.png
        ...
      original
        1.png
        2.png
        ...
      stl
        1.stl
        2.stl
        ...
      items.json
    <dataset-id-2>/
      ...
```

### datasets.json
```json
{
  "<dataset-id>": {
    "title": "...",
    "description": "...",
    "license": "..."
  },
  ...
}
```

### items.json
```json
[
  {
    "subjects": ["...", "...", ...],
    "name": "..."
  },
  ...
]
```

### References
- Images in `dataset_thumbs/` have the id (for example `siegel`) of their dataset as name
- Files in `heightmap/`, `original/` and `stl` have the index in `items.json` as their name
- Folders in `datasets/` have the id of their dataset as name