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
        0.png
        1.png
        ...
      original
        0.png
        1.png
        ...
      stl
        0.stl
        1.stl
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


### Hint
The script `SieglerVonCatan/pipeline/scripts/validate.py` helps to check if the datasets folder is valid.
