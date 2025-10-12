import { Route, Switch } from "wouter";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

function App() {
  return (
    <ThemeProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <a href="/" className="text-primary hover:underline">
                Go back home
              </a>
            </div>
          </div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;