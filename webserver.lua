local socket = require("socket")
local log = require("log")

-- Create a TCP socket and bind it to the local host, at any port
local server = assert(socket.bind("localhost", 8080))

-- Find out which port the OS chose for us
local ip, port = server:getsockname()

-- Print a message informing what's up
print("Please connect to http://" .. ip .. ":" .. port .. "/")

--- MIME types
---@param file_path string
---@return string
local function get_content_type(file_path)
    if file_path:match("%.html$") then
        return "text/html"
    elseif file_path:match("%.js$") then
        return "application/javascript"
    elseif file_path:match("%.css$") then
        return "text/css"
    elseif file_path:match("%.png$") then
        return "image/png"
    elseif file_path:match("%.jpg$") or file_path:match("%.jpeg$") then
        return "image/jpeg"
    elseif file_path:match("%.gif$") then
        return "image/gif"
    else
        return "application/octet-stream"
    end
end

--- Sanitize Path
---@param path string
---@return string
local function sanitize_path(path)
    local sanitized = path:gsub("%.%.", ""):gsub("//", "/")
    return sanitized
end

--- Send Response
---@param client table
---@param status string
---@param content_type string
---@param body string
local function send_response(client, status, content_type, body)
    client:send("HTTP/1.1 " .. status .. "\r\n")
    client:send("Content-Type: " .. content_type .. "\r\n")
    client:send("Connection: close\r\n\r\n")
    client:send(body)
end

--- serve a file
---@param client table
---@param file_path string
local function serve_file(client, file_path)
    local file = io.open(file_path, "rb")
    if not file then
        send_response(client, "404 Not Found", "text/plain", "404 Not Found")
        log.error("File not found: " .. file_path)
        return
    end

    local content = file:read("*all")
    file:close()

    local content_type = get_content_type(file_path)
    send_response(client, "200 OK", content_type, content)
    log.info("Served file: " .. file_path)
end

-- Loop forever waiting for clients
while true do
    local client = server:accept()
    client:settimeout(10)
    local request, err = client:receive()

    if not err then
        local method, path = request:match("^(%w+)%s(/[%w%._%/-]*)%sHTTP")
        if method and path then
            log.info("Received request: " .. request)

            -- Default to serving index.html if the path is "/"
            if path == "/" then
                path = "/index.html"
            end
            path = sanitize_path(path)

            -- Serve the requested file from the "static" directory
            local file_path = "static" .. path
            serve_file(client, file_path)
        else
            send_response(client, "400 Bad Request", "text/plain", "400 Bad Request")
            log.error("Bad request: " .. (request or "nil"))
        end
    else
        log.error("Error receiving request: " .. (err or "unknown"))
    end

    client:close()
end
