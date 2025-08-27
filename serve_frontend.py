#!/usr/bin/env python3
"""
Simple HTTP server to serve the React frontend
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path

# Set the port
PORT = 3000

# Set the directory to serve (frontend/src for development)
DIRECTORY = "frontend"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # For SPA routing, serve index.html for all routes
        if self.path != '/' and not os.path.exists(os.path.join(DIRECTORY, self.path.lstrip('/'))):
            self.path = '/public/index.html'
        return super().do_GET()

def main():
    os.chdir(Path(__file__).parent)
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🚀 Serving React app at http://localhost:{PORT}")
        print(f"📁 Directory: {os.path.abspath(DIRECTORY)}")
        print("Press Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    main()