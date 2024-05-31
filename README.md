# ✅ TASKER

## 😇 Why?

**Convert markdown to tasks.**

A task will be created from every list item with a priority set in square
brackets, like below:

```
[1] Task priority 1
[0] Task priority 0
```

Use **Live Server** in VSCode to see the tasks.

The example is from this README.md

## 💪 How?

### DEV mode

1. run: npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
1. live server the **index.html**
1. Choose one of the following options:

   1. drop a \*.md file where you added priorities on list items or
   1. drop an exported \*.JSON file

## Dev status

### 🎉 Done

- ✅ Add to local storage
- ✅ Export from local storage
- ✅ Reset local storage
- ✅ Edit status
- ✅ Add notes
- ✅ Add tailwind
- ✅ better UI/UX
- ✅ Import JSON (drag and drop into the page to load a WIP Project)
- ✅ Fix light mode
- ✅ Parse tasks from sub list
  - ⚠️ only first and second level items are captured

## 🔥 To fix fast 🚨

- [0] Filter tasks
- [1] Collapsible Sections

## 📣 Coming soon:

- [2] Collapsible tasks
  - [2] collapse all
  - [2] expand all
- [4] Statistics
- [5] much better UI/UX

## 😢 Nice to have:

- [1] enable/disable priorities
- [2] Fix Modal in dark mode
- [2] add multi level items (for now are only 2 levels)
- [3] Make it work on server as an APP

## 👄 Thanks

- [AlpineJS](https://alpinejs.dev/),
- [Tailwindcss](https://tailwindcss.com/),
- [Markdown-it](https://markdown-it.github.io/) and
- [Simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)
