#!/usr/bin/env bash


# install in host
# sudo bash <( wget -O - https://raw.githubusercontent.com/fiskolini/hohopawn/master/install-hohopawn-in-host.sh )




# install python3 dependecies
cd /tmp/
apt-get install python3 python3-distutils
rm -f get-pip.py
curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
python3 get-pip.py --user

PATH=$PATH:~/.local/bin

# install ubunto packges
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


# clone hohopawn repository
rm -fr /opt/.hoho
git clone https://github.com/fiskolini/hohopawn.git /opt/.hoho

# install pip depencencies
cd /opt/.hoho/src
pip3 install -r requirements.txt

# start server hohopawn
pkill -f 'python3 webpawningyou.py'
python3 webpawningyou.py

