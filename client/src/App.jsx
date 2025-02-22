
import React from 'react'
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Timeline from "@/pages/timeline";
import Create from "@/pages/create";
import About from "@/pages/about";
import Gallery from "@/pages/gallery";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/create" component={Create} />
      <Route path="/about" component={About} />
      <Route path="/gallery" component={Gallery} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <div className='pb-10'>

        <Navbar />
        </div>
        <Router />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
