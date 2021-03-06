export function sendHtmlUrl(shortURL: string): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
        crossorigin="anonymous"
      />
  
      <title>Home</title>
    </head>
    <body>
      <div
        style="
          background-image: linear-gradient(#77A1D3, #79CBCA,#E684AE);
          opacity: 0.8;
          background-color: #ccc;
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0px;
          left: 0px;
          z-index: 1000;
        "
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div
          class="card"
          style="width: 25rem; margin: 0 auto; float: none; margin-bottom: 10px"
        >
          <div class="input-group mb-3">
            <form method="GET" action="/">
              <div class="input-group mb-3">
                <div class="container bg-light">
                  <div class="col-md-12 text-center">
                    <h1>Success!</h1>
                    <p>Here is your url</p>
                  </div>
                  <p>${shortURL}</p>
                </div>
                <div class="col-md-12 text-center">
                  <br />
                  <button type="submit" class="btn btn-outline-info">Go back</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <footer style="position: absolute; bottom: 0; width: 100%; height: 60px">
          <p class="text-center">
            <b style="color: whitesmoke">
              Author: Jesus Adrian Flores Arevalo<br />
              <a
                style="color: white"
                href="https://github.com/yisus44/url-shortener"
                >Code in github</a
              >
            </b>
          </p>
        </footer>
      </div>
    </body>
  </html>
  `;
}

export function sendHtmlNotFound(): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
        crossorigin="anonymous"
      />
  
      <title>Home</title>
    </head>
    <body>
      <div
        style="
          background-image: linear-gradient(#ff6e7f, #bfe9ff);
          opacity: 0.8;
          background-color: #ccc;
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0px;
          left: 0px;
          z-index: 1000;
        "
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div
          class="card"
          style="width: 25rem; margin: 0 auto; float: none; margin-bottom: 10px"
        >
          <div class="input-group mb-3">
            <form method="GET" action="/">
              <div class="input-group mb-3">
                <div class="container bg-light">
                  <div class="col-md-12 text-center">
                  <br>
                   <h2>We could not found what you are looking for</h2>
                  </div>
                </div>
                <div class="col-md-12 text-center">
                  <br />
                  <button type="submit" class="btn btn-outline-primary">Go back</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <footer style="position: absolute; bottom: 0; width: 100%; height: 60px">
          <p class="text-center">
            <b style="color: black">
              Author: Jesus Adrian Flores Arevalo<br />
              <a
                style="color: black"
                href="https://github.com/yisus44/url-shortener"
                >Code in github</a
              >
            </b>
          </p>
        </footer>
      </div>
    </body>
  </html>
  `;
}
