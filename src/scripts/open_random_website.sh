#!/usr/bin/env bash
expressions[0]="http://www.nyan.cat/"
expressions[1]="https://geekprank.com/hacker/"
expressions[2]="https://www.beevo.com/"
expressions[3]="https://sites.google.com/nisdtx.org/the-w-site"
expressions[4]="http://www.idiotproofwebsite.com/"
expressions[5]="https://mrdoob.com/#/111/branching"
expressions[6]="http://www.trex-game.skipser.com/"
selectedexpression=${expressions[$RANDOM % ${#expressions[@]} ]}
sensible-browser "$selectedexpression"
