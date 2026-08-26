import os, functools, http.server, socketserver
port = int(os.environ.get("PORT", "4173"))
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory="src")
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", port), handler) as httpd:
    print(f"serving src/ on http://127.0.0.1:{port}", flush=True)
    httpd.serve_forever()
