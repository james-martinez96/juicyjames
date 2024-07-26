local socket = require("socket")

-- Create a TCP socket and bind it to the local host, at any port
local server = assert(socket.bind("localhost", 8080))

-- Find out which port the OS chose for us
local ip, port = server:getsockname()

-- Print a message informing what's up
print("Please connect to http://" .. ip .. ":" .. port .. "/")

-- Logging function
---@param message string
local function log(message)
    local log_file, err = io.open("log.txt", "a")
    if not log_file then
        print("Error opening log file: " .. err)
        return
    end
    local timestamp = os.date("%Y-%m-%d %H:%M:%S")
    log_file:write(string.format("%s - %s\n", timestamp,  message))
    log_file:close()
end

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

--- serve a file
---@param client table
---@param file_path string
local function serve_file(client, file_path)
    local file = io.open(file_path, "rb")
    if not file then
        client:send("HTTP/1.1 404 Not Found\r\n")
        client:send("Content-Type: text/plain\r\n")
        client:send("Connection: close\r\n\r\n")
        client:send("404 Not Found")
        log("File not found: " .. file_path)
        return
    end

    local content = file:read("*all")
    file:close()

    local content_type = get_content_type(file_path)
    client:send("HTTP/1.1 200 OK\r\n")
    client:send("Content-Type: " .. content_type .. "\r\n")
    client:send("Connection: close\r\n\r\n")
    client:send(content)
    log("Served file: " .. file_path)
end

-- Loop forever waiting for clients
while true do
    -- Wait for a connection from any client
    local client = server:accept()

    -- Make sure we don't block waiting for this client's line
    client:settimeout(10)

    -- Receive the request line
    local request, err = client:receive()

    -- If there was no error, process the request
    if not err then
        local method, path = request:match("^(%w+)%s(/[%w%._%/-]*)%sHTTP")
        if method and path then
            log("Received request: " .. request)

            -- Default to serving index.html if the path is "/"
            if path == "/" then
                path = "/index.html"
            end

            -- Serve the requested file from the "static" directory
            local file_path = "static" .. path
            serve_file(client, file_path)
        else
            client:send("HTTP/1.1 400 Bad Request\r\n")
            client:send("Content-Type: text/plain\r\n")
            client:send("Connection: close\r\n\r\n")
            client:send("400 Bad Request")
            log("Bad request: " .. (request or "nil"))
        end
    else
        log("Error receiving request: " .. (err or "unknown"))
    end

    -- Done with client, close the object
    client:close()
end
