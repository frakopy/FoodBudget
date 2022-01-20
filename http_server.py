import http.server
import socketserver

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

#0.0.0.0 means that our PC is listening on all interfaces availables, so externals PC can connect via HTTP on any IP interface 
#available on our PC
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()

