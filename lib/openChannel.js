const { spawn } = require("child_process");
const { URL } = require("url");

function openBo(
  url = "https://whatsapp.com/channel/0029Vb6Jjyf8KMqtrGJZJy0y",
  opts = {}
) {
  const {
    delay = 3000,
    retry = 1,
    onSuccess = () => {},
    onError = () => {},
  } = opts;

  let attempts = 0;

  const run = () => {
    attempts++;
    setTimeout(() => {
      try {
        new URL(url);

        const child = spawn(
          "am",
          ["start", "-a", "android.intent.action.VIEW", "-d", url],
          { stdio: "ignore", detached: true }
        );

        child.on("error", (err) => {
          if (attempts <= retry) {
//            console.warn(`Gagal buka (percobaan ${attempts}), coba lagi...`);
            run();
          } else {
            onError(err);
          }
        });

        child.on("exit", (code) => {
          if (code === 0) {
            onSuccess(url);
          } else if (attempts <= retry) {
//            console.warn(`Exit code ${code}, coba lagi...`);
            run();
          } else {
            onError(new Error(`Proses exit dengan kode ${code}`));
          }
        });
      } catch (err) {
        onError(err);
      }
    }, delay);
  };

  run();
}

module.exports = { openBo };