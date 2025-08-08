const routes = {
  signup: {
    path: "./components/signup/signup.js",
    handler: "loadSignupComponent",
  },
  login: {
    path: "./components/login/login.js",
    handler: "loadLoginComponent",
  },
  home: {
    path: "./components/Home/home.js",
    handler: "loadHomeComponent",
  },
};

export async function route(pageName) {
  const routeInfo = routes[pageName];

  if (!routeInfo) {
    document.getElementById("app").innerHTML = "<h2>404- Page Not Found</h2>";
    return;
  }

  try {
    const module = await import(routeInfo.path);

    const handlerFunction = module[routeInfo.handler];
    if (typeof handlerFunction === "function") {
      handlerFunction("app");
    } else {
      throw new Error(
        `Expoted function "${routeInfo.handler}" not found in ${routeInfo.path}`
      );
    }
  } catch (err) {
    console.error(err);
    document.getElementById("app").innerHTML = "<h2>Error loading page</h2>";
  }
}
