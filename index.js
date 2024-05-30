const fs = require("fs");
const path = require("path");
const markdown = require("markdown-it")();

function parseMarkdownToTasks(markdownFilePath) {
  const fileContent = fs.readFileSync(markdownFilePath, "utf-8");
  const tokens = markdown.parse(fileContent, {});

  const tasks = [];
  let currentSection = null;

  tokens.forEach((token, index) => {
    if (token.type === "heading_open" && token.tag.match(/^h[1-6]$/)) {
      currentSection = {
        title: "",
        content: "",
        tasks: [],
      };
      tasks.push(currentSection);
    }

    if (currentSection) {
      if (token.type === "heading_close") {
        currentSection.title = tokens[index - 1].content;
      } else if (token.type === "inline" && token.map) {
        currentSection.content += token.content + "\n";
      } else if (token.type === "list_item_open") {
        const listItemTokens = tokens.slice(
          index + 1,
          tokens.findIndex((t, i) => i > index && t.type === "list_item_close")
        );
        const listItemContent = listItemTokens
          .map((t) => t.content)
          .join("")
          .trim();

        const match = listItemContent.match(/^\[(\d+|!)\]\s*(.*)$/);
        if (match) {
          const priority = match[1] === "!" ? 1 : parseInt(match[1], 10);
          const content = match[2];
          currentSection.tasks.push({
            content: content, // Store the content without the [...] part
            priority: priority,
            status: "",
            notes: "",
          });
        }
      }
    }
  });

  return tasks.filter((section) => section.tasks.length > 0);
}

const tasks = parseMarkdownToTasks(path.join(__dirname, "example.md"));

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
);
console.log("tasks.json has been generated.");
