const { textarea, text } = require("saltcorn-markup/tags");
const md = require("markdown-it")();

const markdown = {
  name: "Markdown",
  sql_name: "text",
  fieldviews: {
    showAll: { isEdit: false, run: v => md.render(v) },
    peek: {
      isEdit: false,
      run: v => text(v.length > 10 ? v.substring(0, 10) : v)
    },
    edit: {
      isEdit: true,
      run: (nm, v, attrs, cls) =>
        textarea(
          {
            class: ["form-control", cls],
            name: text(nm),
            id: `input${text(nm)}`,
            rows: 10
          },
          text(v) || ""
        )
    }
  },
  read: v => {
    switch (typeof v) {
      case "string":
        return v;
      default:
        return undefined;
    }
  }
};

module.exports = { types: [markdown] };
