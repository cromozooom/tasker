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
  const sections = [];
  let currentSection = null;
  let listItemContent = "";
  let insideListItem = false;

  tokens.forEach((token) => {
    if (token.type === "heading_open" && /^h[1-6]$/.test(token.tag)) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: "",
        content: "",
        tasks: [],
      };
    } else if (
      token.type === "heading_close" &&
      currentSection &&
      currentSection.title === ""
    ) {
      currentSection.title = tokens[tokens.indexOf(token) - 1].content;
    } else if (
      token.type === "paragraph_open" &&
      currentSection &&
      currentSection.tasks.length === 0
    ) {
      let contentTokens = [];
      let index = tokens.indexOf(token) + 1;
      while (tokens[index] && tokens[index].type !== "paragraph_close") {
        contentTokens.push(tokens[index]);
        index++;
      }
      currentSection.content = contentTokens.map((t) => t.content).join(" ");
    } else if (token.type === "list_item_open") {
      insideListItem = true;
      listItemContent = "";
    } else if (token.type === "list_item_close") {
      insideListItem = false;
      const { content, priority } = parsePriority(listItemContent);
      currentSection.tasks.push({
        content: content,
        priority: priority,
        status: "",
        notes: "empty",
      });
    } else if (insideListItem && token.type === "inline") {
      listItemContent += token.content;
    }
  });

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

const markdownContent = fs.readFileSync("example.md", "utf8");
const tasks = convertMarkdownToTasks(markdownContent);
console.log(JSON.stringify(tasks, null, 2));
fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
