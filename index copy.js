const fs = require("fs");
const MarkdownIt = require("markdown-it");

function parsePriority(content) {
  const priorityMatch = content.match(/^\[(\d+|!)\]/);
  let priority = 5; // default priority
  if (priorityMatch) {
    priority = priorityMatch[1] === "!" ? 1 : parseInt(priorityMatch[1], 10);
    content = content.slice(priorityMatch[0].length).trim();
  }
  return { content, priority };
}

function convertMarkdownToTasks(markdownText) {
  const md = new MarkdownIt();
  const tokens = md.parse(markdownText, {});
  const tasks = [];

  tokens.forEach((token, i) => {
    if (
      token.type === "inline" &&
      tokens[i - 1] &&
      tokens[i - 1].type === "list_item_open"
    ) {
      let { content, priority } = parsePriority(token.content);
      tasks.push({
        content: content,
        priority: priority,
        status: "",
        notes: "empty",
      });
    }
  });

  return tasks;
}

const markdownContent = fs.readFileSync("example.md", "utf8");
const tasks = convertMarkdownToTasks(markdownContent);
console.log(JSON.stringify(tasks, null, 2));
fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
