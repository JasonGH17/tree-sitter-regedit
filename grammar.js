module.exports = grammar({
  name: "regedit",

  word: ($) => $.value_type,

  conflicts: () => [],

  extras: ($) => [$.comment, /[ \t\r\n]+/],

  rules: {
    source_file: ($) => seq($.header, repeat(choice($.section, $.entry))),

    comment: (_) => /;[^\n]*/,

    header: (_) => /(?:REGEDIT4|Windows Registry Editor Version .*)/,

    section: ($) => seq("[", field("path", $.section_path), "]"),

    section_path: (_) => /[^\]\n]+/,

    entry: ($) =>
      seq(field("name", $.value_name), "=", field("value", $.value_data)),

    value_name: ($) => choice($.string, "@"),

    value_data: ($) =>
      choice($.string, seq($.value_type, ":", $.value_body), $.number),

    value_type: (_) => /(dword|qword|hex(?:\([0-9a-fA-F]+\))?)/,

    value_body: ($) => choice($.hex_list, $.string, $.number),

    hex_list: ($) => seq($.hex_byte, repeat(seq(",", $.hex_byte))),
    hex_byte: (_) => /[0-9A-Fa-f]{1,2}/,

    string: ($) => seq('"', repeat(choice($.escaped_char, /[^"\\]+/)), '"'),

    escaped_char: (_) => /\\./,

    // support dec and hex
    number: (_) => /0[xX][0-9a-fA-F]+|[0-9]+/,
  },
});
