// generateRubyFile.js

// Import necessary modules
const fs = require('node:fs');
const path = require('node:path');

// Define the path to the JSON file
const jsonFilePath = path.join(__dirname, 'homebrew.json');

// Read and parse the JSON file
const c= JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Extract variables from JSON
console.log(c)

// Generate Ruby file content
const rubyFileContent = `class Merkato < Formula
  desc "commerce infrastructure"
  homepage "https://samifouad.com/projects/merkato-cli"
  version "${c.version}"
  license "Apache-2.0"

  if OS.mac?
    if Hardware::CPU.intel?
      url "${c.darwin_x64_url}"
      sha256 "${c.darwin_x64_hash}"
    elsif Hardware::CPU.arm?
      url "${c.darwin_arm64_url}"
      sha256 "${c.darwin_arm64_hash}"
    end
  elsif OS.linux?
    url "${c.linux_x64_url}"
    sha256 "${c.linux_x64_hash}"
  end

  def install
    bin.install "merkato"
  end
end
`;

// Define the output file name
const outputFileName = 'homebrew-merkato/Formula/merkato.rb';

// Write the generated content to a Ruby file
fs.writeFileSync(outputFileName, rubyFileContent);