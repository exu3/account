.DEFAULT_GOAL=main
PWD := $(dir $(abspath $(firstword $(MAKEFILE_LIST))))

main:
	@cd $(PWD)/../topo; make; cd $(PWD); yarn upgrade @codeday/topo
