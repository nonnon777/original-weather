import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// 静的ファイルの拡張子に対するMIMEタイプを設定
const getContentType = (filePath) => {
  if (filePath.endsWith(".html")) {
    return "text/html";
  } else if (filePath.endsWith(".css")) {
    return "text/css";
  } else if (filePath.endsWith(".js")) {
    return "application/javascript";
  } else if (filePath.endsWith(".png")) {
    return "image/png";
  } else if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
    return "image/jpeg";
  } else if (filePath.endsWith(".gif")) {
    return "image/gif";
  } else {
    return "text/plain";
  }
};

const handler = async (req) => {
  const url = new URL(req.url);

  // リクエストされたURLに応じて適切なファイルを返す
  let filePath;
  if (url.pathname === "/") {
    filePath = "./public/index.html";  // / -> index.html
  } else if (url.pathname === "/game") {
    filePath = "./public/game/game.html";  // /game -> game.html
  } else if (url.pathname === "/test") {
    filePath = "./public/test.html";  // /test -> test.html
  } else {
    filePath = `./public${url.pathname}`;  // その他のパス
  }

  if (filePath.endsWith("/token.txt")) {
    // token.txtには直接アクセスできないようにする（403 Forbidden）
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const contentType = getContentType(filePath);

    if (filePath.endsWith("test.html")) {
      // User-Agent と Referer を取得
      const userAgent = req.headers.get("user-agent") || "N/A";
      const referer = req.headers.get("referer") || "N/A";

      // HTMLを読み込む
      let htmlContent = await Deno.readTextFile(filePath);

      // HTMLの中にUser-AgentとRefererを埋め込む
      htmlContent = htmlContent.replace(
        '<div class="info">',
        `<div class="info">
          <p>User-Agent: ${userAgent}</p>
          <p>Referer: ${referer}</p>`
      );

      return new Response(htmlContent, {
        status: 200,
        headers: new Headers({
          "content-type": contentType,
        }),
      });
    } else if (filePath.endsWith("game.html")) {
      // game.htmlの場合、token.txtの内容を埋め込む
      const token = await Deno.readTextFile("./public/token.txt");

      // HTMLを読み込む
      let htmlContent = await Deno.readTextFile(filePath);

      // HTMLの中にtoken.txtの内容を埋め込む
      htmlContent = htmlContent.replace(
        '<div class="btnbox">',
        `<div class="btnbox"><p id="test" class="${token.trim()}">
        </p>`
      );

      return new Response(htmlContent, {
        status: 200,
        headers: new Headers({
          "content-type": contentType,
        }),
      });
    } else {
      // その他のファイルをそのまま返す
      const file = await Deno.readFile(filePath);
      return new Response(file, {
        status: 200,
        headers: new Headers({
          "content-type": contentType,
        }),
      });
    }

  } catch (error) {
    return new Response("Not Found", { status: 404 });
  }
};

// サーバーを起動
serve(handler);
