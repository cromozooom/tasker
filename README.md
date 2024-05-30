# TASKER

## What for?

**Convert markdown to tasks.**

A task will be created from every list item with a priority set in square
brackets, like below:

```
[1] Task priority 1
[0] Task priority 0
```

Use Live Server in VSCode to see the tasks.

The example is from Bootstrap 5.3 Update

## How?

### View

1. npm i
1. Add example.md in root of the folder
1. node index.js
1. live server the html file

### Edit

1. live server the html file
1. run: npx tailwindcss -i ./src/input.css -o ./src/output.css --watch

## Coming soon:

- ✅ Add to local storage
- ✅ Export from local storage
- ✅ Edit status
- ✅ Add notes
- ✅ Add tailwind
- filter tasks
- Statistics
- better UI/UX

## Thanks

- [AlpineJS](https://alpinejs.dev/),
- [tailwindcss](https://tailwindcss.com/),
- [markdown-it](https://markdown-it.github.io/) and
- [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)
