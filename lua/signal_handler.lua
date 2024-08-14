local posix_signal = require("posix.signal")

local SignalHandler = {}
SignalHandler.__index = SignalHandler

-- Create a new SignalHandler
function SignalHandler.new()
    local self = setmetatable({}, SignalHandler)

    -- Create a coroutine to handle signals
    self.signalHandler = coroutine.create(function()
        while true do
            local sig = coroutine.yield()
            if sig == "SIGINT" then
                print("Received SIGINT (Ctrl+C), exiting...")
                os.exit(0)
            else
                print("Received signal:", sig)
            end
        end
    end)

    -- Start the signal handler coroutine
    coroutine.resume(self.signalHandler)

    -- Register the SIGINT handler
    posix_signal.signal(posix_signal.SIGINT, function()
        self:sendSignal("SIGINT")
    end)

    return self
end

-- Function to send a signal to the coroutine
function SignalHandler:sendSignal(sig)
    if coroutine.status(self.signalHandler) == "suspended" then
        coroutine.resume(self.signalHandler, sig)
    end
end

return SignalHandler
