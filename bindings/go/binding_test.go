package tree_sitter_regedit_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_regedit "github.com/jasongh17/tree-sitter-regedit/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_regedit.Language())
	if language == nil {
		t.Errorf("Error loading Regedit grammar")
	}
}
