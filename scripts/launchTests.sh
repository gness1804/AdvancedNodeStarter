#!/bin/bash
# thanks to https://unix.stackexchange.com/questions/149419/how-to-check-whether-a-particular-port-is-open-on-a-machine-from-a-shell-script

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null; then
    echo "Running tests..."
    jest $*
else
    echo "Oops! You need to be running a dev server on port 3000. Please try again."
fi
