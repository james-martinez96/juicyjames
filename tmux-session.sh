#!/bin/bash
tmux new-session -d -s my-session -n editor "nvim"
tmux new-window -t my-session:2 -n npm "npm run start"
tmux select-window -t my-session:0
tmux attach -t my-session
