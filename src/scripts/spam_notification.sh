#!/usr/bin/env bash
phrase[0]="You're not a complete idiot. Some pieces are missing."
phrase[1]="One man’s crappy software is another man’s full time job."
phrase[2]="System is shutting down... Please wait."
phrase[3]="Deleting root..."
phrase[4]="You've been pawned!"
phrase[5]="Never trust a computer you can’t throw out a window."
phrase[6]="Why r you so dumb? 😥"
phrase[7]="Have you ever wondered why you can’t taste your tongue? 🤔"
phrase[8]="I never apologise. I’m sorry, that’s just the way I am."
phrase[9]="You laugh because I'm different, I laugh because I just farted... 😏"
phraser=${phrase[$RANDOM % ${#phrase[@]} ]}
notify-send -i face-wink "$phraser"
