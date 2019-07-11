#!/bin/bash
#
#


cd /home/erapetti/CompensacionElecciones
export NODE_ENV=production
exec node node_modules/sails/bin/sails.js lift --prod $*
