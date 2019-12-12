#!/usr/bin/env bash

sudo (

    cd /tmp/
    curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
    apt-get install python3 python3-distutils
    python3 get-pip.py --user

    PATH=$PATH:~/.local/bin

    apt-get -y install git
    apt-get -y install xdotool
    apt-get -y install espeak
    # apt-get -y install sensible-browser
    # apt-get -y install notify-send

    # # install xrandr-invert-colors
    # git clone https://github.com/zoltanp/xrandr-invert-colors.git
    # cd xrandr-invert-colors
    #  # install dependency libxcb-randr0-dev :
    # make deps-apt
    # make
    # make install


    git clone https://github.com/fiskolini/hohopawn.git /opt/.hoho

    cd /opt/.hoho/src

    pip3 install -r requirements.txt

    python3 webpawningyou.py

)