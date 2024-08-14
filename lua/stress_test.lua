local socket = require("socket")

-- Configuration
local host = "localhost"
local port = 8080
local path = "/"
local num_requests = 1000
local concurrent_connections = 50

-- Function to perform a single HTTP request
local function make_request()
    local client = assert(socket.tcp())
    client:connect(host, port)

    -- Send HTTP GET request
    client:send("GET " .. path .. " HTTP/1.1\r\nHost: " .. host .. "\r\nConnection: close\r\n\r\n")

    -- Receive response
    local response = ""
    repeat
        local chunk, status, partial = client:receive(1024)
        response = response .. (chunk or partial)
    until status == "closed"

    client:close()

    return response
end

-- Function to run requests concurrently
local function run_stress_test()
    local threads = {}
    local results = {}

    for i = 1, concurrent_connections do
        threads[i] = coroutine.create(function()
            for j = 1, num_requests // concurrent_connections do
                local response = make_request()
                table.insert(results, response)
            end
        end)
    end

    for i = 1, concurrent_connections do
        coroutine.resume(threads[i])
    end

    -- Wait for all threads to finish
    for i = 1, concurrent_connections do
        while coroutine.status(threads[i]) ~= "dead" do
            coroutine.resume(threads[i])
        end
    end

    print("Completed " .. num_requests .. " requests.")
end

-- Start the stress test
run_stress_test()
