# Zoomer

## Usage:

0. Small and large versions of zoomable images should be placed in directories named `small` and `large`  respectively. 

1. Include module to HTML code: 
```html
<script src="/path/to/scripts/zoomer.js">
```

2. Define image sets:
```javascript
window.picSet = new Zoomer('.gallery');
```

where `gallery` is a class of `<div>` container for `<img>`'s. 
