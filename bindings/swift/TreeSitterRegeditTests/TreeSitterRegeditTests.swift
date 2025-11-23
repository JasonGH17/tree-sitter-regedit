import XCTest
import SwiftTreeSitter
import TreeSitterRegedit

final class TreeSitterRegeditTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_regedit())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Regedit grammar")
    }
}
