const { execSync } = require("child_process");
const fs = require("fs");

function supportsSymlink() {
  try {
    const testFile = "symlink_test.txt";
    const linkFile = "symlink_link.txt";
    fs.writeFileSync(testFile, "ok");
    fs.symlinkSync(testFile, linkFile);
    fs.unlinkSync(testFile);
    fs.unlinkSync(linkFile);
    return true;
  } catch (err) {
    return false;
  }
}

if (supportsSymlink()) {
  console.log("✅ Symlink supported, running normal install...");
  execSync("npm install", { stdio: "inherit" });
} else {
  console.log("⚠️ Symlink NOT supported, using --no-bin-links...");
  execSync("npm install --no-bin-links", { stdio: "inherit" });
}