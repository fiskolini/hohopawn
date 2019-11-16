#!/usr/bin/env bash
phrase[0]="You're not a complete idiot. Some pieces are missing."
phrase[1]="One man’s crappy software is another man’s full time job."
phrase[2]="Shutting down the system... please wait."
phrase[3]="Format disk, please wait ................ (68%)"
phrase[4]="You've been pawned! :)"
phrase[5]="Never trust a computer you can’t throw out a window."
phrase[6]="You're not a complete idiot. Some pieces are missing."
phrase[7]="Have you ever wondered why you can’t taste your tongue?"
phrase[8]="I never apologise. I’m sorry, that’s just the way I am."
phrase[9]="You laugh because imm different,i laugh because I just farted.."
phraser=${phrase[$RANDOM % ${#phrase[@]} ]}
notify-send -i face-wink "$phraser"
