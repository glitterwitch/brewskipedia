WORKSPACE=$(dir $(realpath $(lastword $(MAKEFILE_LIST))))

NO_COLOR=\x1b[0m
OK_COLOR=\x1b[32;01m
ERROR_COLOR=\x1b[31;01m
WARN_COLOR=\x1b[33;01m

default: help

help:
	@echo "${OK_COLOR}= Brewskipedia Make Commands ======"
	@echo "${WARN_COLOR}make setup"
	@echo "${NO_COLOR}  Check for required modules: mason..."
	@echo "${WARN_COLOR}make serve"
	@echo "${NO_COLOR}  Launch site in primary browser and run mason watch"


setup:
	@echo "Checking for mason v0.0.13"
	@if [ ! -d /node_modules/mason/ ]; then echo "  Mason v`./node_modules/mason/bin/mason -V` installed"; fi
	@if [ -d /node_modules/mason/ ]; then echo "${WARN_COLOR}  Mason is not installed"; fi

serve:
	@./serve.js

build:
	@echo "Building the project for production"
	@./node_modules/mason/bin/mason build

open:
	@open ./public/index.html

run: serve

